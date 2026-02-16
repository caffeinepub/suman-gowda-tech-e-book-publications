import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import AdminRouteGuard from '../../components/auth/AdminRouteGuard';
import { Button } from '../../components/ui/button';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  MessageSquare,
  Mail,
  CreditCard,
  Home,
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { to: '/admin/contact-messages', label: 'Messages', icon: MessageSquare },
    { to: '/admin/newsletter', label: 'Newsletter', icon: Mail },
    { to: '/admin/stripe-setup', label: 'Stripe Setup', icon: CreditCard },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <AdminRouteGuard>
      <div className="flex min-h-screen flex-col">
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <Button variant="outline" size="sm" onClick={() => navigate({ to: '/' })}>
              <Home className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
          </div>
        </div>

        <div className="container mx-auto flex flex-1 px-4 py-8">
          <aside className="w-64 pr-8">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  activeProps={{ className: 'bg-accent text-accent-foreground' }}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
