'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomCTA from '@/components/BottomCTA';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function LaporanAIPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const chartData = [
    { name: 'Sen', total: 450000 },
    { name: 'Sel', total: 600000 },
    { name: 'Rab', total: 550000 },
    { name: 'Kam', total: 800000 },
    { name: 'Jum', total: 750000 },
    { name: 'Sab', total: 1100000 },
    { name: 'Min', total: 950000 },
  ];

  const features = [
    {
      title: 'Laporan Laba Rugi Instan',
      description: 'Dapatkan rekap pemasukan, pengeluaran, dan total laba bersih kapan pun Anda butuhkan hanya dengan mengirim satu kata "Laba" ke WhatsApp.',
      icon: 'monitoring',
      color: 'bg-emerald-500'
    },
    {
      title: 'Analisis Tren Penjualan',
      description: 'AI menganalisis pola penjualan Anda dan memberikan wawasan tentang hari tersibuk atau produk terlaris secara visual.',
      icon: 'trending_up',
      color: 'bg-blue-500'
    },
    {
      title: 'Kategorisasi Otomatis',
      description: 'Semua transaksi otomatis dikelompokkan (misal: Bahan Baku, Operasional, Gaji) sehingga laporan langsung siap dibaca.',
      icon: 'category',
      color: 'bg-purple-500'
    },
    {
      title: 'Notifikasi Harian & Mingguan',
      description: 'Terima ringkasan finansial harian setiap tutup toko, dan laporan komprehensif mingguan setiap Senin pagi langsung di WhatsApp Anda.',
      icon: 'mail',
      color: 'bg-amber-500'
    }
  ];

  const useCases = [
    {
      q: 'Berapa laba hari ini?',
      a: 'Laba bersih hari ini adalah Rp 450.000 (Pemasukan: Rp 750.000, Pengeluaran: Rp 300.000). Total 12 transaksi penjualan.',
      time: '18:05'
    },
    {
      q: 'Apa pengeluaran terbesar bulan ini?',
      a: 'Pengeluaran terbesar bulan ini adalah "Bahan Baku" sebesar Rp 3.500.000 (45% dari total pengeluaran).',
      time: '10:12'
    },
    {
      q: 'Tolong rekap penjualan minggu lalu',
      a: 'Berikut rekap minggu lalu:\n1. Kopi Susu: 154 cup\n2. Americano: 89 cup\n\nTotal Pemasukan: Rp 4.850.000.\nHari terlaris: Sabtu.',
      time: '08:30'
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-display transition-colors duration-300 dark:bg-slate-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-slate-50 dark:bg-slate-800/20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.2] mb-6">
                Pantau Laporan Bisnis <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Secara Otomatis</span>.
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-md">
                Dapatkan wawasan keuangan instan, grafik menawan, dan ringkasan AI cukup dengan bertanya lewat chat WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark hover:-translate-y-1 transition-all shadow-xl shadow-primary/30 text-center flex items-center justify-center gap-2 w-max">
                  Coba Gratis Sekarang
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              {/* Dashboard Report Mockup */}
              <div className="relative mx-auto w-full max-w-lg bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden ring-4 ring-white/50 dark:ring-slate-800/50">
                {/* Header Mockup */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Laba Bersih</h3>
                    <p className="text-sm text-slate-500">Minggu Ini</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-black text-primary">Rp 5.200.000</h2>
                    <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">+12.5% vs minggu lalu</span>
                  </div>
                </div>
                {/* Chart Mockup */}
                <div className="p-6 h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9C413D" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#9C413D" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#9C413D', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="total" stroke="#9C413D" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                {/* Insights Mockup */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 m-4 rounded-2xl flex gap-4 items-start border border-slate-100 dark:border-slate-700/50">
                  <div className="w-10 h-10 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">lightbulb</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">AI Insight</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Penjualan akhir pekan (Sabtu-Minggu) menyumbang 40% dari total pendapatan minggu ini. Pertimbangkan untuk menambah staf pada hari tersebut.</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl z-0"></div>
            </div>
          </div>
        </section>

        {/* Features Split */}
        <section className="py-24 px-4 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                Fitur Unggulan <span className="text-primary">Laporan AI</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                AI kami tidak sekadar menghitung angka, tetapi membaca tren dan memberikan ringkasan yang mudah dicerna oleh siapa saja.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-[32px] p-8 md:p-10 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col md:flex-row gap-6">
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} text-white flex items-center justify-center shrink-0 shadow-xl ${feature.color.replace('bg-', 'shadow-')}/30 group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300`}>
                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chat Showcase */}
        <section id="cara-kerja" className="py-24 px-4 bg-slate-50 dark:bg-slate-800/20 overflow-hidden relative">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                Bertanya layaknya <span className="text-primary">kepada Manajer Keuangan</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                Anda tidak perlu memahami istilah akuntansi yang rumit. Tanyakan pertanyaan bisnis Anda dalam bahasa sehari-hari melalui WhatsApp, dan AI KalaStudio akan memberikan jawaban instan berbasis data riil Anda.
              </p>

              <div className="space-y-6">
                {useCases.map((uc, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative pl-12 group hover:border-primary/30 transition-colors">
                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 absolute left-4 top-6 group-hover:text-primary transition-colors">format_quote</span>
                    <p className="font-bold text-slate-800 dark:text-white mb-2 text-lg">"{uc.q}"</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm whitespace-pre-line leading-relaxed">{uc.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative w-full flex justify-center">
              <div className="absolute inset-0 bg-primary/5 rounded-[40px] blur-3xl scale-150"></div>
              {/* Phone Mockup WA */}
              <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[45px] border-[8px] border-slate-900 shadow-2xl overflow-hidden ring-4 ring-slate-200 dark:ring-slate-800">
                <div className="absolute top-0 inset-x-0 h-2 bg-slate-900 rounded-b-3xl w-46 mx-auto z-20"></div>

                <div className="absolute inset-0 bg-[#EFEAE2] dark:bg-[#0B141A] flex flex-col pt-1">
                  {/* Header */}
                  <div className="bg-[#008069] dark:bg-[#202C33] p-3 flex items-center gap-3 text-white shadow-sm z-10">
                    <span className="material-symbols-outlined">arrow_back</span>
                    <div className="flex-1 font-bold text-sm">KalaStudio AI</div>
                  </div>

                  {/* Chat body */}
                  <div className="flex-1 p-3 overflow-y-auto space-y-4 relative">
                    <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp-thumbnail.jpg")', backgroundSize: 'cover', opacity: 0.1 }}></div>

                    {useCases.map((uc, i) => (
                      <div key={i} className="relative z-10">
                        {/* User Msg */}
                        <div className="flex justify-end mb-2">
                          <div className="bg-[#D9FDD3] dark:bg-[#005C4B] p-2.5 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm text-slate-800 dark:text-slate-100 text-[13px]">
                            {uc.q}
                            <p className="text-[9px] text-green-700/50 dark:text-green-300/50 text-right mt-1">{uc.time}</p>
                          </div>
                        </div>

                        {/* Bot Msg */}
                        <div className="flex justify-start mb-4">
                          <div className="bg-white dark:bg-[#202C33] p-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-sm text-slate-800 dark:text-slate-200 text-[12px] border border-slate-100 dark:border-slate-800/50">
                            <span className="font-bold text-primary mb-1 block">🤖 Laporan Cepat:</span>
                            <span className="whitespace-pre-line leading-relaxed">{uc.a}</span>
                            <p className="text-[9px] text-slate-400 text-right mt-2">{uc.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="bg-[#F0F2F5] dark:bg-[#202C33] p-2 flex items-center gap-2 z-10">
                    <div className="flex-1 bg-white dark:bg-[#2A3942] rounded-full h-10 px-4 flex items-center text-slate-400 text-sm">
                      Ketik pertanyaan analisis...
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BottomCTA />
      </main>

      <Footer />
    </div>
  );
}
