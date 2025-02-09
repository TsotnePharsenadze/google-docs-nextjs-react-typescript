import type { Metadata } from "next";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { KeySheet } from "@/components/keySheet/KeySheet";
import { ConvexClientProvider } from "@/context-providers/ConvexClientProvider";

export const metadata: Metadata = {
  title: "GoogleDOCS Clone",
  description: "Wannabe clone of GoogleDOCS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NuqsAdapter>
          <ConvexClientProvider>
            <KeySheet />
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
