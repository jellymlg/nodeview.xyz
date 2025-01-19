import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProps } from "next/app";
import { Navbar } from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "ergoplatform.space",
  description: "Ergo blockchain explorer",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
