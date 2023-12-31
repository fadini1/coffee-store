import './globals.css';

import type { Metadata } from 'next';

import { Urbanist } from 'next/font/google';

import { ThemeProvider } from '@/providers/theme-provider';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import { Providers } from '@/providers/chakra-provider';

const font = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sunset',
  description: 'Best Coffee in Town!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          attribute='class'
          defaultTheme='system'
        >
          <ToastProvider />
          <ModalProvider />
          <Navbar />
          <Providers>
            {children}
          </Providers>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}