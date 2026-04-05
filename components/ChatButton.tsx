"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MessageCircle, X, Send } from "lucide-react";
import { supabase } from "@/app/community/lib/supabase";

interface Message {
  text: string;
  sender: "user" | "bot" | "admin";
  timestamp: Date;
  id?: string;
}

interface DbMessage {
  id: string;
  sender: "user" | "bot" | "admin";
  content: string;
  created_at: string;
}

export default function ChatButton() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! 👋 I'm Emman's AI assistant. Ask me about his projects, skills, or experience. How can I help?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [adminStatus, setAdminStatus] = useState("Emman is busy playing guitar");
  const [isAdminOnline, setIsAdminOnline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      let storedVisitorId = localStorage.getItem("visitor_id");
      if (!storedVisitorId) {
        storedVisitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("visitor_id", storedVisitorId);
      }

      let storedSessionId = localStorage.getItem("chat_session_id");
      if (!storedSessionId) {
        try {
          const { data, error } = await supabase
            .from("chat_sessions")
            .insert({ visitor_id: storedVisitorId, status: "active" })
            .select()
            .single();

          storedSessionId = error
            ? `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            : data.id;

          localStorage.setItem("chat_session_id", storedSessionId!);
        } catch {
          storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem("chat_session_id", storedSessionId);
        }
      }

      setVisitorId(storedVisitorId);
      setSessionId(storedSessionId);
    };

    initSession();

    // Fetch admin status
    const fetchAdminStatus = async () => {
      try {
        const response = await fetch("/api/admin/status", { credentials: "include" });
        const data = await response.json();
        setAdminStatus(data.status);
        setIsAdminOnline(data.isOnline);
      } catch {
        setAdminStatus("Emman is busy playing guitar");
        setIsAdminOnline(false);
      }
    };

    fetchAdminStatus();
    const statusInterval = setInterval(fetchAdminStatus, 30000);
    return () => clearInterval(statusInterval);
  }, []);

  // Realtime subscription for admin messages
  useEffect(() => {
    if (!sessionId) return;

    const subscription = supabase
      .channel(`chat:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const newMessage = payload.new as DbMessage;

          // Only handle admin messages via realtime — bot replies come directly from API
          if (newMessage.sender !== "admin") return;

          setMessages((prev) => {
            if (prev.some((m) => m.id === newMessage.id)) return prev;
            return [
              ...prev,
              {
                text: newMessage.content,
                sender: "admin",
                timestamp: new Date(newMessage.created_at),
                id: newMessage.id,
              },
            ];
          });
        }
      )
      .subscribe();

    return () => { subscription.unsubscribe(); };
  }, [sessionId]);

  // Auto-scroll
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollHeight, scrollTop, clientHeight } = messagesContainerRef.current;
    setShouldAutoScroll(scrollHeight - scrollTop - clientHeight < 50);
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, shouldAutoScroll]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    if (!sessionId || !visitorId) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Chat is still initializing, please try again in a moment.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      return;
    }

    const userMessage = inputValue.trim();
    const tempId = `temp_${Date.now()}_${Math.random()}`;

    setInputValue("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user", timestamp: new Date(), id: tempId },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, sessionId, visitorId }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            text: data.reply,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting right now. Please try again later! 😅",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Don't show on admin pages (after all hooks)
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <button className="chat-button" onClick={() => setIsOpen(!isOpen)} title="Chat with Emman">
        {isOpen ? <X size={24} /> : (
          <>
            <MessageCircle size={24} />
            <span className="chat-button-text">Chat with Emman</span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="chat-widget">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <Image
                  src="/images/profile_new.jpg"
                  alt="Emmanuel Dela Pena"
                  width={40}
                  height={40}
                />
                <span className={`online-indicator ${isAdminOnline ? "online" : "offline"}`} />
              </div>
              <div>
                <h4>Chat with Emman</h4>
                <p className={`online-status ${isAdminOnline ? "" : "offline"}`}>{adminStatus}</p>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages" ref={messagesContainerRef} onScroll={handleScroll}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.sender === "admin" ? (
                  <div className="admin-message-group">
                    <div className="message-sender-label">Emman (Admin)</div>
                    <div className="message-bubble">{msg.text}</div>
                    <div className="message-time">{formatTime(msg.timestamp)}</div>
                  </div>
                ) : (
                  <div>
                    <div className="message-bubble">{msg.text}</div>
                    <div className="message-time">{formatTime(msg.timestamp)}</div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <button className="chat-send-btn" onClick={handleSend} disabled={isLoading}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
