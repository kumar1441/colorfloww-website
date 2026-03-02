import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-[#F8F6F3]">

      {/* Header */}
      <header className="bg-[#F8F6F3]/90 backdrop-blur-md border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-semibold tracking-tight text-[#1A1A1A]"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Colorfloww
          </a>
          <a href="/" className="text-sm text-[#4A7B6E] font-medium hover:underline">
            ← Back to home
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#4A7B6E]/10 rounded-2xl mb-6">
            <Shield className="w-7 h-7 text-[#4A7B6E]" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-3"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">Last updated: February 25, 2026</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 px-8 py-10 text-sm text-gray-600 space-y-8 leading-relaxed"
        >
          <p>
            Colorfloww ("we", "us", or "our") operates the Colorfloww mobile application and website
            (collectively, the "Service"). This Privacy Policy explains what data we collect, why we
            collect it, and how we use it. By using our Service you agree to this policy.
          </p>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account information:</strong> email address, username, display name, gender, and zip/postal code — collected when you create an account.</li>
              <li><strong>Camera &amp; photos:</strong> the app requests camera access to capture a photo of your hand for the virtual try-on feature. Photos are processed locally on your device and/or sent to our servers solely to overlay nail color and return the result. We do not store raw photos longer than needed to produce the preview.</li>
              <li><strong>Approximate location:</strong> when you use the try-on feature, we may infer your city/region from your device's IP address to power local trend data (Kingdom of Color). We do not collect precise GPS coordinates.</li>
              <li><strong>Usage data:</strong> session activity, colors tried, Spotlight votes, streaks, and Karma scores — used to power in-app features and personalization.</li>
              <li><strong>Device information:</strong> operating system, device model, and app version — used for crash reporting and compatibility.</li>
              <li><strong>Email address (website):</strong> if you submit your email on our website, it is stored in our email marketing service (MailerLite) and used only to send product updates. You can unsubscribe at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and improve the virtual try-on and community features.</li>
              <li>To display global and local color trend rankings.</li>
              <li>To calculate Karma, streaks, and leaderboard positions.</li>
              <li>To send transactional emails (account, password reset) and, with your consent, product updates.</li>
              <li>To detect and prevent fraud or misuse.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">3. Data Sharing</h2>
            <p className="mb-2">We do not sell your personal data. We share it only with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Supabase</strong> — our database and authentication provider (data stored in the United States).</li>
              <li><strong>MailerLite</strong> — our email marketing platform (if you opted in via our website).</li>
              <li>Law enforcement or regulators when required by applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">4. Data Retention</h2>
            <p>We retain your account data while your account is active. You may request deletion of your account and associated data at any time by emailing us. Processed try-on images are not retained after the session that created them.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">5. Children</h2>
            <p>Colorfloww is not directed at children under 13 (or 16 in the EU). We do not knowingly collect personal data from children. If you believe a child has submitted data to us, please contact us and we will delete it.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">6. Your Rights</h2>
            <p>Depending on your jurisdiction you may have the right to access, correct, or delete your personal data, and to object to or restrict certain processing. To exercise these rights, contact us at the email below.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">7. Security</h2>
            <p>We use industry-standard security measures including encrypted storage and HTTPS transport. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">8. Changes to This Policy</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes by updating the "Last updated" date above or by in-app notice. Continued use of the Service after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">9. Contact</h2>
            <p>
              Questions? Email us at{' '}
              <a href="mailto:ravi@colorfloww.com" className="text-[#4A7B6E] underline">
                ravi@colorfloww.com
              </a>.
            </p>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-black/5 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Colorfloww. All rights reserved.</p>
        <p className="mt-1">
          <a href="/" className="hover:text-[#4A7B6E] transition-colors">Home</a>
          {' · '}
          <a href="/support" className="hover:text-[#4A7B6E] transition-colors">Support</a>
          {' · '}
          <a href="/terms" className="hover:text-[#4A7B6E] transition-colors">Terms</a>
        </p>
      </footer>
    </div>
  );
}
