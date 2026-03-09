import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function DashboardHeader({ isSidebarOpen, setIsSidebarOpen }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleLogout = () => {
    // Mockup logout: just redirect to home
    sessionStorage.clear();
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors h-20">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        {/* Left: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Toggle Sidebar"
          >
            <span className="material-symbols-outlined text-2xl">
              {isSidebarOpen ? 'menu_open' : 'menu'}
            </span>
          </button>

          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={isDarkMode ? "/img/logo_dark.png" : "/img/logo.png"} alt="KalaStudio Logo" className="h-8 rounded-lg" />
          </Link>
        </div>

        {/* Center: Search (Aesthetic) */}
        <div className="hidden lg:flex flex-grow max-w-md mx-8">
          <div className="relative w-full group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input
              type="text"
              placeholder="Cari transaksi atau laporan..."
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white"
            />
          </div>
        </div>

        {/* Right: Tools & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-2xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button
            className="p-2.5 rounded-2xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors relative"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all ${isProfileOpen ? 'bg-slate-50 dark:bg-slate-800 border-primary/20' : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <div className="w-8 h-8 md:w-9 md:h-9 bg-primary text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg shadow-primary/20 shrink-0">KS</div>
              <div className="hidden md:block text-left ml-1 mr-1">
                <p className="text-xs font-black text-slate-900 dark:text-white leading-none text-nowrap mb-1">Kala Studio</p>
                <p className="text-[9px] font-black bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent uppercase leading-none tracking-[0.2em] drop-shadow-sm">Business Plan</p>
              </div>
              <span className="hidden md:block material-symbols-outlined text-slate-400">expand_more</span>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-20">
                  <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-black text-slate-900 dark:text-white mb-1">Kala Studio</p>
                    <div className="flex items-center">
                      <p className="text-[9px] font-black bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent uppercase leading-none tracking-[0.2em] drop-shadow-sm">Business Plan</p>
                    </div>
                    <p className="text-sm text-slate-500 truncate lowercase mt-2">contact@kalastudio.com</p>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/profil"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold"
                    >
                      <span className="material-symbols-outlined text-xl">person</span>
                      Profil Bisnis
                    </Link>
                    <Link
                      to="/langganan"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold"
                    >
                      <span className="material-symbols-outlined text-xl">payments</span>
                      Langganan
                    </Link>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-bold"
                    >
                      <span className="material-symbols-outlined text-xl">logout</span>
                      Keluar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
