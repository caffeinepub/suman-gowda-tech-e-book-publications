import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import SiteHeader from './components/layout/SiteHeader';
import SiteFooter from './components/layout/SiteFooter';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/legal/TermsAndConditionsPage';
import RefundPolicyPage from './pages/legal/RefundPolicyPage';
import PaymentSuccessPage from './pages/payments/PaymentSuccessPage';
import PaymentFailurePage from './pages/payments/PaymentFailurePage';
import DownloadPage from './pages/download/DownloadPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailsPage from './pages/admin/AdminOrderDetailsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminContactMessagesPage from './pages/admin/AdminContactMessagesPage';
import AdminNewsletterPage from './pages/admin/AdminNewsletterPage';
import StripeSetupPage from './pages/admin/StripeSetupPage';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const storeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/store',
  component: StorePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-and-conditions',
  component: TermsAndConditionsPage,
});

const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund-policy',
  component: RefundPolicyPage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccessPage,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailurePage,
});

const downloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/download/$orderId',
  component: DownloadPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/',
  component: AdminDashboardPage,
});

const adminProductsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/products',
  component: AdminProductsPage,
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/orders',
  component: AdminOrdersPage,
});

const adminOrderDetailsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/orders/$orderId',
  component: AdminOrderDetailsPage,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/settings',
  component: AdminSettingsPage,
});

const adminContactRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/contact-messages',
  component: AdminContactMessagesPage,
});

const adminNewsletterRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/newsletter',
  component: AdminNewsletterPage,
});

const adminStripeSetupRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/stripe-setup',
  component: StripeSetupPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  storeRoute,
  aboutRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  refundRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  downloadRoute,
  adminRoute.addChildren([
    adminDashboardRoute,
    adminProductsRoute,
    adminOrdersRoute,
    adminOrderDetailsRoute,
    adminSettingsRoute,
    adminContactRoute,
    adminNewsletterRoute,
    adminStripeSetupRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
