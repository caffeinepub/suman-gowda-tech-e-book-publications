import { useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { BookOpen, Target, Users, Zap } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export default function HomePage() {
  const navigate = useNavigate();
  usePageMeta('Home', 'Affordable tech eBooks for students, freshers, and IT job seekers. Simple Tech Learning for Real Jobs.');

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Suman Gowda Tech e-Book Publications
          </h1>
          <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">
            Simple Tech Learning for Real Jobs
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" onClick={() => navigate({ to: '/store' })}>
              <BookOpen className="mr-2 h-5 w-5" />
              Explore eBooks
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate({ to: '/store' })}>
              Buy Now
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <p className="mb-4 text-lg text-muted-foreground">
              We believe that quality tech education should be accessible and affordable for everyone. Our eBooks are
              designed specifically for students, freshers, and IT job seekers who want to build practical skills that
              matter in the real world.
            </p>
            <p className="text-lg text-muted-foreground">
              From SQL and Data Analytics to Automation and Interview Preparation, we focus on the topics that will help
              you land your dream job and excel in your career.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Focused Content</h3>
              <p className="text-muted-foreground">
                Practical topics that matter for real jobs: SQL, Data Analytics, Automation, and Interview Prep.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Affordable Pricing</h3>
              <p className="text-muted-foreground">
                Quality education shouldn't break the bank. Our eBooks are priced for students and freshers.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Digital Delivery</h3>
              <p className="text-muted-foreground">
                Instant access to your eBooks after purchase. Learn anytime, anywhere, on any device.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Job-Ready Skills</h3>
              <p className="text-muted-foreground">
                Learn the skills that employers are looking for and ace your technical interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Start Learning?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Browse our collection of affordable tech eBooks and take the first step toward your dream career.
          </p>
          <Button size="lg" onClick={() => navigate({ to: '/store' })}>
            View All eBooks
          </Button>
        </div>
      </section>
    </div>
  );
}
