import { usePageMeta } from '../../hooks/usePageMeta';

export default function TermsAndConditionsPage() {
  usePageMeta('Terms & Conditions', 'Read our terms and conditions for using our website and purchasing our digital products.');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Terms & Conditions</h1>
        
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Agreement to Terms</h2>
          <p>
            By accessing and using Suman Gowda Tech e-Book Publications, you agree to be bound by these Terms and
            Conditions. If you do not agree with any part of these terms, you may not use our services.
          </p>

          <h2>Digital Products</h2>
          <p>
            All eBooks and digital products sold on this platform are for personal use only. You may not:
          </p>
          <ul>
            <li>Redistribute, resell, or share the digital products with others</li>
            <li>Modify, adapt, or create derivative works from our content</li>
            <li>Use the content for commercial purposes without written permission</li>
            <li>Remove or alter any copyright notices or proprietary markings</li>
          </ul>

          <h2>Purchases and Payments</h2>
          <p>
            All purchases are processed securely through our payment provider. By making a purchase, you agree to
            provide accurate payment information and authorize us to charge the specified amount.
          </p>

          <h2>Digital Delivery</h2>
          <p>
            Upon successful payment, you will receive access to download your purchased eBook. It is your responsibility
            to download and save the file. We are not responsible for lost files after delivery.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content, including text, graphics, logos, and digital products, is the property of Suman Gowda Tech
            e-Book Publications and is protected by copyright laws. Unauthorized use is prohibited.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            We provide our digital products "as is" without warranties of any kind. We are not liable for any damages
            arising from the use or inability to use our products or services.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our services after changes
            constitutes acceptance of the modified terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms and Conditions, please contact us through our contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
