import type { Metadata } from "next";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { KeySheet } from "@/components/keySheet/KeySheet";
import { ConvexClientProvider } from "@/context-providers/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

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
          <ClerkProvider>
            <ConvexClientProvider>
              <KeySheet />
              {children}
              <Toaster />
            </ConvexClientProvider>
          </ClerkProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
