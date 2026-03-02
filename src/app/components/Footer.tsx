import { Instagram, Twitter } from 'lucide-react';
import { TermsModal } from './TermsModal';
import { useState } from 'react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z" />
    </svg>
  );
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Instagram', Icon: Instagram, href: 'https://www.instagram.com/getcolorfloww' },
  { label: 'TikTok', Icon: TikTokIcon, href: 'https://www.tiktok.com/@trycolorfloww' },
  { label: 'Twitter', Icon: Twitter, href: 'https://x.com/ravi1doddi' },
  { label: 'Reddit', Icon: RedditIcon, href: 'https://www.reddit.com/user/SundaeDull9807/' },
  { label: 'Pinterest', Icon: PinterestIcon, href: 'https://www.pinterest.com/colorfloww' },
];

export function Footer() {
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />

      <footer className="bg-[#111111] text-white py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">

            {/* Brand */}
            <div>
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Colorfloww
              </span>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                See the Color. Skip the Regret.
                <br />
                Virtual nail try-on — free on iOS &amp; Android.
              </p>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              {[
                { label: 'Features', id: 'features' },
                { label: 'How It Works', id: 'how-it-works' },
                { label: 'Community', id: 'community' },
                { label: 'FAQ', id: 'faq' },
              ].map(({ label, id }) => (
                <button
                  key={label}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
              <a
                href="/privacy"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <button
                onClick={() => setTermsOpen(true)}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                Terms
              </button>
              <a
                href="/support"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                Support
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} Colorfloww. All rights reserved.</p>
            <p>Available on iOS &amp; Android · Free</p>
          </div>
        </div>
      </footer>
    </>
  );
}
