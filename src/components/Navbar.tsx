'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Linkedin, Github, Mail, Instagram, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const premiumEase = [0.19, 1, 0.22, 1] as const

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: premiumEase,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.4,
        ease: premiumEase,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: premiumEase }
    }
  }

  const Path = (props: any) => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="currentColor"
      strokeLinecap="round"
      {...props}
    />
  )

  return (
    <nav className={`header fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--bg-primary)]/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container-lg">
        <div className="flex items-center justify-between h-20">

          {/* Logo - Left Side */}
          <Link href="/" className="flex-shrink-0 z-50 relative">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <span className="text-white font-bold text-base">MA</span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered with proper spacing */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="nav-links">
              <Link href="#home" className="nav-link text-sm font-medium text-gray-700 hover:text-[var(--text-primary)] transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                Home
              </Link>
              <Link href="#about" className="nav-link text-sm font-medium text-gray-700 hover:text-[var(--text-primary)] transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                About
              </Link>
              <Link href="#skills" className="nav-link text-sm font-medium text-gray-700 hover:text-[var(--text-primary)] transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                Skills
              </Link>
              <Link href="#experience" className="nav-link text-sm font-medium text-gray-700 hover:text-[var(--text-primary)] transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                Experience
              </Link>
              <Link href="#contact" className="nav-link text-sm font-medium text-gray-700 hover:text-[var(--text-primary)] transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                Contact
              </Link>
            </div>
          </div>

          {/* Right Side - Status Badge & Social Icons */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            {/* Availability Status - margin-left: auto positioning */}
            <div className="availability-badge">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-xs font-medium text-green-700 whitespace-nowrap">
                Available for hire
              </span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="social-icon hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={18} className="text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun size={18} className="text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Social Icons - 0.75rem spacing between */}
            <div className="social-icons">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon hover:bg-gray-100"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-gray-600" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon hover:bg-gray-100"
                aria-label="GitHub"
              >
                <Github size={18} className="text-gray-600" />
              </a>
              <a
                href="mailto:mahassan@cuilahore.edu.pk"
                className="social-icon hover:bg-gray-100"
                aria-label="Email"
              >
                <Mail size={18} className="text-gray-600" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon hover:bg-gray-100"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-gray-600" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 shadow-sm active:scale-95 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 23 23">
              <Path
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" }
                }}
                animate={isMobileMenuOpen ? "open" : "closed"}
              />
              <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
                animate={isMobileMenuOpen ? "open" : "closed"}
              />
              <Path
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.346" }
                }}
                animate={isMobileMenuOpen ? "open" : "closed"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl lg:hidden flex flex-col justify-center"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col h-full justify-center">
              <div className="space-y-6 flex flex-col items-center">
                <motion.div variants={itemVariants} className="w-full text-center">
                  <Link
                    href="#home"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="w-full text-center">
                  <Link
                    href="#about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="w-full text-center">
                  <Link
                    href="#skills"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Skills
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="w-full text-center">
                  <Link
                    href="#experience"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Experience
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="w-full text-center">
                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Contact
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full flex flex-col items-center gap-6 pt-8 mt-4 border-t border-[var(--border-light)]">
                  <div className="flex items-center gap-2 text-green-600 bg-green-500/10 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">Available for hire</span>
                  </div>

                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {theme === 'light' ? (
                      <>
                        <Moon size={20} />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <Sun size={20} />
                        <span>Light Mode</span>
                      </>
                    )}
                  </button>

                  <div className="flex gap-6 mt-4">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                      <Linkedin size={24} />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                      <Github size={24} />
                    </a>
                    <a href="mailto:mahassan@cuilahore.edu.pk" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                      <Mail size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                      <Instagram size={24} />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
