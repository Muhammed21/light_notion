import { Stack } from "expo-router";
import { queryClient } from "@/src/infrastructure/query/QueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#191919" }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
