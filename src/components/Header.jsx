import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Default sekarang selalu Light Mode kecuali user secara spesifik memilih Dark Mode
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 dark:bg-slate-900/95 dark:border-slate-800 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={isDarkMode ? "/img/logo_dark.png" : "/img/logo.png"} alt="ChatKas Logo" className="h-10 rounded-xl" />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-sm font-semibold text-secondary hover:text-primary transition-colors dark:text-slate-200 dark:hover:text-primary" to="/fitur">Fitur</Link>
          <Link className="text-sm font-semibold text-secondary hover:text-primary transition-colors dark:text-slate-200 dark:hover:text-primary" to="/partnership">Partnership</Link>
          <Link className="text-sm font-semibold text-secondary hover:text-primary transition-colors dark:text-slate-200 dark:hover:text-primary" to="/harga">Harga</Link>
          <Link className="text-sm font-semibold text-secondary hover:text-primary transition-colors dark:text-slate-200 dark:hover:text-primary" to="/blog">Blog</Link>
          <Link className="text-sm font-semibold text-secondary hover:text-primary transition-colors dark:text-slate-200 dark:hover:text-primary" to="/panduan">Panduan</Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors flex items-center justify-center focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <Link className="text-sm font-bold text-secondary px-4 py-2 hover:bg-slate-50 rounded-lg transition-all dark:text-slate-200 dark:hover:bg-slate-800 hidden sm:block" to="/login">Masuk</Link>
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]">
            Coba Gratis
          </button>
        </div>
      </nav>
    </header>
  );
}
