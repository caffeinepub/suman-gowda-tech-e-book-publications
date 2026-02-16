import { useGetAllNewsletterEmails } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminNewsletterPage() {
  const { data: emails, isLoading } = useGetAllNewsletterEmails();

  const handleExport = () => {
    if (!emails || emails.length === 0) {
      toast.error('No emails to export');
      return;
    }

    const csv = 'Email\n' + emails.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-emails-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Emails exported successfully');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading newsletter emails...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Newsletter Subscribers</h2>
        <Button onClick={handleExport} disabled={!emails || emails.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscriber List ({emails?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {emails && emails.length > 0 ? (
            <div className="space-y-2">
              {emails.map((email, index) => (
                <div key={index} className="rounded-lg border border-border p-3">
                  <p className="font-mono text-sm">{email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground">No subscribers yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
