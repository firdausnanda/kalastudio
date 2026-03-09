import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const menuLinks = [
    { name: 'Fitur', to: '/fitur' },
    { name: 'Partnership', to: '/partnership' },
    { name: 'Harga', to: '/harga' },
    { name: 'Blog', to: '/blog' },
    { name: 'Panduan', to: '/panduan' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 dark:bg-slate-900/95 dark:border-slate-800 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={isDarkMode ? "/img/logo_dark.png" : "/img/logo.png"} alt="ChatKas Logo" className="h-10 rounded-xl" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuLinks.map((link) => (
            <Link
              key={link.to}
              className="text-sm font-semibold text-secondary hover:text-primary transition-colors dark:text-slate-200 dark:hover:text-primary"
              to={link.to}
            >
              {link.name}
            </Link>
          ))}
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

          <Link className="text-sm font-bold text-secondary px-4 py-2 hover:bg-slate-50 rounded-lg transition-all dark:text-slate-200 dark:hover:bg-slate-800 hidden sm:block" to="/login">
            Masuk
          </Link>

          <Link className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] hidden sm:block" to="/register">
            Coba Gratis
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-secondary dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none z-[60]"
            aria-label="Toggle Mobile Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-x-0 top-20 bottom-0 bg-black/20 backdrop-blur-sm z-[55] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-6 gap-2">
            {menuLinks.map((link) => (
              <Link
                key={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-bold text-secondary dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between group"
                to={link.to}
              >
                {link.name}
                <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
              </Link>
            ))}
            <div className="h-px bg-slate-100 dark:border-slate-800 my-4 mx-4"></div>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-bold text-secondary dark:text-slate-200 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between group"
              to="/login"
            >
              Masuk
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">login</span>
            </Link>
            <div className="px-4 pb-4">
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full bg-primary text-white py-5 rounded-[20px] font-black text-lg shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] mt-4 flex items-center justify-center">
                Coba Gratis Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
