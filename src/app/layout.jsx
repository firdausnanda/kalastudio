import './globals.css';
import NProgressLoader from '@/components/NProgressLoader';

export const metadata = {
  title: 'KalaStudio - Aplikasi Keuangan Bisnis',
  description: 'Kelola keuangan bisnis kamu dengan mudah dan cerdas bersama KalaStudio.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NProgressLoader />
        {children}
      </body>
    </html>
  );
}
