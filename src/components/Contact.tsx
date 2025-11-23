'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { Linkedin, Github, Instagram, CheckCircle2, ArrowUpRight } from 'lucide-react'

const MagneticButton = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 })
  const mouseY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

const MagneticLink = ({ href, children, className = "" }: { href: string, children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 })
  const mouseY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      project: formData.project,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", project: "" });
      }, 5000);
    } catch (err) {
      console.error("Contact form error:", err);
      alert("❌ Something went wrong – please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section ref={containerRef} id="contact" className="min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 px-8 sm:px-10 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-primary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-[0.03] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-[0.05] animate-blob animation-delay-2000" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 max-w-7xl mx-auto w-full items-center relative z-10">

        {/* Left Column: Info */}
        <div className="space-y-12 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="space-y-6 flex flex-col items-center lg:items-start">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-[var(--accent-primary)] tracking-widest uppercase"
            >
              Contact
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-[1.1]"
              >
                Let's start a
                <br />
                <span className="text-gray-400">project together</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 max-w-md leading-relaxed"
            >
              I'm always interested in new opportunities and collaborations.
              Whether you have a project in mind or just want to chat about technology.
            </motion.p>
          </div>

          <div className="space-y-8 w-full flex flex-col items-center lg:items-start">
            <div className="space-y-4 flex flex-col items-center lg:items-start">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Contact Details</h3>
              <motion.a
                href="mailto:muneebazhar42@gmail.com"
                className="block text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors duration-300 break-all sm:break-normal"
                whileHover={{ x: 10 }}
              >
                muneebazhar42@gmail.com
              </motion.a>
            </div>

            <div className="space-y-4 flex flex-col items-center lg:items-start">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Socials</h3>
              <div className="flex gap-4 justify-center lg:justify-start">
                {[
                  { icon: Github, href: "https://github.com/monebzz", label: "Github" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-muneeb-azhar-6aaa71319/", label: "LinkedIn" },
                  { icon: Instagram, href: "https://www.instagram.com/muneebazharr/", label: "Instagram" }
                ].map((social, i) => (
                  <MagneticLink
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
                  >
                    <social.icon size={20} />
                  </MagneticLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form (Premium Professional Style) */}
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="w-full max-w-xl rounded-lg"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* Name Input */}
                <div className="relative w-full">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="contact-form-input peer w-full pt-8 pb-4 px-5 text-[2rem] text-[var(--text-primary)] bg-[var(--bg-primary)] border-2 border-[var(--border-medium)] rounded-[12px] outline-none transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] focus:border-[var(--accent-primary)] placeholder-transparent font-medium antialiased"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[1.0625rem] text-[var(--text-secondary)] pointer-events-none origin-left transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] bg-transparent px-0
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0
                             peer-focus:top-[-0.625rem] peer-focus:left-3.5 peer-focus:translate-y-0 peer-focus:scale-[0.75] peer-focus:text-[var(--accent-primary)] peer-focus:font-semibold peer-focus:tracking-[0.5px] peer-focus:bg-[var(--bg-primary)] peer-focus:px-2
                             peer-not-placeholder-shown:top-[-0.625rem] peer-not-placeholder-shown:left-3.5 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:scale-[0.75] peer-not-placeholder-shown:text-[var(--accent-primary)] peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:tracking-[0.5px] peer-not-placeholder-shown:bg-[var(--bg-primary)] peer-not-placeholder-shown:px-2"
                  >
                    What's your name?
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative w-full">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="contact-form-input peer w-full pt-8 pb-4 px-5 text-[2rem] text-[var(--text-primary)] bg-[var(--bg-primary)] border-2 border-[var(--border-medium)] rounded-[12px] outline-none transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] focus:border-[var(--accent-primary)] placeholder-transparent font-medium antialiased"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[1.0625rem] text-[var(--text-secondary)] pointer-events-none origin-left transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] bg-transparent px-0
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0
                             peer-focus:top-[-0.625rem] peer-focus:left-3.5 peer-focus:translate-y-0 peer-focus:scale-[0.75] peer-focus:text-[var(--accent-primary)] peer-focus:font-semibold peer-focus:tracking-[0.5px] peer-focus:bg-[var(--bg-primary)] peer-focus:px-2
                             peer-not-placeholder-shown:top-[-0.625rem] peer-not-placeholder-shown:left-3.5 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:scale-[0.75] peer-not-placeholder-shown:text-[var(--accent-primary)] peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:tracking-[0.5px] peer-not-placeholder-shown:bg-[var(--bg-primary)] peer-not-placeholder-shown:px-2"
                  >
                    What's your email?
                  </label>
                </div>

                {/* Project Input */}
                <div className="relative w-full">
                  <textarea
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    rows={3}
                    className="contact-form-input peer w-full pt-8 pb-4 px-5 text-[2rem] text-[var(--text-primary)] bg-[var(--bg-primary)] border-2 border-[var(--border-medium)] rounded-[12px] outline-none transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] focus:border-[var(--accent-primary)] placeholder-transparent font-medium antialiased resize-y min-h-[100px]"
                  />
                  <label
                    htmlFor="project"
                    className="absolute left-5 top-4 text-[1.0625rem] text-[var(--text-secondary)] pointer-events-none origin-left transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] bg-transparent px-0
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0
                             peer-focus:top-[-0.625rem] peer-focus:left-3.5 peer-focus:translate-y-0 peer-focus:scale-[0.75] peer-focus:text-[var(--accent-primary)] peer-focus:font-semibold peer-focus:tracking-[0.5px] peer-focus:bg-[var(--bg-primary)] peer-focus:px-2
                             peer-not-placeholder-shown:top-[-0.625rem] peer-not-placeholder-shown:left-3.5 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:scale-[0.75] peer-not-placeholder-shown:text-[var(--accent-primary)] peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:tracking-[0.5px] peer-not-placeholder-shown:bg-[var(--bg-primary)] peer-not-placeholder-shown:px-2"
                  >
                    Tell me about your project
                  </label>
                </div>



                {/* Submit Button */}
                <div className="pt-6">
                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="contact-form-button group relative w-full sm:w-auto !py-4 sm:!py-5 !px-12 sm:!px-14 text-base sm:text-lg font-bold text-white bg-black rounded-full cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-4 uppercase tracking-wider hover:-translate-y-0.5 overflow-hidden"
                    >
                      {/* Orange sliding background */}
                      <span className="absolute inset-0 bg-[var(--accent-primary)] transform -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 rounded-full" />

                      {/* Content */}
                      <span className="relative z-10 inline-flex items-center gap-2.5">
                        Send Message
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45" />
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 bg-[var(--bg-secondary)] rounded-3xl p-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6, bounce: 0.5 }}
                  className="w-20 h-20 bg-[var(--accent-primary)] rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 size={40} className="text-white" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">Message Sent!</h3>
                  <p className="text-[var(--text-secondary)]">I'll get back to you as soon as possible.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
