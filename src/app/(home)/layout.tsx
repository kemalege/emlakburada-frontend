import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Header from "@/components/Header";
import { UserProvider } from "../context/UserContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "emlakburada.com",
  description: "güvenli emlak burada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Emlakburada.com</title>
      </head>
      <body className={inter.className}>
        <main>
          <UserProvider>
            <Header />
          </UserProvider>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
