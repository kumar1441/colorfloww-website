import { motion } from 'motion/react';
import { Heart, Trophy, Sliders } from 'lucide-react';

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto" style={{ width: '240px' }}>
      <div className="relative rounded-[2.6rem] overflow-hidden shadow-2xl border-[8px] border-[#1C1C1E]">
        <img src={src} alt={alt} className="w-full block" />
      </div>
      <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-16 h-4 bg-[#1C1C1E] rounded-b-xl z-10" />
    </div>
  );
}

const features = [
  {
    icon: Heart,
    tag: 'Spotlight',
    title: 'Swipe on looks.\nEarn Karma.',
    description:
      'A never-ending feed of real nail looks from the community. Swipe right on colors you love. Submit your own look, collect votes, and watch your Karma score climb.',
    callout: { value: '+5 Karma', label: 'per vote you receive' },
    image: '/spotlight.png',
    imageAlt: 'Spotlight screen — Tinder-style nail voting',
    bg: '#EEF4F1',
  },
  {
    icon: Trophy,
    tag: 'Kingdom of Color',
    title: 'Every shade has\na global ranking.',
    description:
      'Real-time leaderboards show which colors are dominating worldwide and in your city right now. Watch trends erupt. Be early. Be ahead.',
    callout: { value: '#NeonMatte', label: 'trending in London today' },
    image: '/IMG_2047.PNG',
    imageAlt: 'Kingdom of Color global rankings screen',
    bg: '#F8F6F3',
  },
  {
    icon: Sliders,
    tag: 'Custom Mix',
    title: 'If it doesn\'t exist,\nbuild it.',
    description:
      'Drag RGB sliders to mix any color imaginable. Preview it live, copy the hex code, try it on your nails instantly. No polish in the world can limit you.',
    callout: { value: '∞ combinations', label: 'only you can dream up' },
    image: '/IMG_2046.PNG',
    imageAlt: 'Custom Mix RGB color slider screen',
    bg: '#EEF4F1',
  },
];

export function FeatureShowcase() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[#4A7B6E] text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            More than a color picker
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Colorfloww is a full beauty community — built around the universal language of color.
          </p>
        </motion.div>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl overflow-hidden"
              style={{ backgroundColor: feature.bg }}
            >
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-center ${
                  index % 2 === 1 ? '' : ''
                }`}
              >
                {/* Text side */}
                <div className={`p-10 md:p-16 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="inline-flex items-center gap-2 bg-[#4A7B6E]/10 text-[#4A7B6E] px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest">
                    <feature.icon className="w-3.5 h-3.5" />
                    {feature.tag}
                  </div>

                  <h3
                    className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-5 whitespace-pre-line leading-tight"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 text-lg leading-relaxed mb-8">{feature.description}</p>

                  <div className="bg-white rounded-2xl px-5 py-4 inline-flex items-center gap-4 shadow-sm border border-black/5">
                    <div className="text-2xl font-bold text-[#4A7B6E]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      {feature.callout.value}
                    </div>
                    <div className="text-sm text-gray-400">{feature.callout.label}</div>
                  </div>
                </div>

                {/* Image side */}
                <div
                  className={`flex justify-center items-end pt-10 md:pt-0 pb-0 px-8 ${
                    index % 2 === 1 ? 'md:order-1' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#4A7B6E]/10 blur-3xl rounded-full scale-110" />
                    <PhoneFrame src={feature.image} alt={feature.imageAlt} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
