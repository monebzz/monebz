'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("")
  const [startTyping, setStartTyping] = useState(false)
  const fullText = "digital era"

  useEffect(() => {
    // Start typing after the initial fade-in
    const timer = setTimeout(() => {
      setStartTyping(true)
    }, 1200) // Matches the h1 duration/delay roughly

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!startTyping) return

    let currentIndex = 0
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(intervalId)
      }
    }, 100) // Typing speed per character

    return () => clearInterval(intervalId)
  }, [startTyping])

  const isTypingComplete = displayedText === fullText

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
        experience in the{' '}
        <span className="relative inline-block">
          {/* Ghost text to reserve space and maintain stable layout */}
          <span className="opacity-0">{fullText}</span>

          {/* Actual typing text overlay */}
          <span className="absolute left-0 top-0">
            {displayedText}
            {!isTypingComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block ml-0.5 w-0.5 h-[1em] bg-accent-primary align-middle"
              />
            )}
          </span>
        </span>
        {isTypingComplete && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className="orange-dot inline-block"
          >
            .
          </motion.span>
        )}
      </motion.h1>
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 2.5 }}
          className="hero-image-container"
        >
          <Image
            src="/profile.jpg"
            alt="Muneeb Azhar"
            width={280}
            height={280}
            className="hero-image"
            priority
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 2.7 }}
          className="hero-description"
        >
          I'm a multidisciplinary product designer with 3+ years of experience, and I'm here
          to help you create functional and user-friendly products that will be loved by your users.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 2.9 }}
          className="tech-stack"
        >
          Webflow • Django • Next.js • Flutter
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 3.2 }}
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
