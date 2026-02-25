import { motion } from 'motion/react';
import { Ban, Sparkle, Palette, Globe } from 'lucide-react';

const benefits = [
  {
    icon: Ban,
    title: 'No more wrong purchases',
    description:
      'You picked the perfect shade in the store. It looked completely different on your nails. We built Colorfloww so that never happens again.',
  },
  {
    icon: Sparkle,
    title: 'Arrive at the salon decided',
    description:
      'Stop sitting in the salon chair scrolling through a binder of swatches. Know your color before you book.',
  },
  {
    icon: Palette,
    title: 'Any color. Literally any color.',
    description:
      'Can\'t find your shade? Mix it. Drag red, green, and blue sliders until you hit exactly the color you imagined. Then try it on instantly.',
  },
  {
    icon: Globe,
    title: 'Join a global color community',
    description:
      'Your taste matters. Share your looks, vote on others, and see your color trend globally. Karma is real — and so are the Top Creators.',
  },
];

export function Benefits() {
  return (
    <section className="py-24 px-4 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#4A7B6E] text-sm font-semibold uppercase tracking-widest mb-3">Why Colorfloww</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Built for every nail decision you've ever regretted
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 border border-white/8 rounded-2xl p-8 hover:bg-white/8 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-[#4A7B6E]/20 flex items-center justify-center mb-6">
                <b.icon className="w-5 h-5 text-[#4A7B6E]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{b.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
