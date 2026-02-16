import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useActor } from '../../hooks/useActor';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '../../components/ui/button';
import { CheckCircle, Download } from 'lucide-react';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get('session_id');
    setSessionId(sid);

    if (sid && actor && identity) {
      processPayment(sid);
    }
  }, [actor, identity]);

  const processPayment = async (sid: string) => {
    try {
      if (!actor) return;

      const status = await actor.getStripeSessionStatus(sid);
      
      if (status.__kind__ === 'completed') {
        const oid = `order-${Date.now()}`;
        setOrderId(oid);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground">Processing your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <CheckCircle className="mx-auto mb-6 h-20 w-20 text-green-500" />
        <h1 className="mb-4 text-4xl font-bold">Payment Successful!</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed and you can now access your eBook.
        </p>

        {orderId && (
          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <p className="mb-2 text-sm text-muted-foreground">Order ID</p>
            <p className="font-mono text-lg">{orderId}</p>
          </div>
        )}

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {orderId && (
            <Button size="lg" onClick={() => navigate({ to: `/download/${orderId}` })}>
              <Download className="mr-2 h-5 w-5" />
              Download eBook
            </Button>
          )}
          <Button size="lg" variant="outline" onClick={() => navigate({ to: '/store' })}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
