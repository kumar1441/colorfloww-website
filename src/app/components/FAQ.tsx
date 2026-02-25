import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'How does the virtual try-on actually work?',
    answer: 'You take a photo of your hand using the app\'s camera. Colorfloww detects your nails and overlays any color you choose in real time — on your actual nails, your exact skin tone, your real lighting. The result is a true preview of what that color will look like on you.',
  },
  {
    question: 'Is Colorfloww free?',
    answer: 'Yes — the core experience is free forever. You can browse collections, try on colors, use Custom Mix, vote in Spotlight, and see global rankings at no cost.',
  },
  {
    question: 'What is the Custom Mix feature?',
    answer: 'Custom Mix lets you build any color from scratch using RGB sliders. You can see a live color preview, copy the hex code, and instantly try it on your nails. If the color you\'re imagining doesn\'t exist in any collection, you can create it yourself.',
  },
  {
    question: 'What is Spotlight and how does Karma work?',
    answer: 'Spotlight is a Tinder-style feed of real nail looks submitted by the community. You swipe on looks you love. When others swipe on your looks, you earn Karma points. Karma builds your profile ranking and visibility in the app.',
  },
  {
    question: 'What is Kingdom of Color?',
    answer: 'Kingdom of Color is the global trend leaderboard. It shows you which colors and shades are trending worldwide or in your city right now, in real time. You can switch between global and local views to see what\'s popular near you.',
  },
  {
    question: 'What devices does Colorfloww support?',
    answer: 'Colorfloww is available on iOS (iPhone, iOS 14+) and Android (Android 8+). Both apps are free on the App Store and Google Play.',
  },
  {
    question: 'Can I use Colorfloww before I go to the salon?',
    answer: 'Absolutely — that\'s one of the most common use cases. Try colors at home before your appointment so you arrive knowing exactly what you want. No more pointing at a swatch and hoping it looks good on you.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#4A7B6E] text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Questions answered
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#F8F6F3] rounded-2xl px-6 border-none"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 text-[#1A1A1A]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
