import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'kandb',
  description: 'kandb',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
