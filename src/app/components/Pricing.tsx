import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const tiers = [
  {
    name: 'Free',
    tagline: 'Everything you need to start',
    price: '$0',
    priceSub: 'forever',
    highlight: false,
    features: [
      'Virtual try-on on your real nails',
      'Browse curated color collections',
      'Spotlight — swipe & vote on looks',
      'Submit your own looks',
      'Kingdom of Color — global rankings',
      'Basic color saving',
    ],
    cta: 'Download Free',
    ctaNote: 'No credit card. Ever.',
  },
  {
    name: 'Premium',
    tagline: 'For the serious color obsessive',
    price: 'TBA',
    priceSub: 'early bird discount for waitlist',
    highlight: true,
    features: [
      'Everything in Free',
      'Advanced AI — ultra-realistic overlay',
      'Unlimited color saves',
      'Exclusive brand & designer collections',
      'Ad-free experience',
      'Priority ranking in Spotlight',
    ],
    cta: 'Get Early Bird Pricing',
    ctaNote: 'Waitlist members get first access to discount.',
  },
];

export function Pricing() {
  const scrollToNotify = () => {
    document.getElementById('notify')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4 bg-[#EEF4F1]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#4A7B6E] text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Start free. Go deeper when you're ready.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Core features are free forever. Premium pricing will be announced at launch — waitlist members get an early bird discount.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`rounded-3xl p-8 md:p-10 flex flex-col ${
                tier.highlight
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white border border-black/8'
              }`}
            >
              {tier.highlight && (
                <div className="inline-flex items-center gap-1.5 bg-[#4A7B6E]/20 text-[#4A7B6E] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 w-fit">
                  <span className="w-1.5 h-1.5 bg-[#4A7B6E] rounded-full" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-2xl font-bold mb-1 ${tier.highlight ? 'text-white' : 'text-[#1A1A1A]'}`}
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {tier.name}
                </h3>
                <p className={`text-sm ${tier.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                  {tier.tagline}
                </p>
              </div>

              <div className="mb-8">
                <span
                  className={`text-5xl font-bold ${tier.highlight ? 'text-white' : 'text-[#1A1A1A]'}`}
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {tier.price}
                </span>
                <span className={`text-sm ml-2 ${tier.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                  {tier.priceSub}
                </span>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-[#4A7B6E]' : 'text-[#4A7B6E]'}`} />
                    <span className={`text-sm leading-relaxed ${tier.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div>
                <Button
                  onClick={scrollToNotify}
                  className={`w-full h-12 rounded-xl font-medium gap-2 ${
                    tier.highlight
                      ? 'bg-[#4A7B6E] hover:bg-[#3d6b5f] text-white'
                      : 'bg-[#1A1A1A] hover:bg-black text-white'
                  }`}
                >
                  {tier.cta} <ArrowRight className="w-4 h-4" />
                </Button>
                <p className={`text-xs mt-3 text-center ${tier.highlight ? 'text-gray-500' : 'text-gray-400'}`}>
                  {tier.ctaNote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
