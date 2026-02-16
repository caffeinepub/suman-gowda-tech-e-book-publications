import { useState } from 'react';
import { useCreateCheckoutSession } from '../../hooks/useStripeCheckout';
import { useIsStripeConfigured } from '../../hooks/useQueries';
import { eBook, ShoppingItem } from '../../backend';
import { Button } from '../ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface BuyButtonProps {
  ebook: eBook;
}

export default function BuyButton({ ebook }: BuyButtonProps) {
  const createCheckoutSession = useCreateCheckoutSession();
  const { data: isStripeConfigured, isLoading: isCheckingStripe } = useIsStripeConfigured();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuy = async () => {
    if (!isStripeConfigured) {
      toast.error('Payment system is not configured. Please contact the administrator.');
      return;
    }

    setIsProcessing(true);
    try {
      const shoppingItem: ShoppingItem = {
        productName: ebook.title,
        productDescription: ebook.description,
        priceInCents: ebook.price,
        quantity: BigInt(1),
        currency: 'inr',
      };

      const session = await createCheckoutSession.mutateAsync([shoppingItem]);
      
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }

      window.location.href = session.url;
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to initiate checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  const isLoading = isProcessing || createCheckoutSession.isPending;

  return (
    <Button onClick={handleBuy} disabled={isLoading || isCheckingStripe} size="sm">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now
        </>
      )}
    </Button>
  );
}
