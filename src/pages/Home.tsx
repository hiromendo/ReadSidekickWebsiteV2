import { Hero } from '../components/Hero'
import { Problem } from '../components/Problem'
import { Confidence } from '../components/Confidence'
import { HowItWorks } from '../components/HowItWorks'
import { Methodology } from '../components/Methodology'
import { ASLTranslator } from '../components/ASLTranslator'
import { Founder } from '../components/Founder'
import { FAQ } from '../components/FAQ'

export function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Confidence />
      <HowItWorks />
      <Methodology />
      <ASLTranslator />
      <Founder />
      <FAQ />
    </>
  )
}
