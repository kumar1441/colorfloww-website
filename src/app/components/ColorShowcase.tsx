import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const colors = [
  '#FF6B9D', '#C44569', '#F8B500', '#EE5A6F', '#FF7979',
  '#6C5CE7', '#A29BFE', '#00B894', '#00CEC9', '#0984E3',
  '#FDCB6E', '#E17055', '#FD79A8', '#FDCB6E', '#74B9FF',
  '#A29BFE', '#FF7675', '#55EFC4', '#81ECEC', '#FAB1A0',
];

export function ColorShowcase() {
  const [visibleColors, setVisibleColors] = useState(colors);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleColors((prev) => {
        const newColors = [...prev];
        const randomIndex = Math.floor(Math.random() * newColors.length);
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        newColors[randomIndex] = randomColor;
        return newColors;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Millions of Colors at Your Fingertips
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From classic reds to trending pastels, find the perfect shade for every occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-3 md:gap-4 mb-12">
          {visibleColors.map((color, index) => (
            <motion.div
              key={`${color}-${index}`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              animate={{ backgroundColor: color }}
              className="aspect-square rounded-lg shadow-lg cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-8 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                5M+
              </div>
              <div className="text-sm text-gray-300 mt-1">Colors Available</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-gray-300 mt-1">Free Forever</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Instant
              </div>
              <div className="text-sm text-gray-300 mt-1">Results</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
