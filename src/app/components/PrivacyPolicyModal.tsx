import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Privacy Policy
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-gray-600 space-y-5 leading-relaxed">
          <p className="text-xs text-gray-400">Last updated: February 25, 2026</p>

          <p>
            Colorfloww ("we", "us", or "our") operates the Colorfloww mobile application and website (collectively, the "Service"). This Privacy Policy explains what data we collect, why we collect it, and how we use it. By using our Service you agree to this policy.
          </p>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">1. Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account information:</strong> email address, username, display name, gender, and zip/postal code — collected when you create an account.</li>
              <li><strong>Camera &amp; photos:</strong> the app requests camera access to capture a photo of your hand for the virtual try-on feature. Photos are processed locally on your device and/or sent to our servers solely to overlay nail color and return the result. We do not store raw photos longer than needed to produce the preview.</li>
              <li><strong>Approximate location:</strong> when you use the try-on feature, we may infer your city/region from your device's IP address to power local trend data (Kingdom of Color). We do not collect precise GPS coordinates.</li>
              <li><strong>Usage data:</strong> session activity, colors tried, Spotlight votes, streaks, and Karma scores — used to power in-app features and personalization.</li>
              <li><strong>Device information:</strong> operating system, device model, and app version — used for crash reporting and compatibility.</li>
              <li><strong>Email address (website):</strong> if you submit your email on our website, it is stored in our email marketing service (MailerLite) and used only to send product updates. You can unsubscribe at any time.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">2. How We Use Your Information</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and improve the virtual try-on and community features.</li>
              <li>To display global and local color trend rankings.</li>
              <li>To calculate Karma, streaks, and leaderboard positions.</li>
              <li>To send transactional emails (account, password reset) and, with your consent, product updates.</li>
              <li>To detect and prevent fraud or misuse.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">3. Data Sharing</h3>
            <p>We do not sell your personal data. We share it only with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Supabase</strong> — our database and authentication provider (data stored in the United States).</li>
              <li><strong>MailerLite</strong> — our email marketing platform (if you opted in via our website).</li>
              <li>Law enforcement or regulators when required by applicable law.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">4. Data Retention</h3>
            <p>We retain your account data while your account is active. You may request deletion of your account and associated data at any time by emailing us. Processed try-on images are not retained after the session that created them.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">5. Children</h3>
            <p>Colorfloww is not directed at children under 13 (or 16 in the EU). We do not knowingly collect personal data from children. If you believe a child has submitted data to us, please contact us and we will delete it.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">6. Your Rights</h3>
            <p>Depending on your jurisdiction you may have the right to access, correct, or delete your personal data, and to object to or restrict certain processing. To exercise these rights, contact us at the email below.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">7. Security</h3>
            <p>We use industry-standard security measures including encrypted storage and HTTPS transport. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">8. Changes to This Policy</h3>
            <p>We may update this policy from time to time. We will notify you of significant changes by updating the "Last updated" date above or by in-app notice. Continued use of the Service after changes constitutes acceptance.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">9. Contact</h3>
            <p>Questions? Email us at <a href="mailto:hello@colorfloww.com" className="text-[#4A7B6E] underline">hello@colorfloww.com</a>.</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
