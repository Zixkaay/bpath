import { Metadata } from 'next';
import './globals.css';
import { NotificationToast } from '@/components/NotificationToast';

export const metadata: Metadata = {
  title: 'Next Billionaire Path',
  description: 'Making the Root Money Deep Man',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-bg relative">
        {children}
        <NotificationToast />
      </body>
    </html>
  );
}
