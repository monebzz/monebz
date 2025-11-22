'use client'

import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    period: '2023 - Present',
    title: 'BS Software Engineering',
    company: 'COMSATS University',
    description: 'Pursuing my Bachelor\'s degree in Software Engineering, focusing on full-stack development, algorithms, and software architecture.',
  },
  {
    period: '2021 - Present',
    title: 'Freelance Developer',
    company: 'Webflow & Django Specialist',
    description: 'Building high-performance web applications for clients worldwide. Specializing in Webflow design, Django backends, and Next.js frontends.',
  },
  {
    period: '2022 - Present',
    title: 'Volunteer Member',
    company: 'Al-Khidmat Trust',
    description: 'Contributing to social welfare and peace initiatives, helping communities through technology and humanitarian efforts.',
  },
]

export default function Experience() {
  const [activeCard, setActiveCard] = useState(0)
  const [progressHeight, setProgressHeight] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // IntersectionObserver for scroll-triggered card animations
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px',
      threshold: 0.5,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class for slide-in animation
          entry.target.classList.add('visible')

          // Update active card and progress
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1) {
            setActiveCard(index)
            // Calculate progress height: (cardIndex + 1) / totalCards * 100
            const progress = ((index + 1) / experiences.length) * 100
            setProgressHeight(progress)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all cards
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  // Scroll to card when progress dot is clicked
  const scrollToCard = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return (
    <section id="experience" className="experience-section">
      {/* Section Label */}
      <div className="experience-label">EXPERIENCE</div>

      {/* Title */}
      <h2 className="experience-heading">My journey</h2>

      {/* Journey Wrapper with Vertical Progress Bar */}
      <div className="journey-wrapper">
        {/* Vertical Progress Container - LEFT SIDE */}
        <div className="vertical-progress-container">
          {/* Progress Track */}
          <div className="vertical-progress-track">
            {/* Progress Fill - Animates upward */}
            <div
              ref={progressFillRef}
              className="vertical-progress-fill"
              style={{ height: `${progressHeight}%` }}
            />
          </div>

          {/* Progress Dots at 0%, 50%, 100% */}
          <div
            className={`progress-dot ${activeCard >= 0 ? 'active' : ''}`}
            style={{ top: '0%' }}
            onClick={() => scrollToCard(0)}
            role="button"
            tabIndex={0}
            aria-label="Go to experience 1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                scrollToCard(0)
              }
            }}
          />
          <div
            className={`progress-dot ${activeCard >= 1 ? 'active' : ''}`}
            style={{ top: '50%' }}
            onClick={() => scrollToCard(1)}
            role="button"
            tabIndex={0}
            aria-label="Go to experience 2"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                scrollToCard(1)
              }
            }}
          />
          <div
            className={`progress-dot ${activeCard >= 2 ? 'active' : ''}`}
            style={{ top: '100%' }}
            onClick={() => scrollToCard(2)}
            role="button"
            tabIndex={0}
            aria-label="Go to experience 3"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                scrollToCard(2)
              }
            }}
          />
        </div>

        {/* Journey Cards Container - RIGHT SIDE */}
        <div className="journey-cards-container">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className="journey-card"
            >
              {/* Content */}
              <div className="journey-content">
                <div className="journey-date">{exp.period}</div>
                <h3 className="journey-title">{exp.title}</h3>
                <p className="journey-company">{exp.company}</p>
                <p className="journey-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
