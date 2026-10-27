import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, Check, Heart, Leaf, Menu, Send, Users, X } from 'lucide-react'

const images = {
  women:
    'https://images.unsplash.com/photo-1707721690544-781fe6ede937?auto=format&fit=crop&w=1200&q=85',
  gathering:
    'https://images.unsplash.com/photo-1609252509229-364936a1d1a2?auto=format&fit=crop&w=1200&q=85',
  portrait:
    'https://images.unsplash.com/photo-1587538018365-2a1f8b544c08?auto=format&fit=crop&w=900&q=85',
  children:
    'https://images.unsplash.com/photo-1692609659165-1ec4d8108c0e?auto=format&fit=crop&w=1200&q=85',
  together:
    'https://images.unsplash.com/photo-1663527793121-532686299281?auto=format&fit=crop&w=1400&q=85',
  smiles:
    'https://images.unsplash.com/photo-1567122087721-47b09b61e1d1?auto=format&fit=crop&w=1000&q=85',
}

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Our Purpose', '#purpose'],
  ['Contact', '#contact'],
]

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`mb-5 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${
        light ? 'text-[#DDE9DF]' : 'text-[#174D3A]'
      }`}
    >
      <span className={`h-px w-8 ${light ? 'bg-[#E6A23C]' : 'bg-[#E6A23C]'}`} />
      {children}
    </div>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="Sankalp Trust home">
      <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-[#FAF9F5] shadow-sm ring-1 ring-black/5">
        <img
          src="/Raised%20Fist%20Emblem%20with%20Colorful%20Arcs.png"
          alt=""
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <span className={`text-sm font-semibold tracking-[0.13em] ${light ? 'text-white' : 'text-[#173D31]'}`}>
        SANKALP <span className={light ? 'text-[#E6A23C]' : 'text-[#A66B12]'}>TRUST</span>
      </span>
    </a>
  )
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const close = () => {
    onClose()
    window.setTimeout(() => setSubmitted(false), 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-[#102F25]/75 p-4 backdrop-blur-sm"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="relative my-6 w-full max-w-xl overflow-hidden rounded-[2rem] bg-[#FAF9F5] p-6 shadow-[0_28px_90px_rgba(5,30,21,0.35)] sm:p-9"
            initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-[#174D3A]/15 text-[#174D3A] transition-colors hover:bg-[#E8EFE8]"
              aria-label="Close contact form"
            >
              <X className="size-4" />
            </button>

            {submitted ? (
              <div className="flex min-h-96 flex-col items-center justify-center text-center">
                <motion.div
                  className="mb-6 grid size-16 place-items-center rounded-full bg-[#174D3A] text-white"
                  initial={reduceMotion ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check className="size-7" />
                </motion.div>
                <h2 id="contact-title" className="text-3xl font-medium tracking-[-0.04em] text-[#174D3A]">
                  Thank you for reaching out.
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#365A4D]/70">
                  Your details have been noted. The Sankalp Trust team will connect with you soon.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-7 rounded-full bg-[#174D3A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#103D2D]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <Eyebrow>Let&apos;s connect</Eyebrow>
                <h2 id="contact-title" className="pr-10 text-4xl font-medium tracking-[-0.05em] text-[#174D3A] sm:text-5xl">
                  Start a conversation.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#365A4D]/65">
                  Tell us a little about yourself and how you would like to connect with Sankalp Trust.
                </p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#174D3A]">
                      Name
                      <input
                        required
                        name="name"
                        autoComplete="name"
                        placeholder="Your full name"
                        className="mt-2 w-full rounded-xl border border-[#174D3A]/15 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal outline-none transition focus:border-[#E6A23C] focus:ring-4 focus:ring-[#E6A23C]/10"
                      />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#174D3A]">
                      Phone number
                      <input
                        required
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91"
                        className="mt-2 w-full rounded-xl border border-[#174D3A]/15 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal outline-none transition focus:border-[#E6A23C] focus:ring-4 focus:ring-[#E6A23C]/10"
                      />
                    </label>
                  </div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#174D3A]">
                    Email
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-[#174D3A]/15 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal outline-none transition focus:border-[#E6A23C] focus:ring-4 focus:ring-[#E6A23C]/10"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#174D3A]">
                    Description
                    <textarea
                      required
                      name="description"
                      rows={4}
                      placeholder="How would you like to connect?"
                      className="mt-2 w-full resize-none rounded-xl border border-[#174D3A]/15 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal outline-none transition focus:border-[#E6A23C] focus:ring-4 focus:ring-[#E6A23C]/10"
                    />
                  </label>
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#174D3A] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(23,77,58,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#103D2D]"
                  >
                    Send enquiry
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <main className="overflow-hidden bg-[#FAF9F5] text-[#173D31]">
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Logo />
          <div className="hidden items-center gap-9 md:flex">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-[#173D31]/70 transition-colors hover:text-[#174D3A]"
              >
                {label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="hidden items-center gap-2 rounded-full bg-[#174D3A] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(23,77,58,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#103D2D] md:flex"
          >
            Let&apos;s connect <ArrowRight className="size-4" />
          </button>
          <button
            className="grid size-11 place-items-center rounded-full border border-[#174D3A]/15 text-[#174D3A] md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#174D3A] p-6 text-white md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between">
              <Logo light />
              <button
                className="grid size-11 place-items-center rounded-full border border-white/20"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="my-auto flex flex-col gap-7">
              {navItems.map(([label, href], index) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/15 pb-5 text-4xl font-medium tracking-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-white/50">A new chapter begins soon.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="home"
        className="relative min-h-screen bg-[radial-gradient(circle_at_75%_25%,#E8EFE8_0%,transparent_34%)] px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40"
      >
        <div className="mx-auto grid max-w-[90rem] items-center gap-16 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.65 }}
            >
              <Eyebrow>Humanity in action</Eyebrow>
            </motion.div>
            <motion.h1
              className="max-w-3xl text-[clamp(3.3rem,7vw,7rem)] font-medium leading-[0.92] tracking-[-0.065em] text-[#143D30]"
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8 }}
            >
              Together, We Can Shape a <span className="font-serif italic text-[#D98C20]">Better Tomorrow.</span>
            </motion.h1>
            <motion.p
              className="mt-7 max-w-xl text-base leading-7 text-[#365A4D]/75 sm:text-lg"
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            >
              Sankalp Trust is taking shape around a simple belief: lasting change begins when people come
              together with compassion, courage and purpose.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            >
              <a
                href="#purpose"
                className="group flex items-center gap-3 rounded-full bg-[#174D3A] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(23,77,58,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#103D2D]"
              >
                Discover our purpose
                <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href="#about"
                className="flex items-center gap-3 rounded-full border border-[#174D3A]/20 bg-white/60 px-6 py-3.5 text-sm font-semibold text-[#174D3A] backdrop-blur transition-all hover:border-[#174D3A]/50 hover:bg-white"
              >
                Our story
              </a>
            </motion.div>
          </motion.div>

          <div className="relative mx-auto h-[31rem] w-full max-w-[42rem] sm:h-[39rem]">
            <motion.div
              className="absolute left-[3%] top-[15%] h-[66%] w-[55%] overflow-hidden rounded-[2rem] shadow-[0_24px_70px_rgba(23,61,49,0.2)]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 0.9, delay: 0.25 }}
            >
              <img src={images.women} alt="Women standing together in a field" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              className="absolute right-[2%] top-0 h-[48%] w-[43%] overflow-hidden rounded-[1.75rem] border-[6px] border-[#FAF9F5] shadow-xl"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img src={images.portrait} alt="A woman from a local community" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              className="absolute bottom-[3%] right-[5%] h-[38%] w-[54%] overflow-hidden rounded-[1.75rem] border-[6px] border-[#FAF9F5] shadow-xl"
              initial={reduceMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              <img src={images.gathering} alt="A community gathering outdoors" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              className="absolute bottom-[8%] left-0 z-10 max-w-[15rem] rounded-2xl bg-white/95 p-4 shadow-[0_16px_40px_rgba(23,61,49,0.16)] backdrop-blur sm:p-5"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-[#F4E1BE] text-[#9B5E0A]">
                <Heart className="size-4" fill="currentColor" />
              </div>
              <p className="text-sm font-semibold leading-5 text-[#174D3A]">Rooted in empathy. Built for meaningful action.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto grid max-w-[90rem] gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Why Sankalp</Eyebrow>
            <p className="max-w-sm text-sm leading-6 text-[#365A4D]/65">
              Sankalp means a solemn resolve — a promise to act with intention and stay committed to what matters.
            </p>
            <div className="relative mt-10 max-w-sm sm:mt-14">
              <motion.div
                className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] shadow-[0_20px_50px_rgba(23,77,58,0.14)]"
                whileHover={reduceMotion ? undefined : { rotate: -1.5, scale: 1.015 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={images.smiles}
                  alt="Women smiling together"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102F25]/70 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 text-sm font-medium text-white">A resolve, shared together.</p>
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-4 grid size-24 place-items-center rounded-full border-[6px] border-[#FAF9F5] bg-[#E6A23C] text-center text-[0.64rem] font-semibold uppercase leading-4 tracking-[0.16em] text-[#173D31] shadow-lg sm:-right-8"
                animate={reduceMotion ? undefined : { rotate: [0, 4, 0, -4, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                Purpose
                <br />
                in action
              </motion.div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(2.7rem,5vw,5.3rem)] font-medium leading-[1.01] tracking-[-0.055em]">
              Every Change Begins With a <span className="font-serif italic text-[#D98C20]">Sankalp.</span>
            </h2>
            <div className="mt-10 grid gap-8 border-t border-[#174D3A]/15 pt-8 sm:grid-cols-2">
              <p className="text-base leading-7 text-[#365A4D]/75">
                We envision an India where care turns into collective action, and every person has the space to
                learn, participate and thrive.
              </p>
              <p className="text-base leading-7 text-[#365A4D]/75">
                Our platform is currently being thoughtfully built. Soon, this will be a place for people,
                communities and ideas to meet with purpose.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="purpose" className="bg-[#E8EFE8] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[90rem]">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Our purpose</Eyebrow>
              <h2 className="max-w-2xl text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-6xl">
                The values guiding our way forward.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#365A4D]/70">
              Focused on what connects us, and the possibility that grows when care becomes action.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: 'Community', icon: Users, image: images.gathering, copy: 'Creating room for people to belong, contribute and grow together.' },
              { title: 'Compassion', icon: Heart, image: images.smiles, copy: 'Listening with empathy and responding with dignity at every step.' },
              { title: 'Purpose', icon: Leaf, image: images.children, copy: 'Turning shared resolve into thoughtful, enduring action.' },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <motion.article
                  className="group relative min-h-[31rem] overflow-hidden rounded-[1.75rem] bg-[#174D3A]"
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    whileHover={reduceMotion ? undefined : { scale: 1.045 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102F25] via-[#102F25]/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <item.icon className="mb-5 size-6 text-[#F0B85E]" strokeWidth={1.6} />
                    <h3 className="text-3xl font-medium tracking-tight">{item.title}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">{item.copy}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#174D3A] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto grid max-w-[90rem] items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img src={images.together} alt="People gathered together in community" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-2 rounded-2xl bg-[#E6A23C] p-6 text-[#173D31] sm:-right-5 sm:p-8">
              <Heart className="size-7" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow light>Our shared story</Eyebrow>
            <h2 className="text-[clamp(2.8rem,5vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.055em]">
              Real Change Begins When We Come Together.
            </h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-white/65">
              No meaningful journey is built alone. Sankalp Trust is an invitation to imagine, listen and act —
              side by side, with the communities at the heart of every decision.
            </p>
            <a href="#contact" className="mt-10 inline-flex items-center gap-3 border-b border-[#E6A23C] pb-2 text-sm font-semibold">
              Be part of what comes next <ArrowRight className="size-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="relative px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
        <div className="mx-auto max-w-[90rem]">
          <Reveal className="relative z-10 mx-auto max-w-5xl text-center">
            <Eyebrow>Coming soon</Eyebrow>
            <h2 className="text-[clamp(4rem,10vw,9.5rem)] font-medium leading-[0.82] tracking-[-0.075em] text-[#174D3A]">
              A New Chapter <span className="font-serif italic text-[#D98C20]">Begins Soon.</span>
            </h2>
            <p className="mx-auto mt-10 max-w-xl text-base leading-7 text-[#365A4D]/70">
              We are creating something thoughtful, hopeful and grounded in action. This is only the beginning.
            </p>
          </Reveal>
          <motion.div
            className="absolute left-[3%] top-[14%] hidden h-56 w-40 rotate-[-7deg] overflow-hidden rounded-2xl shadow-xl lg:block"
            whileInView={reduceMotion ? undefined : { y: [10, -8, 10] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            <img src={images.portrait} alt="" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            className="absolute bottom-[8%] right-[4%] hidden h-48 w-64 rotate-[6deg] overflow-hidden rounded-2xl shadow-xl lg:block"
            whileInView={reduceMotion ? undefined : { y: [-5, 9, -5] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <img src={images.women} alt="" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section id="contact" className="px-5 pb-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-10 rounded-[2rem] bg-[#E8EFE8] px-7 py-12 sm:px-12 sm:py-16 lg:flex-row lg:items-center">
          <div>
            <Eyebrow>Stay close</Eyebrow>
            <h2 className="max-w-2xl text-4xl font-medium tracking-[-0.04em] sm:text-5xl">The journey is about to begin.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#365A4D]/70">
              Our full website and ways to connect will be shared here soon.
            </p>
          </div>
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-3 rounded-full bg-[#174D3A] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#103D2D]"
          >
            Back to the beginning
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </section>

      <footer className="bg-[#102F25] px-5 pb-8 pt-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-col justify-between gap-12 border-b border-white/10 pb-14 md:flex-row md:items-end">
            <Logo light />
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="text-sm text-white/60 transition-colors hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Sankalp Trust. All rights reserved.</p>
            <p>Made with purpose in India.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
