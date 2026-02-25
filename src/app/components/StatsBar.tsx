import { motion } from 'motion/react';

const stats = [
  { value: '5M+', label: 'Colors to explore' },
  { value: 'Free', label: 'To download & start' },
  { value: 'iOS & Android', label: 'Both platforms' },
  { value: 'Instant', label: 'Color try-on' },
];

export function StatsBar() {
  return (
    <section className="py-10 px-4 bg-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center relative"
            >
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" />
              )}
              <div className="text-2xl md:text-3xl font-bold text-white mb-1"
                style={{ fontFamily: "'Quicksand', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
