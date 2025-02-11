import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProps } from "next/app";
import { Navbar } from "@/components/navbar";
import { RustModule } from "@/lib/wasm";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { GeistSans } from "geist/font/sans";
import { NETWORK } from "@/lib/network";

export default function App({ Component, pageProps }: AppProps) {
  const [isRustModuleLoaded, setIsRustModuleLoaded] = useState(false);
  useEffect(() => {
    const httpsTokens = /^https:\/\/(.*)$/.exec(window.location.href);
    if (httpsTokens) {
      const newURL = "http://" + httpsTokens[1];
      console.log(newURL);
      window.location.href = newURL;
    }
    RustModule.load().then(() => setIsRustModuleLoaded(true));
    NETWORK.init(localStorage);
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
      <main className={GeistSans.className}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
