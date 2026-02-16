import { useState } from 'react';
import { useSubmitNewsletter } from '../../hooks/useQueries';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

export default function NewsletterCaptureForm() {
  const [email, setEmail] = useState('');
  const submitNewsletter = useSubmitNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    try {
      await submitNewsletter.mutateAsync(email);
      setEmail('');
      toast.success('Successfully subscribed to newsletter!');
    } catch (error: any) {
      console.error('Newsletter error:', error);
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1"
        required
      />
      <Button type="submit" size="icon" disabled={submitNewsletter.isPending}>
        <Mail className="h-4 w-4" />
      </Button>
    </form>
  );
}
