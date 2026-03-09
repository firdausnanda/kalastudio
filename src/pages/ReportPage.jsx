import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import Select from 'react-select';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardFooter from '../components/DashboardFooter';

export default function ReportPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reportPeriod, setReportPeriod] = useState({ value: 'maret', label: 'Maret 2026' });

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

  const periodOptions = [
    { value: 'maret', label: 'Maret 2026' },
    { value: 'februari', label: 'Februari 2026' },
    { value: 'januari', label: 'Januari 2026' },
  ];

  const reportData = [
    { name: 'Minggu 1', masuk: 4500000, keluar: 2100000 },
    { name: 'Minggu 2', masuk: 5200000, keluar: 3800000 },
    { name: 'Minggu 3', masuk: 3900000, keluar: 1500000 },
    { name: 'Minggu 4', masuk: 6100000, keluar: 4200000 },
  ];

  const summaryStats = [
    { label: 'Total Pemasukan', value: 19700000, icon: 'trending_up', color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Total Pengeluaran', value: 11600000, icon: 'trending_down', color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Laba Bersih', value: 8100000, icon: 'account_balance', color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const aiInsights = [
    { title: 'Efisiensi Operasional', text: 'Pengeluaran Anda turun 15% dibandingkan minggu lalu. Pertahankan efisiensi ini.', type: 'positive' },
    { title: 'Peluang Ekspansi', text: 'Tren pemasukan di akhir pekan sangat kuat. Pertimbangkan promo khusus Sabtu-Minggu.', type: 'neutral' },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: localStorage.getItem('theme') === 'dark' ? '#1e293b' : '#f8fafc',
      border: 'none',
      borderRadius: '0.75rem',
      padding: '2px 8px',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: localStorage.getItem('theme') === 'dark' ? '#e2e8f0' : '#475569',
      fontSize: '0.875rem',
      fontWeight: '700',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: localStorage.getItem('theme') === 'dark' ? '#0f172a' : '#fff',
      borderRadius: '1.25rem',
      zIndex: 50,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#9C413D' : isFocused ? (localStorage.getItem('theme') === 'dark' ? '#1e293b' : '#f8fafc') : 'transparent',
      color: isSelected ? '#fff' : (localStorage.getItem('theme') === 'dark' ? '#94a3b8' : '#475569'),
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
    }),
  };

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
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Laporan Keuangan</h2>
                <p className="text-slate-500 dark:text-slate-400">Analisis mendalam performa bisnis Anda secara otomatis.</p>
              </div>
              <div className="w-56">
                <Select
                  defaultValue={reportPeriod}
                  onChange={setReportPeriod}
                  options={periodOptions}
                  styles={customSelectStyles}
                  isSearchable={false}
                />
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {summaryStats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all group">
                  <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                  </div>
                  <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.label === 'Laba Bersih' ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{formatCurrency(stat.value)}</p>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Chart Visual Section */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold dark:text-white">Tren Arus Kas Bulanan</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Masuk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Keluar</span>
                    </div>
                  </div>
                </div>

                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                        dy={15}
                      />
                      <YAxis hide domain={[0, 'dataMax + 1000000']} />
                      <Tooltip
                        cursor={{ fill: localStorage.getItem('theme') === 'dark' ? '#1e293b' : '#f8fafc' }}
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: 'none',
                          borderRadius: '16px',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: '800',
                          padding: '12px 16px',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ color: '#fff', padding: '2px 0' }}
                        formatter={(value) => formatCurrency(value)}
                      />
                      <Bar
                        dataKey="masuk"
                        fill="#22c55e"
                        radius={[6, 6, 0, 0]}
                        barSize={32}
                      />
                      <Bar
                        dataKey="keluar"
                        fill="#ef4444"
                        radius={[6, 6, 0, 0]}
                        barSize={32}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Insights Section */}
              <div className="space-y-6">
                <div className="bg-primary rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="material-symbols-outlined">auto_awesome</span>
                      <h4 className="text-lg font-black uppercase tracking-wider text-sm">AI Business Insights</h4>
                    </div>

                    <div className="space-y-6">
                      {aiInsights.map((insight, i) => (
                        <div key={i} className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-white/60">{insight.title}</p>
                          <p className="text-sm font-bold leading-relaxed">{insight.text}</p>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-8 py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] transition-all active:scale-95">
                      Generate Laporan Full
                    </button>
                  </div>
                </div>

                {/* Growth Mockup */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Pertumbuhan Aset</h4>
                  <div className="flex items-end gap-3 mb-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">+24.5%</span>
                    <span className="text-green-500 font-bold mb-1 flex items-center">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                      Bulan lalu
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed uppercase font-bold text-[10px] tracking-wider">Performa finansial Anda berada di atas rata-rata industri bulan ini.</p>
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
