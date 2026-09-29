import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhysicsMentor-NG | CRAL Lesson Note Generator",
  description: "AI-powered CRAL lesson note generator for Nigerian Senior Secondary School physics teachers. Community-specific. Inquiry-based. Developed by T_CEIPEC, FUE Pankshin.",
  authors: [{ name: "Emmanuel C. Hemba" }, { name: "Gangtak Nanpon" }, { name: "Lapnen Y. Gyitbe" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
