import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "MCPFlix",
  description: "Hub dos filmes da Maria Celia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="h-screen w-full">{children}</body>
    </html>
  );
}
