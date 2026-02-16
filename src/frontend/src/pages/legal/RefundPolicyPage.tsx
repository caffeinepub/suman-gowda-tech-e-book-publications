import { usePageMeta } from '../../hooks/usePageMeta';

export default function RefundPolicyPage() {
  usePageMeta('Refund Policy', 'Understand our refund policy for digital eBook purchases.');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Refund Policy</h1>
        
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Digital Products Refund Policy</h2>
          <p>
            Due to the nature of digital products, all sales of eBooks are generally final. Once you have downloaded or
            accessed the digital content, we cannot offer a refund.
          </p>

          <h2>Exceptions</h2>
          <p>We may consider refund requests in the following circumstances:</p>
          <ul>
            <li>Technical issues that prevent you from accessing or downloading the purchased eBook</li>
            <li>Duplicate purchases made in error</li>
            <li>Significant discrepancies between the product description and actual content</li>
          </ul>

          <h2>Refund Request Process</h2>
          <p>To request a refund, please:</p>
          <ol>
            <li>Contact us within 7 days of purchase through our contact page</li>
            <li>Provide your order details and reason for the refund request</li>
            <li>Allow up to 5-7 business days for us to review your request</li>
          </ol>

          <h2>Refund Processing</h2>
          <p>
            If your refund is approved, it will be processed within 7-10 business days. The refund will be credited to
            the original payment method used for the purchase.
          </p>

          <h2>Technical Support</h2>
          <p>
            Before requesting a refund due to technical issues, please contact our support team. We're here to help
            resolve any problems you may encounter with downloading or accessing your eBook.
          </p>

          <h2>Non-Refundable Situations</h2>
          <p>Refunds will not be provided in the following cases:</p>
          <ul>
            <li>Change of mind after accessing the content</li>
            <li>Failure to read the product description before purchase</li>
            <li>Requests made more than 7 days after purchase</li>
            <li>Violation of our Terms and Conditions</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about our refund policy or need to request a refund, please contact us through our
            contact page or email us directly.
          </p>
        </div>
      </div>
    </div>
  );
}
