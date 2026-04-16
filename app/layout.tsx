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
  metadataBase: new URL("https://cej-payments.vercel.app"),

  title: {
    default: "EPD2026 Registration",
    template: "%s | EPD2026",
  },

  description:
    "Register for the 6th Environmental Protection Dialogue (EPD2026) in Lusaka, Zambia. Join leaders, stakeholders, and experts from 14–16 October 2026 at Mulungushi International Conference Centre.",

  keywords: [
    "EPD2026",
    "Environmental Conference Zambia",
    "CEJ Zambia",
    "Environmental Protection Dialogue",
    "Lusaka Conference 2026",
    "Sustainability Zambia",
  ],

  authors: [{ name: "Centre for Environment Justice (CEJ)" }],

  icons: {
    icon: "./cej-logo.png",
    shortcut: "./cej-logo.png",
    apple: "./cej-logo.png", 
  },

  openGraph: {
    title:
      "EPD2026 – Environmental Protection Dialogue Zambia",
    description:
      "Join EPD2026 from 14–16 October 2026 in Lusaka. Explore solutions to environmental degradation and sustainability in Zambia.",
    url: "https://cej-payments.vercel.app",
    siteName: "EPD2026",
    images: [
      {
        url: "./epd (5).jpeg", // 🔥 your banner image
        width: 1200,
        height: 630,
        alt: "EPD2026 Conference Banner",
      },
    ],
    locale: "en_ZM",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EPD2026 – Register Now",
    description:
      "Be part of Zambia’s leading environmental dialogue. Register for EPD2026 today.",
    images: ["./epd (5).jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
        
        {/* 🔥 Global Header with Logo */}
        {/* <header className="w-full flex items-center justify-center py-4 bg-white shadow-sm">
          <img
            src="/logo.png" // place your logo in /public/logo.png
            alt="EPD2026 Logo"
            className="h-14 object-contain"
          />
        </header> */}

        {children}
      </body>
    </html>
  );
}