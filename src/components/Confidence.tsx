import { motion } from 'framer-motion'
import { Globe, TrendingUp, CheckCircle } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n'
import {
  Card,
  Container,
  EditorialLabel,
  Grid,
  Heading,
  SectionNumber,
  Text,
  editorialTransition,
} from '../design-system'

const MotionHeading = motion(Heading)
const MotionText = motion(Text)
const MotionEditorialLabel = motion(EditorialLabel)

interface PointCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

function PointCard({ icon, title, description, delay }: PointCardProps) {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={editorialTransition(800, delay * 1000)}
    >
      <Card
        variant="outlined"
        radius="xl"
        padding="lg"
        className="group hover:border-accent/30 hover:shadow-lg transition-all duration-base"
      >
        <div className="w-12 h-12 mb-6 flex items-center justify-center bg-accent/10 rounded-xl text-accent-strong group-hover:bg-accent group-hover:text-fg-inverse transition-colors duration-base">
          {icon}
        </div>

        <Heading level="h3" size="h3" className="md:text-2xl mb-3">
          {title}
        </Heading>

        <Text size="body-sm" tone="muted" className="leading-relaxed">
          {description}
        </Text>
      </Card>
    </motion.div>
  )
}

export function Confidence() {
  const { t } = useLanguage()

  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  const points = [
    {
      icon: <Globe className="w-6 h-6" strokeWidth={1.5} />,
      title: t.confidence.points.masterMessage.title,
      description: t.confidence.points.masterMessage.description,
    },
    {
      icon: <TrendingUp className="w-6 h-6" strokeWidth={1.5} />,
      title: t.confidence.points.boostCareer.title,
      description: t.confidence.points.boostCareer.description,
    },
    {
      icon: <CheckCircle className="w-6 h-6" strokeWidth={1.5} />,
      title: t.confidence.points.readConfidence.title,
      description: t.confidence.points.readConfidence.description,
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-editorial bg-surface-sunken overflow-hidden"
    >
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sectionInView ? 1 : 0 }}
        transition={editorialTransition(1000, 300)}
        className="absolute top-20 left-6 md:left-12 lg:left-20"
      >
        <SectionNumber>02</SectionNumber>
      </motion.div>

      {/* Large background text */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 pointer-events-none select-none">
        <span className="font-display text-[15vw] text-fg/[0.02] font-medium tracking-tight">
          READ
        </span>
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 md:mb-24 max-w-3xl">
          <MotionEditorialLabel
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 20 }}
            transition={editorialTransition(1000)}
            className="block mb-6"
          >
            {t.confidence.sectionLabel}
          </MotionEditorialLabel>

          <MotionHeading
            level="h2"
            size="display-md"
            className="md:text-display-lg mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 40 }}
            transition={editorialTransition(1200, 200)}
          >
            {t.confidence.headline}
          </MotionHeading>

          <MotionText
            size="body-lg"
            tone="muted"
            className="leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 30 }}
            transition={editorialTransition(1000, 400)}
          >
            {t.confidence.subheadline}
          </MotionText>
        </div>

        {/* Points grid - 3 columns on desktop */}
        <Grid cols="3" gap="lg">
          {points.map((point, index) => (
            <PointCard key={point.title} {...point} delay={0.1 + index * 0.1} />
          ))}
        </Grid>
      </Container>

      {/* Background decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border/10" />
    </section>
  )
}
