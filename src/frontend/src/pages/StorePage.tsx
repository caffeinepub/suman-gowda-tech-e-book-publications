import { useGetAllEBooks } from '../hooks/useQueries';
import EBookCard from '../components/store/EBookCard';
import { usePageMeta } from '../hooks/usePageMeta';
import { BookOpen } from 'lucide-react';

export default function StorePage() {
  const { data: ebooks, isLoading } = useGetAllEBooks();
  usePageMeta('Store', 'Browse our collection of affordable tech eBooks on SQL, Data Analytics, Automation, and Interview Preparation.');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground">Loading eBooks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!ebooks || ebooks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">No eBooks Available Yet</h2>
            <p className="text-muted-foreground">
              Our catalog is being prepared. Please check back soon for exciting new content!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">eBook Store</h1>
        <p className="text-lg text-muted-foreground">
          Discover our collection of affordable tech eBooks designed for students, freshers, and IT job seekers.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ebooks.map((ebook) => (
          <EBookCard key={ebook.id} ebook={ebook} />
        ))}
      </div>
    </div>
  );
}
