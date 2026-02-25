import { motion } from 'motion/react';

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto" style={{ width: '220px' }}>
      <div className="relative rounded-[2.4rem] overflow-hidden shadow-xl border-[8px] border-[#1C1C1E]">
        <img src={src} alt={alt} className="w-full block" />
      </div>
      <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-16 h-4 bg-[#1C1C1E] rounded-b-xl z-10" />
    </div>
  );
}

function PlaceholderPhoneFrame() {
  const swatches = ['#FF6B9D', '#4A7B6E', '#FDCB6E', '#74B9FF', '#E17055', '#A29BFE', '#55EFC4', '#C44569'];
  return (
    <div className="relative mx-auto" style={{ width: '220px' }}>
      <div className="relative rounded-[2.4rem] overflow-hidden shadow-xl border-[8px] border-[#1C1C1E]">
        {/* Simulated phone screen */}
        <div className="bg-[#F2F0EC]" style={{ aspectRatio: '9/19.5' }}>
          {/* Fake status bar */}
          <div className="flex justify-between items-center px-5 pt-3 pb-1">
            <span className="text-[8px] font-semibold text-gray-400">11:33</span>
            <div className="flex gap-0.5 items-center">
              <div className="w-3 h-1.5 rounded-sm bg-gray-300" />
              <div className="w-1 h-1 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Header */}
          <div className="px-5 pt-3 pb-2">
            <div className="text-[11px] font-bold text-gray-700 mb-0.5">Try-On</div>
            <div className="text-[8px] text-gray-400">See it on your nails</div>
          </div>

          {/* Fake hand/nail preview area */}
          <div className="mx-4 rounded-2xl overflow-hidden mb-3" style={{ height: '120px' }}>
            <div className="w-full h-full bg-gradient-to-br from-[#E8D5C4] via-[#D4B9A8] to-[#C4A090] flex items-center justify-center">
              <div className="text-center">
                {/* Simple nail silhouette shapes */}
                <div className="flex gap-1.5 justify-center mb-1">
                  {['#4A7B6E', '#4A7B6E', '#4A7B6E', '#4A7B6E', '#4A7B6E'].map((c, i) => (
                    <div
                      key={i}
                      className="rounded-t-full rounded-b-sm"
                      style={{ backgroundColor: c, width: 10, height: 16 + (i === 2 ? 4 : i === 1 || i === 3 ? 2 : 0), opacity: 0.9 }}
                    />
                  ))}
                </div>
                <div className="text-[7px] text-white/70 mt-1">color overlay</div>
              </div>
            </div>
          </div>

          {/* Color palette row */}
          <div className="px-4 mb-3">
            <div className="text-[8px] font-semibold text-gray-600 mb-1.5">Choose a shade</div>
            <div className="flex gap-1.5 flex-wrap">
              {swatches.map((c) => (
                <div
                  key={c}
                  className="rounded-full shadow-sm border-2 border-white"
                  style={{ backgroundColor: c, width: 18, height: 18 }}
                />
              ))}
            </div>
          </div>

          {/* Coming soon label */}
          <div className="mx-4 bg-[#4A7B6E]/10 rounded-xl px-3 py-2 text-center">
            <div className="text-[8px] text-[#4A7B6E] font-semibold">Screenshot coming soon</div>
          </div>
        </div>
      </div>
      <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-16 h-4 bg-[#1C1C1E] rounded-b-xl z-10" />
    </div>
  );
}

const steps = [
  {
    number: '01',
    title: 'Browse or Mix Your Shade',
    description: 'Scroll through curated collections — Pastels, Bold, Trending — or open Custom Mix and dial in any exact color with RGB sliders. Over 5 million combinations at your fingertips.',
    image: '/IMG_2043.PNG',
    imageAlt: 'Colorfloww home screen with color collections',
    placeholder: false,
  },
  {
    number: '02',
    title: 'See It on Your Actual Nails',
    description: 'Take a photo of your hand. The app instantly overlays any color onto your real nails — on your skin tone, your nail shape, your lighting. No guessing. No surprises.',
    image: '/step_2.png',
    imageAlt: 'Colorfloww try-on — color overlaid on real nails',
    placeholder: false,
  },
  {
    number: '03',
    title: 'Share, Vote & Climb the Ranks',
    description: 'Post your look to the community. Let others swipe on it in the Spotlight feed and earn Karma. Watch your color trend in the Kingdom of Color global leaderboard.',
    image: '/IMG_2047.PNG',
    imageAlt: 'Kingdom of Color global rankings',
    placeholder: false,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#4A7B6E] text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Three steps to your perfect shade
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            From curious to confident — in under a minute.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
            >
              {/* Text — alternates sides */}
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <span
                  className="text-8xl font-bold leading-none block mb-2 select-none"
                  style={{ fontFamily: "'Quicksand', sans-serif", color: '#4A7B6E', opacity: 0.12 }}
                >
                  {step.number}
                </span>
                <h3
                  className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4 -mt-4"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed">{step.description}</p>
              </div>

              {/* Phone */}
              <div className={`flex justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative">
                  <div className="absolute inset-[-30px] bg-[#4A7B6E]/8 rounded-full blur-3xl" />
                  {step.placeholder
                    ? <PlaceholderPhoneFrame />
                    : <PhoneFrame src={step.image} alt={step.imageAlt} />
                  }
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
