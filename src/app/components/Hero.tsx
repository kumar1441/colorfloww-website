import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { captureEmail } from '../../services/emailCapture';

function AppleStoreBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 hover:bg-neutral-800 transition-colors shadow-sm"
      style={{ minWidth: '155px' }}
    >
      {/* Apple logo */}
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="white">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left leading-tight">
        <div className="text-[9px] font-light opacity-75 tracking-wide">Download on the</div>
        <div className="text-[15px] font-semibold tracking-tight">App Store</div>
      </div>
    </a>
  );
}

function GooglePlayBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 hover:bg-neutral-800 transition-colors shadow-sm"
      style={{ minWidth: '155px' }}
    >
      {/* Google Play logo — 4 gradient segments */}
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="gp-blue" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#00A0FF" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>
          <linearGradient id="gp-yellow" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#FFE000" />
            <stop offset="100%" stopColor="#FFBD00" />
          </linearGradient>
          <linearGradient id="gp-red" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3A44" />
            <stop offset="100%" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id="gp-green" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#32A071" />
            <stop offset="100%" stopColor="#2DA771" />
          </linearGradient>
        </defs>
        {/* Left / blue segment */}
        <path fill="url(#gp-blue)" d="M3.77 1.12a1.49 1.49 0 0 0-.5 1.13v19.5c0 .45.17.87.5 1.13l.13.12 10.9-10.9v-.26L3.9 1z" />
        {/* Right / yellow segment */}
        <path fill="url(#gp-yellow)" d="M18.46 15.67l-3.65-3.66v-.26l3.65-3.65.08.05 4.33 2.46c1.23.7 1.23 1.84 0 2.54l-4.33 2.46-.08.06z" />
        {/* Bottom-right / red segment */}
        <path fill="url(#gp-red)" d="M18.54 15.62L14.81 11.9 3.77 22.88c.41.43 1.08.49 1.83.05l12.94-7.31z" />
        {/* Top-right / green segment */}
        <path fill="url(#gp-green)" d="M18.54 8.13L5.6.82C4.85.38 4.18.44 3.77.87l11.04 11.03 3.73-3.77z" />
      </svg>
      <div className="text-left leading-tight">
        <div className="text-[9px] font-light opacity-75 tracking-wide">Get it on</div>
        <div className="text-[15px] font-semibold tracking-tight">Google Play</div>
      </div>
    </a>
  );
}

function PhoneFrame({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: '260px' }}>
      <div className="relative rounded-[2.8rem] overflow-hidden shadow-2xl border-[10px] border-[#1C1C1E]">
        <img src={src} alt={alt} className="w-full block" />
      </div>
    </div>
  );
}

export function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg('');
    const result = await captureEmail(email);
    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
      setEmail('');
    } else {
      setErrorMsg(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 px-4">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[#F8F6F3]">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#4A7B6E]/8 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-[#F0E8DE]/60 blur-3xl" />
        {/* Floating color swatches */}
        <div className="absolute top-32 right-[10%] hidden lg:block z-20">
          {['#FF6B9D', '#6B8F71', '#A29BFE', '#FDCB6E', '#4A7B6E', '#E17055', '#74B9FF'].map((c, i) => (
            <motion.div
              key={c}
              className="absolute rounded-full shadow-md"
              style={{
                backgroundColor: c,
                width: 14 + (i % 3) * 6,
                height: 14 + (i % 3) * 6,
                top: `${i * 42}px`,
                left: `${(i % 2) * 30}px`,
                opacity: 0.7,
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — Copy */}
          <div className="text-center lg:text-left">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#4A7B6E]/10 border border-[#4A7B6E]/20 text-[#4A7B6E] px-4 py-1.5 rounded-full text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 bg-[#4A7B6E] rounded-full animate-pulse" />
              Now Available — iOS &amp; Android
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-[1.1] tracking-tight text-[#1A1A1A]"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              See the Color.
              <br />
              <span className="text-[#4A7B6E]">Skip the Regret.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Try millions of nail colors on your actual hands — before you buy a single bottle or book a single appointment. Free.
            </motion.p>

            {/* Email form */}
            <motion.div
              id="notify"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              {isSubmitted ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#4A7B6E] font-medium text-base"
                >
                  ✓ You&apos;re in! We&apos;ll keep you posted.
                </motion.p>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:mx-0">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 h-12 px-5 text-base bg-white border-gray-200 rounded-xl shadow-sm"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 px-6 bg-[#4A7B6E] hover:bg-[#3d6b5f] text-white rounded-xl font-medium gap-2 whitespace-nowrap disabled:opacity-60"
                    >
                      {isSubmitting ? 'Saving…' : (
                        <>Join the community <ArrowRight className="w-4 h-4" /></>
                      )}
                    </Button>
                  </form>
                  {errorMsg && (
                    <p className="text-red-500 text-xs mt-2 mx-auto lg:mx-0 max-w-md">{errorMsg}</p>
                  )}
                </>
              )}
              <p className="text-xs text-gray-400 mt-3 mx-auto lg:mx-0 max-w-md">
                No spam. Just updates from the Colorfloww team.
              </p>
            </motion.div>

            {/* Store badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
            >
              <AppleStoreBadge href="https://apps.apple.com/us/app/colorfloww-nail-color-try-on/id6758867881" />
              <GooglePlayBadge href="https://play.google.com/store/apps/details?id=com.nailay.colorfloww" />
            </motion.div>
          </div>

          {/* Right — Phone mockup stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end items-center"
          >
            {/* Back phone (slight offset) */}
            <div className="absolute top-6 right-[calc(50%-100px)] lg:right-16 opacity-40 blur-sm scale-90">
              <PhoneFrame src="/IMG_2047.PNG" alt="Kingdom of Color rankings" />
            </div>

            {/* Front phone */}
            <div className="relative z-10">
              <PhoneFrame src="/hero.png" alt="Colorfloww home screen" />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100"
              >
                <div className="w-9 h-9 bg-[#4A7B6E]/10 rounded-xl flex items-center justify-center">
                  <Star className="w-4 h-4 text-[#4A7B6E] fill-[#4A7B6E]" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 leading-none mb-0.5">Trending now</div>
                  <div className="text-sm font-semibold text-gray-800">#NeonMatte</div>
                </div>
              </motion.div>

              {/* Color dots floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="absolute -top-6 -right-8 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 flex items-center gap-2.5"
              >
                <div className="flex gap-1.5">
                  {['#4A7B6E', '#FF6B9D', '#FDCB6E', '#74B9FF', '#E17055'].map((c) => (
                    <div key={c} className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="text-xs font-semibold text-gray-500 whitespace-nowrap">5M+ colors</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
