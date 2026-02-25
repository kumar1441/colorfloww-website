import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { captureEmail } from '../../services/emailCapture';

export function EmailCTA() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setErrorMsg('');
    const result = await captureEmail(email);
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
      setEmail('');
    } else {
      setErrorMsg(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-24 px-4 bg-[#1A1A1A] overflow-hidden relative">
      {/* Decorative blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4A7B6E]/15 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Color swatch row */}
          <div className="flex justify-center gap-2 mb-8">
            {['#FF6B9D', '#FDCB6E', '#4A7B6E', '#74B9FF', '#E17055', '#A29BFE', '#55EFC4'].map((c) => (
              <div
                key={c}
                className="w-5 h-5 rounded-full shadow-sm"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Be the first to
            <br />
            <span className="text-[#4A7B6E]">paint your world.</span>
          </h2>

          <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
            Colorfloww is free on iOS and Android. Drop your email to stay in the loop — get tips, trend drops, and updates from the community.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#4A7B6E]/20 border border-[#4A7B6E]/30 rounded-2xl px-8 py-5 text-[#4A7B6E] font-medium inline-block"
            >
              You&apos;re in. We&apos;ll be in touch.
            </motion.div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-13 px-5 bg-white/8 border-white/12 text-white placeholder:text-gray-500 rounded-xl focus:border-[#4A7B6E] focus:ring-[#4A7B6E]"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-13 px-6 bg-[#4A7B6E] hover:bg-[#3d6b5f] text-white rounded-xl font-medium gap-2 whitespace-nowrap disabled:opacity-60"
                >
                  {submitting ? 'Saving…' : <><>Stay updated</> <ArrowRight className="w-4 h-4" /></>}
                </Button>
              </form>
              {errorMsg && (
                <p className="text-red-400 text-xs mt-2">{errorMsg}</p>
              )}
            </>
          )}

          <p className="text-xs text-gray-600 mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
