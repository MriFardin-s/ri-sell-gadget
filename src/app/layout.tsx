import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ri-Sell Gadget | Buy, Sell & Exchange Devices",
  description: "The ultimate marketplace to explore, buy, sell, or exchange gadgets seamlessly. Discover top-quality new, used, and refurbished tech with real-time analytics and safe verification.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="light">
          <Navbar />

          {children}
          <Footer />
        </ThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}