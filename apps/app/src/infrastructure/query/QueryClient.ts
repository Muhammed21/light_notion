import { QueryClient } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      networkMode: 'online'
    },
    mutations: {
      retry: 1,
      networkMode: 'online'
    }
  },
});

// Gérer la reconnexion réseau
NetInfo.addEventListener((state) => {
  if (state.isConnected) {
      queryClient.refetchQueries({ type: 'active' });
  }
})