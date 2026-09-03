import type { Metadata } from "next";
import { CustomerFlowProvider } from "@/features/customer-flow/state/customer-flow-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Five Spirits | Customer Catalogue",
  description: "Browse the Five Spirits catalogue and send your product requirement.",
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
        <CustomerFlowProvider>{children}</CustomerFlowProvider>
      </body>
    </html>
  );
}
