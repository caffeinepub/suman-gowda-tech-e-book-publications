import { useState } from 'react';
import { useGetAllEBooks } from '../../hooks/useQueries';
import EBookEditorForm from '../../components/admin/EBookEditorForm';
import EBookAssetsUploader from '../../components/admin/EBookAssetsUploader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Plus, Edit } from 'lucide-react';
import { eBook } from '../../backend';

export default function AdminProductsPage() {
  const { data: ebooks, isLoading } = useGetAllEBooks();
  const [selectedEBook, setSelectedEBook] = useState<eBook | undefined>(undefined);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Products</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add eBook
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New eBook</DialogTitle>
            </DialogHeader>
            <EBookEditorForm onSuccess={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {ebooks && ebooks.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {ebooks.map((ebook) => (
            <Card key={ebook.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{ebook.title}</span>
                  <Dialog
                    open={isEditDialogOpen && selectedEBook?.id === ebook.id}
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open);
                      if (open) setSelectedEBook(ebook);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit eBook</DialogTitle>
                      </DialogHeader>
                      <EBookEditorForm ebook={ebook} onSuccess={() => setIsEditDialogOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{ebook.description}</p>
                <p className="mb-4 text-lg font-bold">₹{(Number(ebook.price) / 100).toFixed(2)}</p>
                <EBookAssetsUploader ebookId={ebook.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">No products yet. Create your first eBook!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
