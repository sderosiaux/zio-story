import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZIO Academy - Learn ZIO the Fun Way",
  description: "An interactive, visual guide to understanding ZIO - Scala's powerful library for asynchronous and concurrent programming. Learn through examples, animations, and hands-on exercises.",
  keywords: ["ZIO", "Scala", "Functional Programming", "Asynchronous", "Concurrent", "Effects"],
  authors: [{ name: "ZIO Academy" }],
  openGraph: {
    title: "ZIO Academy - Learn ZIO the Fun Way",
    description: "Master ZIO with interactive examples and visual explanations",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIO Academy - Learn ZIO the Fun Way",
    description: "Master ZIO with interactive examples and visual explanations",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
