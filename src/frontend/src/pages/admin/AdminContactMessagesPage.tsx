import { useGetAllContactSubmissions, useDeleteContactSubmission } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminContactMessagesPage() {
  const { data: submissions, isLoading } = useGetAllContactSubmissions();
  const deleteSubmission = useDeleteContactSubmission();

  const handleDelete = async (id: bigint) => {
    try {
      await deleteSubmission.mutateAsync(id);
      toast.success('Message deleted');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete message');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold">Contact Messages</h2>

      {submissions && submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((submission, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{submission.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(submission.timestamp)}
                    disabled={deleteSubmission.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{submission.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Message</p>
                  <p className="whitespace-pre-wrap">{submission.message}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Received: {new Date(Number(submission.timestamp) / 1000000).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">No messages yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
