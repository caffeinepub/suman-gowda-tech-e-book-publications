import { useGetBusinessEmail } from '../hooks/useQueries';
import ContactForm from '../components/contact/ContactForm';
import { usePageMeta } from '../hooks/usePageMeta';
import { Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const { data: businessEmail, isLoading } = useGetBusinessEmail();
  usePageMeta('Contact', 'Get in touch with Suman Gowda Tech e-Book Publications. We\'re here to help!');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Contact Us</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-8 rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Email Us</h2>
              </div>
              {isLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : (
                <a
                  href={`mailto:${businessEmail}`}
                  className="text-lg text-primary hover:underline"
                >
                  {businessEmail}
                </a>
              )}
              <p className="mt-4 text-sm text-muted-foreground">
                We typically respond within 24-48 hours during business days.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Get in Touch</h2>
              </div>
              <p className="text-muted-foreground">
                Have questions about our eBooks? Need help with your purchase? Want to suggest a topic for a new eBook?
                We'd love to hear from you!
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-semibold">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
