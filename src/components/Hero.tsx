'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    const text = "digital era"
    const element = document.querySelector('.typed-text') as HTMLElement
    const cursor = document.querySelector('.typing-cursor') as HTMLElement
    const dot = document.querySelector('.orange-dot') as HTMLElement
    let index = 0

    function typeWriter() {
      if (index < text.length) {
        element.textContent += text.charAt(index)
        index++
        // Add slight randomness to typing speed for more human feel
        const randomDelay = 80 + Math.random() * 40
        setTimeout(typeWriter, randomDelay)
      } else {
        // Remove cursor and show dot with bounce
        if (cursor) cursor.remove()
        if (dot) {
          dot.style.display = 'inline'
          dot.classList.add('bounce-in')
        }
        setIsTypingComplete(true)
      }
    }

    // Start typing after page load with 500ms delay
    const timer = setTimeout(typeWriter, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="hero">
      <span className="hero-label">ABOUT ME</span>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
        className="hero-heading"
      >
        Creative designer with<br />
        experience in the <span className="typed-text"></span>
        <span className="typing-cursor"></span>
        <span className="orange-dot" style={{ display: 'none' }}>.</span>
      </motion.h1>
      <div className="hero-content">
        <div className="hero-image-container">
          <Image
            src="/profile.jpg"
            alt="Muneeb Azhar"
            width={280}
            height={280}
            className="hero-image"
            priority
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 2.5 }}
          className="hero-description"
        >
          I'm a multidisciplinary product designer with 3+ years of experience, and I'm here
          to help you create functional and user-friendly products that will be loved by your users.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 2.6 }}
          className="tech-stack"
        >
          Webflow • Django • Next.js • Flutter
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 1 }}
          className="scroll-indicator"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-gray-400 cursor-pointer"
          >
            <ChevronDown size={28} strokeWidth={2} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
