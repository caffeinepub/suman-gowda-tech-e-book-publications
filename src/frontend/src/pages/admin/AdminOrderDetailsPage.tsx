import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetOrder, useGetEBook } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AdminOrderDetailsPage() {
  const { orderId } = useParams({ from: '/admin/orders/$orderId' });
  const navigate = useNavigate();
  const { data: order, isLoading: orderLoading } = useGetOrder(orderId);
  const { data: ebook, isLoading: ebookLoading } = useGetEBook(order?.eBookId || '');

  if (orderLoading || ebookLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    );
  }

  return (
    <div>
      <Button variant="ghost" onClick={() => navigate({ to: '/admin/orders' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      <h2 className="mb-6 text-3xl font-bold">Order Details</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-mono text-sm">{order.userId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-xl font-bold">₹{(Number(order.amount) / 100).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium">
                {order.status}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Download Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Downloads</p>
              <p className="text-3xl font-bold">{Number(order.downloadCount)}</p>
            </div>
            {ebook && (
              <div>
                <p className="text-sm text-muted-foreground">eBook</p>
                <p className="font-medium">{ebook.title}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
