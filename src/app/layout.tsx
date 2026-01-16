import type { Metadata } from "next";
import { Geist_Mono, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { QueryProvider } from "@/lib/providers/query-provider";

/**
 * Geist Mono - Primary body font (terminal aesthetic)
 * Used for body text, labels, and general UI elements
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Space Grotesk - Display font for headings
 * Used for h1-h3, hero text, and prominent UI elements
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * JetBrains Mono - Code and terminal font
 * Used for code blocks, system messages, and technical content
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fiziks",
  description: "Learn physics the fun way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
