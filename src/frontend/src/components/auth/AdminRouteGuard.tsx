import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { Button } from '../ui/button';
import { ShieldAlert, LogOut, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    try {
      await clear();
      queryClient.clear();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <ShieldAlert className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-2xl font-bold">Authentication Required</h2>
          <p className="mb-6 text-muted-foreground">Please log in to access the admin panel.</p>
          <Button onClick={login} disabled={loginStatus === 'logging-in'}>
            {loginStatus === 'logging-in' ? 'Logging in...' : 'Login with Internet Identity'}
          </Button>
        </div>
      </div>
    );
  }

  if (isCheckingAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    const currentUrl = window.location.origin;
    const setupUrl = `${currentUrl}/?caffeineAdminToken=ADMIN_SECRET_TOKEN`;

    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <ShieldAlert className="mx-auto mb-4 h-16 w-16 text-destructive" />
          <h2 className="mb-3 text-2xl font-bold">Access Denied</h2>
          
          <p className="mb-2 text-muted-foreground">
            You do not have permission to access the admin panel.
          </p>
          <p className="mb-6 text-sm text-muted-foreground">
            Admin access depends on the <strong>Internet Identity</strong> you use to log in. 
            If you believe you should have access, try logging in with a different Internet Identity 
            or contact the existing administrator to grant you access.
          </p>

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={handleLogout}
              size="lg"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Switch Internet Identity
            </Button>
          </div>

          <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4 text-left">
            <p className="text-sm font-semibold text-foreground">Your Principal ID:</p>
            <p className="mt-1 break-all font-mono text-xs text-foreground">
              {identity?.getPrincipal().toString()}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Share this ID with an existing admin to request access.
            </p>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-left dark:border-blue-900 dark:bg-blue-950">
            <p className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100">
              First Time Setup
            </p>
            <p className="mb-3 text-xs text-blue-800 dark:text-blue-200">
              If you are the application owner and no admin has been set up yet, you can initialize 
              admin access by visiting the application with a special setup token in the URL:
            </p>
            <div className="mb-3 rounded bg-white p-2 dark:bg-gray-900">
              <code className="block break-all text-xs text-gray-800 dark:text-gray-200">
                {setupUrl}
              </code>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Replace <code className="rounded bg-blue-100 px-1 dark:bg-blue-900">ADMIN_SECRET_TOKEN</code> with 
              your actual admin token. After visiting this URL while logged in, you will become the first administrator.
            </p>
            <a
              href="https://docs.caffeine.ai/admin-setup"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Learn more about admin setup
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
