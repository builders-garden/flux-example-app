import type { Metadata } from "next";
import { Overpass_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const overpassMono = Overpass_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Example Flux App",
  description: "Example app to demonstrate Flux payment infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${overpassMono.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
