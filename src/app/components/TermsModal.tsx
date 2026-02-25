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

export function TermsModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Terms of Service
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-gray-600 space-y-5 leading-relaxed">
          <p className="text-xs text-gray-400">Last updated: February 25, 2026</p>

          <p>
            These Terms of Service ("Terms") govern your use of the Colorfloww mobile application and website (the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
          </p>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">1. Eligibility</h3>
            <p>You must be at least 13 years old (or 16 in the EU) to use the Service. By using Colorfloww you represent that you meet this requirement.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">2. Your Account</h3>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately of any unauthorized use at <a href="mailto:hello@colorfloww.com" className="text-[#4A7B6E] underline">hello@colorfloww.com</a>.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">3. Acceptable Use</h3>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>Upload content that is illegal, obscene, harassing, or infringes third-party rights.</li>
              <li>Submit photos of other people without their consent.</li>
              <li>Attempt to reverse-engineer, scrape, or otherwise extract data from the Service.</li>
              <li>Use the Service to send spam or automated requests.</li>
              <li>Impersonate another person or entity.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">4. User Content</h3>
            <p>When you submit content to Spotlight or other community features, you grant Colorfloww a non-exclusive, worldwide, royalty-free license to display and distribute that content within the Service. You retain ownership. We may remove any content that violates these Terms at our discretion.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">5. Karma, Streaks &amp; Rewards</h3>
            <p>Karma points, streaks, leaderboard rankings, and any other in-app rewards have no monetary value and cannot be exchanged for cash or any other consideration. We reserve the right to adjust, reset, or discontinue these features at any time.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">6. Intellectual Property</h3>
            <p>The Colorfloww name, logo, and all original content (excluding user-submitted content) are owned by Colorfloww and protected by applicable intellectual property laws. You may not reproduce or redistribute them without our written permission.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">7. Disclaimer of Warranties</h3>
            <p>The Service is provided "as is" without warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that virtual try-on results will accurately represent real-world nail color appearance.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">8. Limitation of Liability</h3>
            <p>To the maximum extent permitted by law, Colorfloww and its team shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Service.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">9. Termination</h3>
            <p>We may suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion. You may delete your account at any time from within the app or by contacting us.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">10. Changes to Terms</h3>
            <p>We may update these Terms from time to time. We will notify you of material changes by updating the "Last updated" date. Continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">11. Governing Law</h3>
            <p>These Terms are governed by the laws of the jurisdiction in which Colorfloww is registered, without regard to conflict-of-law principles.</p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">12. Contact</h3>
            <p>Questions about these Terms? Email us at <a href="mailto:hello@colorfloww.com" className="text-[#4A7B6E] underline">hello@colorfloww.com</a>.</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
