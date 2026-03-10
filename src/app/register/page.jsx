'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import { registerAction } from '@/app/actions/auth';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await registerAction(null, formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result?.success) {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#1a202c] font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-300">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 pt-10 pb-12">
        <div className="w-full max-w-[440px]">
          <div className="bg-white dark:bg-slate-900/50 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 rounded-xl p-8 md:p-10 transition-colors duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Buat Akun Baru</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Mulai kelola keuangan Anda lebih cerdas hari ini</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-4 border border-red-200 dark:border-red-800">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none dark:text-slate-200 dark:placeholder-slate-500"
                    placeholder="Nama Lengkap Anda"
                    type="text"
                    name="name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none dark:text-slate-200 dark:placeholder-slate-500"
                    placeholder="nama@email.com"
                    type="email"
                    name="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Kata Sandi</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                  <input
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none dark:text-slate-200 dark:placeholder-slate-500"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-start mt-4">
                <input
                  className="w-4 h-4 mt-0.5 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary dark:bg-slate-800 dark:border-slate-600 dark:focus:ring-offset-slate-900"
                  id="terms"
                  name="terms"
                  type="checkbox"
                />
                <label className="ml-2 text-sm text-slate-600 dark:text-slate-400 leading-tight" htmlFor="terms">
                  Saya setuju dengan <Link href="/syarat-ketentuan" className="text-primary hover:underline font-medium">Syarat & Ketentuan</Link> dan <Link href="/kebijakan-privasi" className="text-primary hover:underline font-medium">Kebijakan Privasi</Link>
                </label>
              </div>

              <button
                className="group w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 dark:shadow-primary/20 flex justify-center items-center gap-2 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    Daftar Sekarang
                    <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:translate-x-1.5">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800 transition-colors duration-300"></div>
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-white dark:bg-slate-900 px-4 text-slate-500 dark:text-slate-400 transition-colors duration-300">Atau daftar dengan</span>
              </div>
            </div>

            <a
              href="/api/auth/google?from=register"
              className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-500 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
            >
              <img
                alt="Google Logo"
                className="w-5 h-5"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              />
              Daftar dengan Google
            </a>
          </div>

          <p className="mt-8 text-center text-slate-600 dark:text-slate-400 text-sm">
            Sudah punya akun? {" "}
            <Link className="font-bold text-primary hover:text-primary/80 transition-colors" href="/login">Masuk sekarang</Link>
          </p>
        </div>
      </main>

      <footer className="py-8 px-6 text-center text-slate-400 text-xs">
        <p>© 2026 KalaStudio. All rights reserved.</p>
      </footer>
    </div>
  );
}
