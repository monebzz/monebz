import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Muneeb Azhar — Webflow & Django Developer",
  description: "I design and build interactive, full-stack web experiences using Webflow, Next.js, and Django. Freelance developer from Okara, Pakistan.",
  keywords: ["Muneeb Azhar", "Webflow Developer", "Django Developer", "Next.js", "Full Stack Developer", "Freelance Developer", "Pakistan"],
  authors: [{ name: "Muneeb Azhar" }],
  creator: "Muneeb Azhar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muneebazhar.com",
    title: "Muneeb Azhar — Webflow & Django Developer",
    description: "I design and build interactive, full-stack web experiences using Webflow, Next.js, and Django.",
    siteName: "Muneeb Azhar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muneeb Azhar — Webflow & Django Developer",
    description: "I design and build interactive, full-stack web experiences using Webflow, Next.js, and Django.",
    creator: "@muneebazhar",
  },
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
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased font-poppins bg-[var(--bg-primary)] transition-colors duration-300 ease-in-out`}
      >
        <ThemeProvider>
          <CustomCursor />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
