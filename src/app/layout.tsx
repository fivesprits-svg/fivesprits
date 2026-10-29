import type { Metadata } from "next";
import { CustomerFlowProvider } from "@/features/customer-flow/state/customer-flow-context";
import { ToastProvider } from "@/features/customer-flow/components/ui/toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Five Spirits | Customer Catalogue",
  description: "Browse The Five Spirits catalogue and send your product requirement.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:block focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <CustomerFlowProvider>
          <ToastProvider>{children}</ToastProvider>
        </CustomerFlowProvider>
      </body>
    </html>
  );
}
