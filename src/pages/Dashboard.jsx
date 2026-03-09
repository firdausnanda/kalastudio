import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Select from 'react-select';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardFooter from '../components/DashboardFooter';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Menyesuaikan sidebar untuk mobile secara otomatis
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

  const stats = [
    { label: 'Saldo Saat Ini', value: 'Rp 12.450.000', icon: 'account_balance_wallet', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Pemasukan (Bulan Ini)', value: 'Rp 8.200.000', icon: 'trending_up', color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Pengeluaran (Bulan Ini)', value: 'Rp 3.750.000', icon: 'trending_down', color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Transaksi WA', value: '142 Pesan', icon: 'chat', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  const [timeRange, setTimeRange] = useState({ value: '7', label: '7 Hari Terakhir' });

  const timeOptions = [
    { value: '7', label: '7 Hari Terakhir' },
    { value: '30', label: '30 Hari Terakhir' },
    { value: 'all', label: 'Semua Waktu' },
  ];

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      cursor: 'pointer',
      minHeight: 'auto',
    }),
    container: (base) => ({
      ...base,
      backgroundColor: localStorage.getItem('theme') === 'dark' ? '#1e293b' : '#f8fafc',
      borderRadius: '0.75rem',
      padding: '2px 8px',
      transition: 'all 0.3s ease',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 4px',
    }),
    singleValue: (base) => ({
      ...base,
      color: localStorage.getItem('theme') === 'dark' ? '#e2e8f0' : '#475569',
      fontSize: '0.875rem',
      fontWeight: '700',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#94a3b8',
      '&:hover': { color: '#9C413D' },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: localStorage.getItem('theme') === 'dark' ? '#0f172a' : '#fff',
      borderRadius: '1rem',
      border: localStorage.getItem('theme') === 'dark' ? '1px solid #1e293b' : '1px solid #f1f5f9',
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      overflow: 'hidden',
      zIndex: 50,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? '#9C413D'
        : isFocused
          ? (localStorage.getItem('theme') === 'dark' ? '#1e293b' : '#f8fafc')
          : 'transparent',
      color: isSelected ? '#fff' : (localStorage.getItem('theme') === 'dark' ? '#94a3b8' : '#475569'),
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      '&:active': { backgroundColor: '#9C413D' },
    }),
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const chartData = [
    { name: 'Sen', value: 7000000 },
    { name: 'Sel', value: 7500000 },
    { name: 'Rab', value: 6000000 },
    { name: 'Kam', value: 2300000 },
    { name: 'Jum', value: 500000 },
    { name: 'Sab', value: 1000000 },
    { name: 'Min', value: 1500000 },
  ];

  const recentTransactions = [
    { id: 1, type: 'in', category: 'Penjualan Produk', amount: 'Rp 450.000', date: 'Hari ini, 14:20', via: 'WhatsApp AI' },
    { id: 2, type: 'out', category: 'Pembayaran Supplier', amount: 'Rp 1.200.000', date: 'Kemarin, 09:15', via: 'Manual' },
    { id: 3, type: 'in', category: 'Jasa Konsultasi', amount: 'Rp 300.000', date: '8 Mar, 16:40', via: 'WhatsApp AI' },
    { id: 4, type: 'out', category: 'Listrik & Air', amount: 'Rp 550.000', date: '7 Mar, 11:10', via: 'WhatsApp AI' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col font-display transition-colors duration-300">
      <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex flex-grow relative overflow-hidden">
        <DashboardSidebar isSidebarOpen={isSidebarOpen} />

        {/* Overlay for mobile sidebar */}
        <div
          className={`
            fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300
            ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        {/* Konten Utama Dashboard */}
        <main className="flex-grow p-4 md:p-8 lg:p-10 transition-all duration-300 ease-in-out">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Greeting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Halo, Pengusaha Sukses! 👋</h2>
                <p className="text-slate-500 dark:text-slate-400">Berikut adalah update keuangan bisnis Anda hari ini.</p>
              </div>
            </div>

            {/* Statistik Ringkas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-all group">
                  <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Area Grafik & Aktivitas */}
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Grafik Tren (Mockup) */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold dark:text-white">Tren Keuangan</h3>
                  <div className="w-48">
                    <Select
                      defaultValue={timeRange}
                      onChange={setTimeRange}
                      options={timeOptions}
                      styles={customSelectStyles}
                      isSearchable={false}
                    />
                  </div>
                </div>

                {/* Visual Chart with Recharts */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9C413D" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#9C413D" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                        dy={10}
                      />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Tooltip
                        formatter={(value) => [formatCurrency(value), 'Nilai']}
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: 'none',
                          borderRadius: '12px',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{ stroke: '#9C413D', strokeWidth: 2 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#9C413D"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Aktivitas Terbaru */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold dark:text-white mb-8">Aktivitas Baru</h3>
                <div className="space-y-6">
                  {recentTransactions.map((trx) => (
                    <div key={trx.id} className="flex items-center gap-4 group">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${trx.type === 'in' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        <span className="material-symbols-outlined">{trx.type === 'in' ? 'add_circle' : 'remove_circle'}</span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{trx.category}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{trx.date} • {trx.via}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-black ${trx.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                          {trx.type === 'in' ? '+' : '-'}{trx.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-10 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm font-bold text-primary hover:bg-primary/5 transition-colors">
                  Lihat Semua Transaksi
                </button>
              </div>
            </div>

            {/* Banner Promo / Tips */}
            <div className="bg-primary rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10 grid md:grid-cols-2 items-center gap-8">
                <div>
                  <h4 className="text-2xl font-black mb-4">Gunakan Voice Note WhatsApp</h4>
                  <p className="text-white/80 leading-relaxed mb-6">Malas mengetik? Cukup kirim pesan suara ke nomor WhatsApp KalaStudio. AI kami akan otomatis mencatat kategori dan nominalnya.</p>
                  <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all">Pelajari Caranya</button>
                </div>
                <div className="flex justify-center md:justify-end">
                  <div className="w-40 h-40 bg-white/20 backdrop-blur-md rounded-[32px] flex items-center justify-center">
                    <span className="material-symbols-outlined text-7xl">mic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <DashboardFooter />
    </div>
  );
}
