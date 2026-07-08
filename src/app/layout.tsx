import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Design-system token authority = MGP DESIGN Batch 1: font is Inter (locked).
// Loaded into the existing --font-geist-sans var so no downstream token changes.
const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "My Gujarat Property",
    template: "%s | My Gujarat Property",
  },
  description:
    "Gujarat's trusted real estate marketplace. Search properties, projects, and connect with verified owners, brokers, and builders across Gujarat.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://mygujaratproperty.com"
  ),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("mgp-theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
