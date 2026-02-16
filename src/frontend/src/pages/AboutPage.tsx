import { usePageMeta } from '../hooks/usePageMeta';
import { User, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  usePageMeta('About', 'Learn about Suman Gowda and our mission to provide practical tech resources for real jobs.');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">About Us</h1>

        <div className="mb-12 rounded-lg border border-border bg-card p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Suman Gowda</h2>
              <p className="text-muted-foreground">Founder</p>
            </div>
          </div>

          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Welcome to Suman Gowda Tech e-Book Publications! I'm Suman Gowda, and I created this platform with a
              simple mission: to make quality tech education accessible and affordable for everyone.
            </p>
            <p>
              Throughout my career in technology, I've seen countless talented students and freshers struggle to find
              practical, job-focused learning resources that don't cost a fortune. Most educational content is either
              too expensive or too theoretical, leaving a gap between what people learn and what employers actually need.
            </p>
            <p>
              That's why I started creating eBooks focused on real-world skills: SQL, Data Analytics, Automation, and
              Interview Preparation. These are the topics that matter most when you're trying to land your first job or
              advance your career in tech.
            </p>
            <p>
              Every eBook is designed to be practical, affordable, and immediately applicable. No fluff, no unnecessary
              theory—just the skills you need to succeed in real jobs.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Our Mission</h3>
            <p className="text-muted-foreground">
              To provide affordable, practical tech education that helps students, freshers, and IT job seekers build
              the skills they need to succeed in their careers.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Our Values</h3>
            <p className="text-muted-foreground">
              Accessibility, practicality, and quality. We believe everyone deserves access to education that prepares
              them for real-world challenges and opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
