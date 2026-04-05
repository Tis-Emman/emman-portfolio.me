import Header from '@/components/Header'
import AboutMe from '@/components/AboutMe'
import Education from '@/components/Education'
import TechStack from '@/components/TechStack'
import Certifications from '@/components/Certifications'
import BeyondScreen from '@/components/BeyondScreen'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Recommendations from '@/components/Recommendations'
import Contact from '@/components/Contact'
import ScrollIndicator from '@/components/ScrollIndicator'
import GitHubActivity from '@/components/GitHubActivity'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <ScrollIndicator />

      <Header />

      <div className="container">
        <GitHubActivity />
      </div>

      <div className="container">
        <div className="main-grid">
          {/* Left Column */}
          <div className="left-column">
            <AboutMe />
            <Education />
            <TechStack />
            <Certifications />
            <BeyondScreen></BeyondScreen>
          </div>

          {/* Right Column */}
          <div className="right-column">
            <Experience />
            <Projects />
            <Recommendations />
            <Contact />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
  
}

