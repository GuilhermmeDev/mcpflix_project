import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import 'remixicon/fonts/remixicon.css';
import Footer from '@/components/footer';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'MCPFlix',
  description: 'Hub dos filmes da Maria Celia',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.className} dark`} lang="pt-BR">
      <head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </head>
      <body className="relative flex min-h-screen w-full flex-grow flex-col bg-background">
        <main className="flex flex-grow flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
