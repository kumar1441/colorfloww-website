import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const faqs = [
  {
    question: 'How do I try on a nail color?',
    answer: 'Open the app and tap the camera icon on the home screen. Point your hand at the camera, then browse or search for any color. Tap a color to see it live on your nails instantly.',
  },
  {
    question: 'The app is not detecting my nails — what should I do?',
    answer: 'Make sure your hand is well-lit and your nails are visible. Avoid very dark backgrounds. Try moving your hand slightly closer to the camera. If the issue persists, try restarting the app.',
  },
  {
    question: 'How do I earn Karma points?',
    answer: 'Post your nail looks to Spotlight (the community feed). When other users swipe right on your looks, you earn Karma. The more looks you share, the more Karma you can earn.',
  },
  {
    question: 'What is Kingdom of Color?',
    answer: 'Kingdom of Color is the global trend leaderboard showing which nail colors are most popular right now — worldwide or in your city. Switch between global and local views from the main screen.',
  },
  {
    question: 'How do I delete my account?',
    answer: 'Go to Settings → Account → Delete Account. Your data will be permanently removed within 30 days. If you need help with this, contact us using the form below.',
  },
  {
    question: 'Is Colorfloww free?',
    answer: 'Yes — Colorfloww is free to download and use on both iOS and Android. The core features (try-on, Custom Mix, Spotlight, Kingdom of Color) are all free.',
  },
  {
    question: 'How do I report a bug or inappropriate content?',
    answer: 'Use the contact form below to report bugs. To report inappropriate content in the app, tap the three-dot menu on any post and select "Report."',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#F8F6F3] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-[#1A1A1A] hover:bg-[#F0EDE8] transition-colors"
      >
        <span>{question}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#4A7B6E] shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-500 leading-relaxed text-sm">{answer}</div>
      )}
    </div>
  );
}

export function Support() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:ravi@colorfloww.com?subject=${encodeURIComponent(`[Support] ${subject}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3]">

      {/* Minimal header */}
      <header className="bg-[#F8F6F3]/90 backdrop-blur-md border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-semibold tracking-tight text-[#1A1A1A]"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Colorfloww
          </a>
          <a
            href="/"
            className="text-sm text-[#4A7B6E] font-medium hover:underline"
          >
            ← Back to home
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#4A7B6E]/10 rounded-2xl mb-6">
            <MessageCircle className="w-7 h-7 text-[#4A7B6E]" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            How can we help?
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Browse common questions below or send us a message — we typically respond within 1 business day.
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16"
        >
          <a
            href="mailto:ravi@colorfloww.com"
            className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 hover:border-[#4A7B6E]/30 transition-colors"
          >
            <div className="w-11 h-11 bg-[#4A7B6E]/10 rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#4A7B6E]" />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-0.5">Email us</div>
              <div className="font-semibold text-[#1A1A1A]">ravi@colorfloww.com</div>
            </div>
          </a>

          <a
            href="tel:+16505410607"
            className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 hover:border-[#4A7B6E]/30 transition-colors"
          >
            <div className="w-11 h-11 bg-[#4A7B6E]/10 rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[#4A7B6E]" />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-0.5">Call or text</div>
              <div className="font-semibold text-[#1A1A1A]">+1 (650) 541-0607</div>
            </div>
          </a>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2
            className="text-2xl font-bold text-[#1A1A1A] mb-6"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Common questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 px-8 py-10"
        >
          <h2
            className="text-2xl font-bold text-[#1A1A1A] mb-2"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Send us a message
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Didn't find your answer above? We'll get back to you within 1 business day.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Your name</label>
                <Input
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 bg-[#F8F6F3] border-transparent focus:border-[#4A7B6E] rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Your email</label>
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 bg-[#F8F6F3] border-transparent focus:border-[#4A7B6E] rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Subject</label>
              <Input
                type="text"
                placeholder="e.g. App crashing on iOS 17"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="h-11 bg-[#F8F6F3] border-transparent focus:border-[#4A7B6E] rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Message</label>
              <textarea
                placeholder="Describe your issue or question in as much detail as you can..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full rounded-xl bg-[#F8F6F3] border border-transparent focus:border-[#4A7B6E] focus:outline-none px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 resize-none transition-colors"
              />
            </div>

            <Button
              type="submit"
              className="h-12 px-8 bg-[#4A7B6E] hover:bg-[#3d6b5f] text-white rounded-xl font-medium"
            >
              Send message
            </Button>

            <p className="text-xs text-gray-400">
              Clicking "Send message" will open your email app with your message pre-filled.
            </p>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-black/5 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Colorfloww. All rights reserved.</p>
        <p className="mt-1">
          <a href="/" className="hover:text-[#4A7B6E] transition-colors">Home</a>
          {' · '}
          <a href="mailto:ravi@colorfloww.com" className="hover:text-[#4A7B6E] transition-colors">ravi@colorfloww.com</a>
        </p>
      </footer>
    </div>
  );
}
