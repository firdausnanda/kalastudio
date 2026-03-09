import { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardFooter from '../components/DashboardFooter';

export default function SubscriptionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const plans = [
    {
      name: 'Free Plan',
      price: 'Rp 0',
      period: '/selamanya',
      features: ['50 Transaksi/bulan', 'Laporan Dasar', '1 Integrasi WhatsApp', 'Support Email'],
      buttonText: 'Paket Saat Ini',
      isCurrent: false,
      color: 'bg-slate-500',
    },
    {
      name: 'Starter',
      price: 'Rp 49rb',
      period: '/bulan',
      features: ['500 Transaksi/bulan', 'Laporan AI Mingguan', '3 Integrasi WhatsApp', 'Prioritas Support'],
      buttonText: 'Pilih Starter',
      isCurrent: false,
      color: 'bg-blue-500',
    },
    {
      name: 'Business',
      price: 'Rp 149rb',
      period: '/bulan',
      features: ['Transaksi Unlimited', 'Laporan AI Real-time', 'Integrasi Unlimited', 'Account Manager'],
      buttonText: 'Paket Aktif',
      isCurrent: true,
      popular: true,
      color: 'bg-primary',
    },
    {
      name: 'Professional',
      price: 'Rp 299rb',
      period: '/bulan',
      features: ['Fitur Custom', 'Multi User Access', 'API Access', '24/7 VIP Support'],
      buttonText: 'Pilih Pro',
      isCurrent: false,
      color: 'bg-amber-500',
    },
  ];

  const billingHistory = [
    { id: 'INV-001', date: '01 Maret 2026', amount: 'Rp 149.000', method: 'BCA Virtual Account', status: 'Berhasil' },
    { id: 'INV-002', date: '01 Februari 2026', amount: 'Rp 149.000', method: 'BCA Virtual Account', status: 'Berhasil' },
    { id: 'INV-003', date: '01 Januari 2026', amount: 'Rp 149.000', method: 'BCA Virtual Account', status: 'Berhasil' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col font-display transition-colors duration-300">
      <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex flex-grow relative overflow-hidden">
        <DashboardSidebar isSidebarOpen={isSidebarOpen} />

        <div
          className={`
            fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300
            ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        <main className="flex-grow p-4 md:p-8 lg:p-10 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Header Section */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Kelola Langganan</h2>
              <p className="text-slate-500 dark:text-slate-400">Pilih paket terbaik untuk pertumbuhan bisnis Anda.</p>
            </div>

            {/* Current Plan Status Card */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-[24px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl">verified</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Paket Aktif Saat Ini</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Business Plan</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black rounded-full border border-green-500/20">AKTIF</span>
                    <span className="text-xs font-bold text-slate-400">Hingga 01 April 2026</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto relative z-10">
                <button className="w-full sm:w-auto px-8 py-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                  Batalkan Paket
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                  Tingkatkan Paket
                </button>
              </div>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`bg-white dark:bg-slate-900 p-8 rounded-[40px] border transition-all flex flex-col hover:scale-[1.02] ${plan.isCurrent ? 'border-primary ring-4 ring-primary/5 shadow-2xl shadow-primary/10' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
                >
                  {plan.popular && (
                    <div className="self-start mb-6 px-4 py-1.5 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">Paling Populer</div>
                  )}
                  <h4 className={`text-sm font-black uppercase tracking-[0.2em] mb-4 ${plan.isCurrent ? 'text-primary' : 'text-slate-400'}`}>{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                    <span className="text-sm font-bold text-slate-400">{plan.period}</span>
                  </div>

                  <div className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${plan.isCurrent ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>

            {/* Billing History Section */}
            <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
              <div className="p-8 md:p-10 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">Riwayat Pembayaran</h3>
                <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Download Semua PDF</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No. Invois</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tanggal</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nominal</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Metode</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {billingHistory.map((bill, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-8 py-5 font-black text-xs text-slate-900 dark:text-white">{bill.id}</td>
                        <td className="px-8 py-5 font-bold text-xs text-slate-600 dark:text-slate-400">{bill.date}</td>
                        <td className="px-8 py-5 font-black text-xs text-slate-900 dark:text-white">{bill.amount}</td>
                        <td className="px-8 py-5 font-bold text-[10px] text-slate-500 uppercase tracking-wider">{bill.method}</td>
                        <td className="px-8 py-5">
                          <span className="px-3 py-1 bg-green-500/10 text-green-600 text-[10px] font-black rounded-full border border-green-500/10">
                            {bill.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">download</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <DashboardFooter />
    </div>
  );
}
