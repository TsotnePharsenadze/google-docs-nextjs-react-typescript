import type { Metadata } from "next";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { KeySheet } from "@/components/keySheet/KeySheet";
import { ConvexClientProvider } from "@/context-providers/ConvexClientProvider";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


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
          </ConvexClientProvider>
          </ClerkProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
