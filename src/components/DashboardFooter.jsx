'use client';
import Link from 'next/link';

export default function DashboardFooter() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-6 transition-colors duration-300 mt-auto">
      <div className="mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            © 2026 KalaStudio. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400 dark:text-slate-500 font-bold">
            <Link target='_blank' className="hover:text-primary transition-colors" href="/syarat-ketentuan">Syarat & Ketentuan</Link>
            <Link target='_blank' className="hover:text-primary transition-colors" href="/kebijakan-privasi">Kebijakan Privasi</Link>
            <Link target='_blank' className="hover:text-primary transition-colors" href="/kontak">Bantuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
