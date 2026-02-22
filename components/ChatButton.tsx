"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import { supabase } from "@/app/community/lib/supabase";

interface Message {
  text: string;
  sender: "user" | "bot" | "admin";
  timestamp: Date;
  id?: string;
}

export default function ChatButton() {
  const pathname = usePathname();
  
  // Don't show chat widget on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! 👋 I'm Emmanuel Dela Pena (Emman). Welcome to my portfolio! Feel free to ask me about my projects, technical skills, experience, or even how playing guitar helps fuel my creativity and problem-solving mindset. How can I help you today?",
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

  // Initialize sessionId and visitorId on component mount
  useEffect(() => {
    const initSession = async () => {
      let storedVisitorId = localStorage.getItem("visitor_id");
      
      if (!storedVisitorId) {
        storedVisitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("visitor_id", storedVisitorId);
      }

      let storedSessionId = localStorage.getItem("chat_session_id");
      
      if (!storedSessionId) {
        // Create a new session
        try {
          const { data, error } = await supabase
            .from("chat_sessions")
            .insert({
              visitor_id: storedVisitorId,
              status: "active",
            })
            .select()
            .single();

          if (error) {
            console.error("Error creating session on client:", error);
            // If client-side creation fails, the server will create it on first message
            // For now, generate a temporary ID
            storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          } else if (data) {
            storedSessionId = data.id;
          }

          if (storedSessionId) {
            localStorage.setItem("chat_session_id", storedSessionId);
          }
        } catch (err) {
          console.error("Error creating session:", err);
          // Generate a fallback session ID that will be created server-side
          storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem("chat_session_id", storedSessionId);
        }
      }

      setVisitorId(storedVisitorId);
      setSessionId(storedSessionId);
    };

    initSession();

    // Fetch admin status on mount
    const fetchAdminStatus = async () => {
      try {
        const response = await fetch("/api/admin/status", {
          credentials: "include", // Send cookies with the request
        });
        const data = await response.json();
        setAdminStatus(data.status);
        setIsAdminOnline(data.isOnline);
      } catch (err) {
        console.error("Error fetching admin status:", err);
        setAdminStatus("Emman is busy playing guitar");
        setIsAdminOnline(false);
      }
    };

    fetchAdminStatus();

    // Poll admin status every 10 seconds
    const statusInterval = setInterval(fetchAdminStatus, 10000);

    return () => clearInterval(statusInterval);
  }, []);

  const scrollToBottom = () => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Check if user is scrolled to bottom
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const { scrollHeight, scrollTop, clientHeight } = messagesContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50; // 50px threshold
    setShouldAutoScroll(isAtBottom);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, shouldAutoScroll]);

  // Subscribe to new messages from admin AND poll for updates
  useEffect(() => {
    if (!sessionId) return;

    // Real-time subscription for admin messages
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
        (payload: any) => {
          const newMessage = payload.new;
          setMessages((prev) => {
            // Check if message already exists by ID or content
            const exists = prev.some(
              (m) =>
                m.id === newMessage.id ||
                (m.text === newMessage.content && m.sender === newMessage.sender)
            );
            if (exists) {
              // If this is a real ID replacing a temp ID, update it
              if (newMessage.sender === "user" && prev.some((m) => m.id?.startsWith('temp_') && m.text === newMessage.content)) {
                return prev.map((m) => 
                  m.id?.startsWith('temp_') && m.text === newMessage.content 
                    ? { ...m, id: newMessage.id } 
                    : m
                );
              }
              return prev;
            }
            return [
              ...prev,
              {
                text: newMessage.content,
                sender: newMessage.sender,
                timestamp: new Date(newMessage.created_at),
                id: newMessage.id,
              },
            ];
          });
        }
      )
      .subscribe();

    // Polling fallback - check for new messages every 2 seconds
    const pollInterval = setInterval(async () => {
      try {
        const { data: allMessages } = await supabase
          .from("chat_messages")
          .select("id, sender, content, created_at")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: true });

        if (allMessages) {
          setMessages((prev) => {
            // Create a set of existing messages (both by ID and by content+sender)
            const existingIds = new Set(
              prev
                .filter((m) => m.id && !m.id.startsWith('temp_')) // Real IDs only
                .map((m) => m.id)
            );
            
            const existingContent = new Set(
              prev.map((m) => `${m.sender}:${m.text}`) // Content signature
            );
            
            const newMessages = allMessages
              .filter((m: any) => {
                // Skip if we already have this ID
                if (m.id && existingIds.has(m.id)) return false;
                // Skip if we already have this content
                if (existingContent.has(`${m.sender}:${m.content}`)) return false;
                return true;
              })
              .map((m: any) => ({
                text: m.content,
                sender: m.sender,
                timestamp: new Date(m.created_at),
                id: m.id,
              }));

            // Replace temp IDs with real IDs for existing messages
            if (newMessages.length > 0 || allMessages.length !== prev.length) {
              const updatedMessages = prev.map((m) => {
                if (m.id?.startsWith('temp_')) {
                  // Find the real message with matching content
                  const realMessage = allMessages.find(
                    (msg: any) => msg.sender === m.sender && msg.content === m.text
                  );
                  if (realMessage) {
                    return { ...m, id: realMessage.id };
                  }
                }
                return m;
              });
              
              if (newMessages.length > 0) {
                return [...updatedMessages, ...newMessages];
              }
              return updatedMessages;
            }
            return prev;
          });
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);

    return () => {
      subscription.unsubscribe();
      clearInterval(pollInterval);
    };
  }, [sessionId]);

  const handleSend = async () => {
    if (inputValue.trim() && !isLoading && sessionId && visitorId) {
      const userMessage = inputValue;
      const tempId = `temp_${Date.now()}_${Math.random()}`; // Temporary ID to prevent duplicates

      setInputValue("");
      setIsLoading(true);

      // Add user message to UI immediately (optimistic update)
      setMessages((prev) => [
        ...prev,
        {
          text: userMessage,
          sender: "user",
          timestamp: new Date(),
          id: tempId, // Add temp ID for deduplication
        },
      ]);

      try {
        // Call chat API in the background
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            sessionId: sessionId,
            visitorId: visitorId,
          }),
        });

        const data = await response.json();

        // The bot and admin responses will be picked up by polling/subscription
      } catch (error) {
        console.error("Error:", error);
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
    }
  };

  return (
    <>
      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with Emman"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <MessageCircle size={24} />
            <span className="chat-button-text">Chat with Emman</span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="chat-widget">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <Image
                  src="/images/profile_new.jpg"
                  alt="Ren"
                  width={40}
                  height={40}
                />
                <span className={`online-indicator ${isAdminOnline ? "online" : "offline"}`}></span>
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

          {/* Chat Messages */}
          <div className="chat-messages" ref={messagesContainerRef} onScroll={handleScroll}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.sender === "admin" ? (
                  <div className="admin-message-group">
                    <div className="message-sender-label">Emman (Admin)</div>
                    <div className="message-bubble">{msg.text}</div>
                  </div>
                ) : (
                  <div className="message-bubble">{msg.text}</div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <button
              className="chat-send-btn"
              onClick={handleSend}
              disabled={isLoading}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}