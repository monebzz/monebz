'use client'

import { useEffect, useRef, useState } from 'react'

const skillsData = [
  {
    name: 'Webflow',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webflow/webflow-original.svg',
    category: 'No-Code Platform',
    title: 'Visual Web Development',
    description: 'Expert in creating responsive, pixel-perfect websites using Webflow\'s visual design tools. Proficient in custom interactions, CMS integration, and advanced animations.',
    years: '3+',
    projects: '25+'
  },
  {
    name: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    category: 'React Framework',
    title: 'Modern Web Applications',
    description: 'Building high-performance, SEO-optimized web applications with server-side rendering, static generation, and API routes using Next.js 14+.',
    years: '2+',
    projects: '15+'
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    category: 'Frontend Library',
    title: 'Interactive User Interfaces',
    description: 'Creating dynamic, component-based user interfaces with React. Expert in hooks, context API, and modern React patterns for scalable applications.',
    years: '3+',
    projects: '30+'
  },
  {
    name: 'Django',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    category: 'Python Framework',
    title: 'Backend Development',
    description: 'Building secure, scalable backend systems with Django. Proficient in ORM, authentication, REST APIs, and database management.',
    years: '3+',
    projects: '18+'
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    category: 'Runtime Environment',
    title: 'Server-Side JavaScript',
    description: 'Developing efficient backend services with Node.js and Express. Experience with real-time applications, RESTful APIs, and microservices architecture.',
    years: '2+',
    projects: '22+'
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    category: 'Database',
    title: 'NoSQL Database',
    description: 'Working with document-based databases for flexible data models. Experience with aggregation pipelines, indexing, and schema design.',
    years: '2+',
    projects: '15+'
  },
  {
    name: 'Flutter',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    category: 'Mobile Framework',
    title: 'Cross-Platform Development',
    description: 'Building beautiful, natively compiled mobile applications for iOS and Android from a single codebase using Flutter and Dart.',
    years: '1+',
    projects: '8+'
  },
  {
    name: 'Figma',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    category: 'Design Tool',
    title: 'UI/UX Design',
    description: 'Creating intuitive, user-centered designs with Figma. Proficient in prototyping, design systems, and collaboration with development teams.',
    years: '3+',
    projects: '45+'
  }
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [isInSection, setIsInSection] = useState(false)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const totalSkills = skillsData.length

  // Detect when user enters/exits skills section
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInSection(entry.isIntersecting)
        })
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Scroll hijacking - convert vertical scroll to horizontal skill navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInSection || window.innerWidth < 1024) return

      e.preventDefault()

      if (isScrollingRef.current) return

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 100)

      isScrollingRef.current = true

      const delta = e.deltaY

      if (delta > 0) {
        // Scroll down = next skill
        nextSkill()
      } else {
        // Scroll up = previous skill
        previousSkill()
      }
    }

    if (isInSection) {
      window.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [isInSection, currentSkillIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInSection) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextSkill()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        previousSkill()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isInSection, currentSkillIndex])

  const nextSkill = () => {
    if (currentSkillIndex < totalSkills - 1) {
      setCurrentSkillIndex((prev) => prev + 1)
    }
  }

  const previousSkill = () => {
    if (currentSkillIndex > 0) {
      setCurrentSkillIndex((prev) => prev - 1)
    }
  }

  // Update container transform when skill changes
  useEffect(() => {
    if (containerRef.current) {
      const translateX = -currentSkillIndex * 100
      containerRef.current.style.transform = `translateX(${translateX}vw)`
    }
  }, [currentSkillIndex])

  const progressPercentage = ((currentSkillIndex + 1) / totalSkills) * 100

  return (
    <section id="skills" ref={sectionRef} className="skills-showcase-section">
      {/* Progress Bar - Only visible when in section */}
      {isInSection && (
        <div className="skills-progress-bar">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="progress-counter">
            {currentSkillIndex + 1} / {totalSkills}
          </span>
        </div>
      )}

      {/* Horizontal Skills Container */}
      <div
        ref={containerRef}
        className="skills-showcase-container"
        style={{
          width: `${totalSkills * 100}vw`,
          transform: `translateX(-${currentSkillIndex * 100}vw)`,
        }}
      >
        {skillsData.map((skill, index) => (
          <div
            key={skill.name}
            className={`skill-showcase-item ${index === currentSkillIndex ? 'active' : ''}`}
            data-index={index}
          >
            {/* Left Side - Icon & Name */}
            <div className="skill-left">
              <div className="skill-icon-large">
                <img src={skill.icon} alt={skill.name} loading="lazy" />
              </div>
              <h2 className="skill-name-large">{skill.name}</h2>
            </div>

            {/* Right Side - Description */}
            <div className="skill-right">
              <span className="skill-category">{skill.category}</span>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>

              <div className="skill-stats">
                <div className="stat-item">
                  <span className="stat-number">{skill.years}</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{skill.projects}</span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only visible when in section */}
      {isInSection && (
        <>
          <button
            className="skill-nav prev"
            onClick={previousSkill}
            disabled={currentSkillIndex === 0}
            aria-label="Previous skill"
          >
            ←
          </button>
          <button
            className="skill-nav next"
            onClick={nextSkill}
            disabled={currentSkillIndex === totalSkills - 1}
            aria-label="Next skill"
          >
            →
          </button>
        </>
      )}
    </section>
  )
}
