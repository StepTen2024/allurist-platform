import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ALLURIST - Fantasy Fashion No Limits",
  description: "Discover exclusive AI fantasy art and transform inspiration into reality with our curated fashion marketplace.",
  keywords: "AI art, fantasy fashion, digital art, premium content, VIP access",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
