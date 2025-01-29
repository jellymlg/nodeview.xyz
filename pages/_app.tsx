import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProps } from "next/app";
import { Navbar } from "@/components/ui/navbar";
import { RustModule } from "@/lib/wasm";
import { useEffect, useState } from "react";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "ergoplatform.space",
  description: "Ergo blockchain explorer",
};

export default function App({ Component, pageProps }: AppProps) {
  const [isRustModuleLoaded, setIsRustModuleLoaded] = useState(false);
  useEffect(() => {
    RustModule.load().then(() => setIsRustModuleLoaded(true));
  }, []);
  if (!isRustModuleLoaded) {
    return null;
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
