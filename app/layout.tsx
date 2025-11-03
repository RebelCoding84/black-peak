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

// Päivitetty metatieto sivun otsikkoon ja kuvaukseen
export const metadata: Metadata = {
  title: "Black Peak – Handcrafted Silver Chains",
  description: "Käsintehdyt hopeiset kaula- ja rannekorut – Black Peak Outlaws™",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ✅ Lisätty scroll-smooth pehmeää rullausta varten
    // ✅ Päivitetty kieli suomeksi
    <html lang="fi" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
