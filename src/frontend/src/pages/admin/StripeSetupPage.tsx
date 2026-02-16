import { useState, useEffect } from 'react';
import { useIsStripeConfigured, useSetStripeConfiguration } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { StripeConfiguration } from '../../backend';

export default function StripeSetupPage() {
  const { data: isConfigured, isLoading } = useIsStripeConfigured();
  const setConfig = useSetStripeConfiguration();

  const [secretKey, setSecretKey] = useState('');
  const [countries, setCountries] = useState('IN,US,GB,CA');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!secretKey.trim()) {
      toast.error('Please enter a Stripe secret key');
      return;
    }

    const countryList = countries
      .split(',')
      .map((c) => c.trim().toUpperCase())
      .filter((c) => c.length === 2);

    if (countryList.length === 0) {
      toast.error('Please enter at least one valid country code');
      return;
    }

    try {
      const config: StripeConfiguration = {
        secretKey: secretKey.trim(),
        allowedCountries: countryList,
      };
      await setConfig.mutateAsync(config);
      toast.success('Stripe configuration saved successfully');
      setSecretKey('');
    } catch (error: any) {
      console.error('Stripe config error:', error);
      toast.error('Failed to save Stripe configuration');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading Stripe configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold">Stripe Setup</h2>

      {isConfigured ? (
        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Stripe is configured and ready to accept payments.</AlertDescription>
        </Alert>
      ) : (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Stripe is not configured. Payment processing is disabled.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Configure Stripe</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="secretKey">Stripe Secret Key</Label>
              <Input
                id="secretKey"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="sk_test_..."
                required
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Your Stripe secret key (starts with sk_test_ or sk_live_)
              </p>
            </div>

            <div>
              <Label htmlFor="countries">Allowed Countries</Label>
              <Input
                id="countries"
                value={countries}
                onChange={(e) => setCountries(e.target.value)}
                placeholder="IN,US,GB,CA"
                required
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Comma-separated list of 2-letter country codes (e.g., IN for India, US for United States)
              </p>
            </div>

            <Button type="submit" disabled={setConfig.isPending}>
              {setConfig.isPending ? 'Saving...' : 'Save Configuration'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
