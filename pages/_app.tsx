import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProps } from "next/app";

export const metadata: Metadata = {
    title: "ergoplatform.space",
    description: "Ergo blockchain explorer",
};

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Component {...pageProps} />
        </ThemeProvider>
  );
}
