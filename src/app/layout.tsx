import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // ✅ import Navbar here

// === Fonts ===
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// === Metadata ===
export const metadata: Metadata = {
  title: "Soumya Tiwari | Research Scholar & Political Risk Expert",
  description:
    "Official portfolio of Soumya Tiwari — Research Scholar at FORE School of Management, focusing on international business, risk management, and geopolitical studies.",
};

// === Root Layout ===
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1f1f1f] text-white`}
      >
        {/* ✅ Sticky Navbar visible on all pages */}
        <Navbar />

        {/* ✅ Add top padding so content doesn't hide under navbar */}
        <main className="pt-[80px]">{children}</main>
      </body>
    </html>
  );
}
