import '@/styles/globals.css';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'susgee-paste',
    template: '%s | susgee-paste'
  },
  icons: {
    icon: '/favicon.ico'
  },
  robots: {
    index: false,
    follow: false
  },
  authors: [
    {
      name: 'maersux',
      url: 'https://github.com/maersux'
    },
    {
      name: 'blxryer',
      url: 'https://github.com/blxryer'
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
