'use client';
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
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardFooter from '@/components/DashboardFooter';

export default function ReportPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reportPeriod, setReportPeriod] = useState({ value: '2026-03', label: 'Maret 2026' });
  const [summaryData, setSummaryData] = useState(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [reportData, setReportData] = useState([]);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const [aiInsights, setAiInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    { value: '2026-03', label: 'Maret 2026' },
    { value: '2026-02', label: 'Februari 2026' },
    { value: '2026-01', label: 'Januari 2026' },
  ];


  const summaryStats = [
    { label: 'Total Pemasukan', value: summaryData?.total_pemasukan || 0, icon: 'trending_up', color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Total Pengeluaran', value: summaryData?.total_pengeluaran || 0, icon: 'trending_down', color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Laba Bersih', value: summaryData?.laba_bersih || 0, icon: 'account_balance', color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const toTitleCase = (str) => {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Summary
      try {
        setIsLoadingSummary(true);
        const res = await fetch('/api/dashboard/summary');
        const json = await res.json();
        if (json.success && json.data) {
          setSummaryData(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      } finally {
        setIsLoadingSummary(false);
      }

      // Fetch Insights
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard/insight');
        const result = await response.json();

        if (result.success) {
          const formattedInsights = [
            ...(result.anomali || []).map(item => ({
              title: item.tipe.replace(/_/g, ' '),
              text: item.pesan,
              type: 'negative'
            })),
            ...(result.insight || []).map(text => ({
              title: 'Saran Strategis',
              text: text,
              type: 'positive'
            }))
          ];

          setAiInsights(formattedInsights);
        }
      } catch (error) {
        console.error("Gagal mengambil data insight:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Effect terpisah untuk chart agar bisa refresh saat reportPeriod berubah
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoadingChart(true);
        const response = await fetch(`/api/dashboard/laporan/bulanan?bulan=${reportPeriod.value}`);
        const result = await response.json();

        if (result.success && result.data) {
          // Map data agar sesuai dengan kunci yang digunakan di Recharts (masuk, keluar)
          const mappedData = result.data.map(item => ({
            name: `H-${item.name}`,
            masuk: item.pemasukan || 0,
            keluar: item.pengeluaran || 0
          }));
          setReportData(mappedData);
        }
      } catch (error) {
        console.error("Gagal mengambil data chart:", error);
      } finally {
        setIsLoadingChart(false);
      }
    };

    if (reportPeriod?.value) {
      fetchChartData();
    }
  }, [reportPeriod]);

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
      backgroundColor: (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#1e293b' : '#f8fafc',
      border: 'none',
      borderRadius: '0.75rem',
      padding: '2px 8px',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#e2e8f0' : '#475569',
      fontSize: '0.875rem',
      fontWeight: '700',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#0f172a' : '#fff',
      borderRadius: '1.25rem',
      zIndex: 50,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#9C413D' : isFocused ? ((typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#1e293b' : '#f8fafc') : 'transparent',
      color: isSelected ? '#fff' : ((typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#94a3b8' : '#475569'),
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
                  instanceId="month-select"
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
                  {isLoadingSummary ? (
                    <div className="h-8 w-32 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg mt-1"></div>
                  ) : (
                    <p className={`text-2xl font-black ${stat.label === 'Laba Bersih' ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{formatCurrency(stat.value || 0)}</p>
                  )}
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

                <div className="h-[350px] w-full relative">
                  {isLoadingChart && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 z-10 backdrop-blur-sm rounded-xl">
                      <div className="flex flex-col items-center gap-3">
                        <span className="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Memuat Data...</p>
                      </div>
                    </div>
                  )}

                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                        dy={15}
                      />
                      <YAxis hide domain={[0, 'dataMax + 1000000']} />
                      <Tooltip
                        cursor={{ fill: (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#1e293b' : '#f8fafc' }}
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
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                        formatter={(value) => formatCurrency(value)}
                      />
                      <Bar
                        dataKey="masuk"
                        fill="#22c55e"
                        radius={[6, 6, 0, 0]}
                        barSize={reportData.length > 20 ? 8 : 16}
                      />
                      <Bar
                        dataKey="keluar"
                        fill="#ef4444"
                        radius={[6, 6, 0, 0]}
                        barSize={reportData.length > 20 ? 8 : 16}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Insights Section */}
              <div className="space-y-6">
                <div className="bg-primary rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                  {/* Dekorasi Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`material-symbols-outlined ${isLoading ? 'animate-spin' : 'animate-pulse'}`}>
                        {isLoading ? 'sync' : 'auto_awesome'}
                      </span>
                      <h4 className="text-lg font-black uppercase tracking-wider">AI Business Insights</h4>
                    </div>

                    <div className="space-y-6">
                      {isLoading ? (
                        // Skeleton Loading
                        [1, 2].map((n) => (
                          <div key={n} className="p-5 bg-white/5 rounded-2xl border border-white/5 animate-pulse">
                            <div className="h-2 w-20 bg-white/20 rounded mb-3"></div>
                            <div className="h-4 w-full bg-white/10 rounded"></div>
                          </div>
                        ))
                      ) : aiInsights.length > 0 ? (
                        aiInsights.map((insight, i) => (
                          <div
                            key={i}
                            className={`p-5 backdrop-blur-md rounded-2xl border transition-all hover:bg-white/15 ${insight.type === 'negative'
                              ? 'bg-red-500/10 border-red-500/20'
                              : 'bg-white/10 border-white/10'
                              }`}
                          >
                            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${insight.type === 'negative' ? 'text-red-300' : 'text-white/60'
                              }`}>
                              {toTitleCase(insight.title)}
                            </p>
                            <p className="text-sm font-bold leading-relaxed">
                              {toTitleCase(insight.text)}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-white/40 italic text-center py-4">Belum ada data tersedia minggu ini.</p>
                      )}
                    </div>

                    {/* <button
                      disabled={isLoading}
                      className="w-full mt-8 py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isLoading ? 'Menganalisis...' : 'Generate Laporan Full'}
                    </button> */}
                  </div>
                </div>

                {/* Growth Mockup */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Pertumbuhan Aset</h4>
                  <div className="flex items-end gap-3 mb-2">
                    {isLoadingSummary ? (
                      <div className="h-10 w-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg mb-1"></div>
                    ) : (
                      <span className="text-4xl font-black text-slate-900 dark:text-white">
                        {summaryData?.pertumbuhan ? (summaryData.pertumbuhan.startsWith('+') ? '' : '+') + summaryData.pertumbuhan : '+0%'}
                      </span>
                    )}
                    {isLoadingSummary ? (
                      <span className="text-gray-400 font-bold mb-1 flex items-center animate-pulse">
                        <span className="material-symbols-outlined text-sm mr-1">sync</span>
                        Memuat...
                      </span>
                    ) : (
                      <span className={`font-bold mb-1 flex items-center ${summaryData?.pertumbuhan?.startsWith('+') ? 'text-green-500' :
                        summaryData?.pertumbuhan?.startsWith('-') ? 'text-red-500' : 'text-slate-500'
                        }`}>
                        <span className="material-symbols-outlined text-sm mr-1">
                          {summaryData?.pertumbuhan
                            ? (summaryData.pertumbuhan.startsWith('+') ? 'trending_up' : 'trending_down')
                            : 'trending_flat'}
                        </span>
                        {summaryData?.pertumbuhan || '0%'} Bulan lalu
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 leading-relaxed font-bold text-[10px] tracking-wider uppercase">
                    {isLoadingSummary ? (
                      <span className="animate-pulse flex items-center gap-2">
                        <span className="h-2 w-24 bg-slate-200 rounded"></span>
                      </span>
                    ) : (
                      (() => {
                        // Ambil angka dari string pertumbuhan (misal: "+10%" -> 10, "-5%" -> -5)
                        const nilai = parseFloat(summaryData?.pertumbuhan) || 0;

                        let insight = "";
                        if (nilai > 0) {
                          insight = "Performa finansial Anda berada di atas rata-rata industri bulan ini.";
                        } else if (nilai < 0) {
                          insight = "Performa finansial Anda berada di bawah rata-rata industri bulan ini.";
                        } else {
                          insight = "Performa finansial Anda stabil dan sama seperti bulan sebelumnya.";
                        }
                        return insight;
                      })()
                    )}
                  </p>
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
