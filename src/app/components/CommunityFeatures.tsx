import { motion } from 'motion/react';
import { Flame, Gift, UserCheck } from 'lucide-react';

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto" style={{ width: '220px' }}>
      <div className="relative rounded-[2.4rem] overflow-hidden shadow-xl border-[8px] border-[#1C1C1E]">
        <img src={src} alt={alt} className="w-full block" />
      </div>
    </div>
  );
}

const perks = [
  {
    icon: Flame,
    title: 'Daily Streaks',
    description: 'Open the app every day, keep your streak alive. The more consistent you are, the more visibility your looks get.',
  },
  {
    icon: Gift,
    title: 'Refer & Reward',
    description: 'Share your personal code. Every friend you bring in unlocks benefits for both of you.',
  },
  {
    icon: UserCheck,
    title: 'Top Creators',
    description: 'The best color curators earn followers. Build your profile, grow your audience, lead the trends.',
  },
];

export function CommunityFeatures() {
  return (
    <section id="community" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#4A7B6E] text-sm font-semibold uppercase tracking-widest mb-3">Community</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6 leading-tight"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Color is more fun
              <br />
              <span className="text-[#4A7B6E]">when it's shared.</span>
            </h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              Colorfloww isn't just a tool — it's a living, breathing color community. Earn Karma, build streaks, refer friends, and rise to the top of the global leaderboard.
            </p>

            <div className="space-y-6">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EEF4F1] flex items-center justify-center flex-shrink-0">
                    <perk.icon className="w-5 h-5 text-[#4A7B6E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-1">{perk.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{perk.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Top Creators preview */}
            <div className="mt-10 bg-[#F8F6F3] rounded-2xl p-5 border border-black/5">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-medium">Today's Top Creators</div>
              {[
                { name: 'Zoe Nails', city: 'London', karma: '12,500' },
                { name: 'Pixel Artist', city: 'NYC', karma: '10,200' },
                { name: 'Gloss Guru', city: 'Tokyo', karma: '9,800' },
              ].map((creator, i) => (
                <div key={creator.name} className="flex items-center justify-between py-2.5 border-b border-black/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-4">{i + 1}</span>
                    <div className="w-7 h-7 rounded-full bg-[#4A7B6E]/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#4A7B6E]">{creator.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">{creator.name}</div>
                      <div className="text-xs text-gray-400">{creator.city}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-[#4A7B6E]">{creator.karma} karma</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — phone */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-[-40px] bg-[#4A7B6E]/8 rounded-full blur-3xl" />
              <PhoneFrame src="/IMG_2048.PNG" alt="Colorfloww profile — streaks and referral" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
