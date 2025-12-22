import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiziks - Projectile Motion Lab",
  description: "Interactive physics simulation for projectile motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/2.0.20/matter.min.js"></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
