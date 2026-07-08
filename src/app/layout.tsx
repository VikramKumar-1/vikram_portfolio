import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Vikram Kumar | Full Stack Developer",
  description:
    "Full Stack Developer with hands-on experience building and deploying production-ready web applications using Next.js, React, TypeScript, and Laravel.",
  keywords: [
    "developer",
    "portfolio",
    "full stack",
    "react",
    "next.js",
    "laravel",
  ],
  authors: [{ name: "Vikram Kumar" }],
  openGraph: {
    title: "Vikram Kumar | Full Stack Developer",
    description:
      "Full Stack Developer with hands-on experience building and deploying production-ready web applications using Next.js, React, TypeScript, and Laravel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
