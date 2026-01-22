import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InfraGuard AI",
  description: "Designed to assist with road damage detection.",
  icons: {
    icon: [
      { url: "/infraguard_AI.png", sizes: "32x32", type: "image/png" },
      { url: "/infraguard_AI.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/infraguard_AI.png",
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-neutral-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-200`}
      >
        
        {children}
      </body>
    </html>
  );
}