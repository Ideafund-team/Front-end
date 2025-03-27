import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import 'react-photo-view/dist/react-photo-view.css';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ideafund',
  description: 'platform yang menghubungkan pemilik ide usaha UMKM dengan investor. Temukan dukungan finansial dan strategis untuk mewujudkan usaha impian Anda!',
};

// export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased `}>
        <Toaster richColors position="top-center" />
        <NextTopLoader color="#145DFD" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
