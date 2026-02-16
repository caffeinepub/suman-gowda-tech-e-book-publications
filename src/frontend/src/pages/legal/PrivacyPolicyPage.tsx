import { usePageMeta } from '../../hooks/usePageMeta';

export default function PrivacyPolicyPage() {
  usePageMeta('Privacy Policy', 'Read our privacy policy to understand how we collect, use, and protect your personal information.');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Introduction</h2>
          <p>
            Suman Gowda Tech e-Book Publications ("we", "our", or "us") is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
            website and purchase our digital products.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and email address when you make a purchase or contact us</li>
            <li>Payment information processed securely through our payment provider</li>
            <li>Newsletter subscription information if you opt in</li>
            <li>Messages and communications you send to us</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your purchases and deliver digital products</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you newsletters and promotional materials (if you've opted in)</li>
            <li>Improve our products and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
            Internet is 100% secure.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We use third-party payment processors to handle transactions. These providers have their own privacy
            policies and we encourage you to review them.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through our contact page or email us
            directly.
          </p>
        </div>
      </div>
    </div>
  );
}
