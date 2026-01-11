import type { Metadata } from "next";
import { Manrope, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/dom/SmoothScroll";
import Scene from "@/components/canvas/Scene";
import Navbar from "@/components/dom/Navbar";
import CustomCursor from "@/components/dom/CustomCursor";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Jatin | Portfolio",
  description: "A showcase of premium digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${playfair.variable} ${jetbrains.variable} antialiased`}
      >
        <CustomCursor />
        <Navbar />
        <Scene />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
