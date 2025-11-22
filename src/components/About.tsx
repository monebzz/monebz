'use client'

import { useEffect, useRef } from 'react'

// Smooth easing function
function easeOutQuad(t: number): number {
  return t * (2 - t)
}

function animateCounterSmooth(element: HTMLElement, target: number, duration: number = 2000) {
  const startTime = Date.now()

  function update() {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const easedProgress = easeOutQuad(progress)
    const currentValue = Math.floor(easedProgress * target)

    element.textContent = currentValue + '+'

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = target + '+'
    }
  }

  requestAnimationFrame(update)
}

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated.current) {
          // Start counting animations
          const counters = entry.target.querySelectorAll('.stat-number') as NodeListOf<HTMLElement>
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || '0')
            animateCounterSmooth(counter, target)
          })

          // Unobserve after animating once
          observer.unobserve(entry.target)
          hasAnimated.current = true
        }
      })
    }, observerOptions)

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section id="about" className="about-section">
      <span className="about-label">ABOUT</span>

      <h2 className="about-heading">
        Building digital experiences that matter
      </h2>

      <div className="about-description">
        <p>
          I'm a passionate web developer from <span className="bold-text">Okara, Pakistan</span>,
          specializing in building interactive frontends and powerful backends. My expertise
          spans <span className="bold-text">Webflow</span>, <span className="bold-text">Next.js</span>,
          and <span className="bold-text">Django</span>, allowing me to create seamless full-stack
          experiences.
        </p>

        <p>
          I've been <span className="highlight-text">freelancing for over three years</span>,
          developing visually stunning and high-performing web applications. Currently pursuing
          my <span className="bold-text">BS in Software Engineering at COMSATS University</span>.
        </p>

        <p>
          Beyond coding, I'm a dedicated volunteer with <span className="bold-text">Al-Khidmat Trust</span>,
          contributing to social welfare and peace initiatives.
        </p>
      </div>

      <div className="stats-container" ref={statsRef}>
        <div className="stat-item">
          <span className="stat-number" data-target="3">0+</span>
          <span className="stat-label">Years Experience</span>
        </div>

        <div className="stat-item">
          <span className="stat-number" data-target="50">0+</span>
          <span className="stat-label">Projects Completed</span>
        </div>

        <div className="stat-item">
          <span className="stat-number" data-target="25">0+</span>
          <span className="stat-label">Happy Clients</span>
        </div>
      </div>
    </section>
  )
}
