import { useState, useEffect } from 'react';
import { eBook } from '../../backend';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useAddOrUpdateEBook } from '../../hooks/useQueries';
import { toast } from 'sonner';

interface EBookEditorFormProps {
  ebook?: eBook;
  onSuccess?: () => void;
}

export default function EBookEditorForm({ ebook, onSuccess }: EBookEditorFormProps) {
  const [id, setId] = useState(ebook?.id || '');
  const [title, setTitle] = useState(ebook?.title || '');
  const [description, setDescription] = useState(ebook?.description || '');
  const [price, setPrice] = useState(ebook ? Number(ebook.price) / 100 : 0);

  const addOrUpdate = useAddOrUpdateEBook();

  useEffect(() => {
    if (ebook) {
      setId(ebook.id);
      setTitle(ebook.title);
      setDescription(ebook.description);
      setPrice(Number(ebook.price) / 100);
    }
  }, [ebook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id.trim() || !title.trim() || !description.trim() || price <= 0) {
      toast.error('Please fill in all fields with valid values');
      return;
    }

    try {
      await addOrUpdate.mutateAsync({
        id: id.trim(),
        title: title.trim(),
        description: description.trim(),
        price: Math.round(price * 100),
      });
      toast.success(ebook ? 'eBook updated successfully' : 'eBook created successfully');
      if (!ebook) {
        setId('');
        setTitle('');
        setDescription('');
        setPrice(0);
      }
      onSuccess?.();
    } catch (error: any) {
      console.error('eBook save error:', error);
      toast.error('Failed to save eBook. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="id">eBook ID</Label>
        <Input
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="unique-ebook-id"
          disabled={!!ebook}
          required
        />
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="eBook Title"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="eBook description..."
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="price">Price (₹)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          placeholder="99.00"
          required
        />
      </div>

      <Button type="submit" disabled={addOrUpdate.isPending} className="w-full">
        {addOrUpdate.isPending ? 'Saving...' : ebook ? 'Update eBook' : 'Create eBook'}
      </Button>
    </form>
  );
}
