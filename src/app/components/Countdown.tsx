import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const target = new Date('2026-02-25T09:00:00').getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Countdown email:', email);
      setSubmitted(true);
    }
  };

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <section className="py-24 px-4 bg-[#F8F6F3]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#4A7B6E] text-sm font-semibold uppercase tracking-widest mb-3">Launch Day</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            February 25, 2026
          </h2>
          <p className="text-lg text-gray-500 mb-12">Available on the App Store and Google Play</p>
        </motion.div>

        {/* Countdown tiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-4 gap-3 md:gap-5 mb-14 max-w-2xl mx-auto"
        >
          {units.map((unit, i) => (
            <div key={unit.label} className="bg-white rounded-2xl shadow-sm border border-black/5 p-4 md:p-7">
              <div
                className="text-4xl md:text-6xl font-bold text-[#1A1A1A] leading-none mb-2"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">{unit.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Email capture */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-md mx-auto"
        >
          {submitted ? (
            <div className="bg-[#4A7B6E]/10 border border-[#4A7B6E]/20 rounded-2xl px-8 py-5 text-[#4A7B6E] font-medium">
              You're on the list. We'll ping you the moment it's live.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 px-5 bg-white border-gray-200 rounded-xl shadow-sm"
              />
              <Button
                type="submit"
                className="h-12 px-6 bg-[#4A7B6E] hover:bg-[#3d6b5f] text-white rounded-xl gap-2 whitespace-nowrap"
              >
                Notify me <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
