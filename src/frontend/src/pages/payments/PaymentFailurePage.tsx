import { useNavigate } from '@tanstack/react-router';
import { Button } from '../../components/ui/button';
import { XCircle } from 'lucide-react';

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <XCircle className="mx-auto mb-6 h-20 w-20 text-destructive" />
        <h1 className="mb-4 text-4xl font-bold">Payment Cancelled</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Your payment was not completed. No charges have been made to your account.
        </p>

        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">What happened?</h2>
          <p className="text-muted-foreground">
            You may have cancelled the payment or there was an issue processing your transaction. Don't worry, you can
            try again anytime.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={() => navigate({ to: '/store' })}>
            Return to Store
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate({ to: '/contact' })}>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
