import { useParams } from '@tanstack/react-router';
import { useGetOrder, useGetEBook, useIncrementDownloadCount } from '../../hooks/useQueries';
import { Button } from '../../components/ui/button';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function DownloadPage() {
  const { orderId } = useParams({ from: '/download/$orderId' });
  const { data: order, isLoading: orderLoading } = useGetOrder(orderId);
  const { data: ebook, isLoading: ebookLoading } = useGetEBook(order?.eBookId || '');
  const incrementDownload = useIncrementDownloadCount();

  const handleDownload = async () => {
    if (!ebook?.pdfFile || !orderId) {
      toast.error('Download not available');
      return;
    }

    try {
      await incrementDownload.mutateAsync(orderId);
      const pdfUrl = ebook.pdfFile.getDirectURL();
      window.open(pdfUrl, '_blank');
      toast.success('Download started!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download. Please try again.');
    }
  };

  if (orderLoading || ebookLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground">Loading your download...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order || !ebook) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">Order Not Found</h2>
            <p className="text-muted-foreground">We couldn't find this order. Please check your order ID.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold">Your eBook</h1>

        <div className="rounded-lg border border-border bg-card p-8">
          <div className="mb-6 flex items-start gap-6">
            {ebook.coverImage && (
              <img
                src={ebook.coverImage.getDirectURL()}
                alt={ebook.title}
                className="h-40 w-32 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold">{ebook.title}</h2>
              <p className="mb-4 text-muted-foreground">{ebook.description}</p>
              <div className="text-sm text-muted-foreground">
                <p>Order ID: {order.id}</p>
                <p>Downloads: {Number(order.downloadCount)}</p>
              </div>
            </div>
          </div>

          <Button onClick={handleDownload} disabled={!ebook.pdfFile || incrementDownload.isPending} className="w-full" size="lg">
            {incrementDownload.isPending ? (
              'Processing...'
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </>
            )}
          </Button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            You can download this eBook anytime using this link.
          </p>
        </div>
      </div>
    </div>
  );
}
