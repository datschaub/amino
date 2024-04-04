import { type AppType } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
