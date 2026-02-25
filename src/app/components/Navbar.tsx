import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F6F3]/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <span
          className="text-xl font-semibold tracking-tight cursor-pointer"
          style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}
        >
          Colorfloww
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Features', id: 'features' },
            { label: 'How It Works', id: 'how-it-works' },
            { label: 'Community', id: 'community' },
            { label: 'FAQ', id: 'faq' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm text-gray-500 hover:text-[#4A7B6E] transition-colors font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            onClick={() => scrollTo('notify')}
            className="h-9 px-5 bg-[#4A7B6E] hover:bg-[#3d6b5f] text-white text-sm rounded-full"
          >
            Download Free
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#F8F6F3] border-t border-black/5 px-4 pb-4 pt-2 flex flex-col gap-3">
          {[
            { label: 'Features', id: 'features' },
            { label: 'How It Works', id: 'how-it-works' },
            { label: 'Community', id: 'community' },
            { label: 'FAQ', id: 'faq' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left text-sm text-gray-600 hover:text-[#4A7B6E] py-1 font-medium"
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => scrollTo('notify')}
            className="mt-2 h-10 bg-[#4A7B6E] hover:bg-[#3d6b5f] text-white rounded-full w-full"
          >
            Download Free
          </Button>
        </div>
      )}
    </nav>
  );
}
