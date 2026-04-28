import "../../styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://canary-box.com"
  ),
  title: "CanaryBox — AI-Powered, No-Code QA Testing | Join the Waitlist",
  description:
    "CanaryBox automatically crawls your live app, simulates real first-time users across devices and browsers, and delivers plain-language bug reports with screenshots. No scripting, no setup, no false-positive fatigue. Join the pilot waitlist.",
  openGraph: {
    title: "CanaryBox — Find bugs before your users do",
    description:
      "AI-powered, no-code testing that crawls your app and delivers plain-language bug reports. Join the early-access waitlist.",
    images: ["/canarybox_dark.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CanaryBox — Find bugs before your users do",
    description:
      "AI-powered, no-code testing that crawls your app and delivers plain-language bug reports. Join the early-access waitlist.",
    images: ["/canarybox_dark.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 dark:bg-[#030712] flex flex-col min-h-screen antialiased`}
      >
        <Navbar />
        <div className="pt-20 flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
