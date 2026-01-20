import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { Confidence } from './components/Confidence'
import { HowItWorks } from './components/HowItWorks'
import { Methodology } from './components/Methodology'
import { ASLTranslator } from './components/ASLTranslator'
import { SocialProof } from './components/SocialProof'
import { Founder } from './components/Founder'
import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'
import { LanguageProvider } from './i18n'

function App() {
  return (
    <LanguageProvider>
      <div className="relative">
        <Navigation />
        <main>
          <Hero />
          <Problem />
          <Confidence />
          <HowItWorks />
          <Methodology />
          <ASLTranslator />
          <SocialProof />
          <Founder />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
  )
}

export default App
