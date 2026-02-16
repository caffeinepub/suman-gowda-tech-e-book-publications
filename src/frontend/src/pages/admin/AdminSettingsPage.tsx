import { useState, useEffect } from 'react';
import { useGetBusinessEmail, useUpdateBusinessEmail, useGrantAdminRole } from '../../hooks/useQueries';
import { useSiteLinks } from '../../hooks/useSiteLinks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';

export default function AdminSettingsPage() {
  const { data: businessEmail, isLoading } = useGetBusinessEmail();
  const updateEmail = useUpdateBusinessEmail();
  const grantAdmin = useGrantAdminRole();
  const { links, updateLinks } = useSiteLinks();

  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [telegram, setTelegram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [newAdminPrincipal, setNewAdminPrincipal] = useState('');

  useEffect(() => {
    if (businessEmail) {
      setEmail(businessEmail);
    }
  }, [businessEmail]);

  useEffect(() => {
    setInstagram(links.instagram);
    setTelegram(links.telegram);
    setLinkedin(links.linkedin);
  }, [links]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEmail.mutateAsync(email);
      toast.success('Business email updated successfully');
    } catch (error) {
      console.error('Email update error:', error);
      toast.error('Failed to update email');
    }
  };

  const handleLinksSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateLinks({ instagram, telegram, linkedin });
    toast.success('Social links updated successfully');
  };

  const handleGrantAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPrincipal.trim()) {
      toast.error('Please enter a Principal ID');
      return;
    }

    try {
      await grantAdmin.mutateAsync(newAdminPrincipal.trim());
      toast.success('Admin access granted successfully');
      setNewAdminPrincipal('');
    } catch (error: any) {
      console.error('Grant admin error:', error);
      toast.error(error?.message || 'Failed to grant admin access');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold">Settings</h2>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>
              Grant admin access to additional users by entering their Principal ID
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGrantAdmin} className="space-y-4">
              <div>
                <Label htmlFor="adminPrincipal">Principal ID</Label>
                <Input
                  id="adminPrincipal"
                  type="text"
                  value={newAdminPrincipal}
                  onChange={(e) => setNewAdminPrincipal(e.target.value)}
                  placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxx"
                  className="font-mono text-sm"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  The user must provide you with their Principal ID. They can find it on the Access Denied screen 
                  when they try to access the admin panel.
                </p>
              </div>
              <Button type="submit" disabled={grantAdmin.isPending}>
                <UserPlus className="mr-2 h-4 w-4" />
                {grantAdmin.isPending ? 'Granting Access...' : 'Grant Admin Access'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Business Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  This email will be displayed on the Contact Us page.
                </p>
              </div>
              <Button type="submit" disabled={updateEmail.isPending}>
                {updateEmail.isPending ? 'Saving...' : 'Save Email'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLinksSubmit} className="space-y-4">
              <div>
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              <div>
                <Label htmlFor="telegram">Telegram URL</Label>
                <Input
                  id="telegram"
                  type="url"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="https://t.me/yourchannel"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <Button type="submit">Save Social Links</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
