import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@dfinity/principal';
import type { eBook, Order, ContactFormSubmission, StripeConfiguration } from '../backend';
import { ExternalBlob } from '../backend';

export function useGetAllEBooks() {
  const { actor, isFetching } = useActor();

  return useQuery<eBook[]>({
    queryKey: ['ebooks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAlleBooks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetEBook(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<eBook | null>({
    queryKey: ['ebook', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.geteBook(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAddOrUpdateEBook() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; title: string; description: string; price: number }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.addOrUpdateeBook(params.id, params.title, params.description, BigInt(params.price));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ebooks'] });
    },
  });
}

export function useUpdateEBookAsset() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; assetType: 'cover' | 'pdf'; blob: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateseBookAsset(params.id, params.assetType, params.blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ebooks'] });
    },
  });
}

export function useGetBusinessEmail() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['businessEmail'],
    queryFn: async () => {
      if (!actor) return 'sumangowdatechpublications@gmail.com';
      return actor.getBusinessEmail();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateBusinessEmail() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateBusinessEmail(email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessEmail'] });
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitContactForm(params.name, params.email, params.message);
    },
  });
}

export function useGetAllContactSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactFormSubmission[]>({
    queryKey: ['contactSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteContactSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteContactSubmission(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}

export function useSubmitNewsletter() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitNewsletter(email);
    },
  });
}

export function useGetAllNewsletterEmails() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['newsletterEmails'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNewsletterEmails();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();

  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetOrder(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Order | null>({
    queryKey: ['order', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOrder(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; userId: string; eBookId: string; amount: number }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createOrder(params.id, params.userId, params.eBookId, BigInt(params.amount));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; status: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateOrderStatus(params.id, params.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useIncrementDownloadCount() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.incrementDownloadCount(orderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['stripeConfigured'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error('Actor not available');
      await actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stripeConfigured'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useGrantAdminRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (principalText: string) => {
      if (!actor) throw new Error('Actor not available');
      const principal = Principal.fromText(principalText);
      await actor.grantAdminRole(principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isAdmin'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || String(error);
      if (errorMessage.includes('Unauthorized') || errorMessage.includes('Only admins')) {
        throw new Error('You do not have permission to grant admin access.');
      }
      if (errorMessage.includes('anonymous')) {
        throw new Error('Cannot grant admin access to anonymous principals.');
      }
      throw error;
    },
  });
}
