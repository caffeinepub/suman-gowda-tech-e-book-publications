import { eBook } from '../../backend';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import BuyButton from '../payments/BuyButton';

interface EBookCardProps {
  ebook: eBook;
}

export default function EBookCard({ ebook }: EBookCardProps) {
  const coverUrl = ebook.coverImage?.getDirectURL();
  const price = Number(ebook.price) / 100;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        {coverUrl ? (
          <img src={coverUrl} alt={ebook.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground">📚</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{ebook.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">{ebook.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">₹{price.toFixed(2)}</span>
        <BuyButton ebook={ebook} />
      </CardFooter>
    </Card>
  );
}
