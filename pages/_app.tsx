import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProps } from "next/app";
import { Navbar } from "@/components/navbar";
import { RustModule } from "@/lib/wasm";
import { useEffect } from "react";
import { Footer } from "@/components/footer";
import { GeistSans } from "geist/font/sans";
import { NETWORK } from "@/lib/network";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    RustModule.load();
    NETWORK.init(localStorage);
  }, []);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className={GeistSans.className}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
