'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar({ isSidebarOpen }) {
  const pathname = usePathname();
  return (
    <aside
      className={`
        fixed lg:sticky top-20 bottom-0 left-0 z-40 
        bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 
        transition-all duration-300 ease-in-out overflow-hidden
        ${isSidebarOpen
          ? 'w-64 translate-x-0 opacity-100'
          : 'w-0 lg:w-0 -translate-x-full lg:translate-x-0 lg:opacity-0 opacity-0'}
      `}
    >
      <div className="w-64">
        <div className="p-6 space-y-2">
          {[
            { name: 'Ringkasan', icon: 'grid_view', to: '/dashboard' },
            { name: 'Transaksi', icon: 'receipt_long', to: '/transaksi' },
            { name: 'Laporan AI', icon: 'auto_awesome', to: '/laporan' },
            { name: 'Integrasi', icon: 'hub', to: '/integrasi' },
          ].map((item, i) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={i}
                href={item.to}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-8 left-6 right-6 w-52">
          <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">WhatsApp AI Ready</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">Siap mencatat setiap pesan suara Anda menjadi laporan.</p>
            <button className="w-full py-2 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold shadow-sm">Cek Integrasi</button>
          </div>
        </div>
      </div>
    </aside>
  );
}
