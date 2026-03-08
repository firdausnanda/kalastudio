import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// Konfigurasi NProgress
nprogress.configure({
  showSpinner: false,
  easing: 'ease',
  speed: 500,
  minimum: 0.3
});

export default function NProgressLoader() {
  const location = useLocation();

  useEffect(() => {
    // Jalankan progress bar setiap kali lokasi (url) berubah
    nprogress.start();

    // Timer kecil untuk memastikan progress bar terlihat sebentar sebelum selesai
    const timer = setTimeout(() => {
      nprogress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
      nprogress.done();
    };
  }, [location]);

  return null;
}
