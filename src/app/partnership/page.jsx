'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomCTA from '@/components/BottomCTA';

export default function PartnershipPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const programs = [
    {
      title: "Reseller Program",
      icon: "storefront",
      desc: "Mulai bisnis digital Anda dengan menjual solusi KalaStudio ke UMKM lokal di kota Anda.",
      benefits: ["Komisi Penjualan Tinggi", "Marketing Kit Lengkap", "Dukungan Teknis Prioritas"]
    },
    {
      title: "Affiliate Partner",
      icon: "share",
      desc: "Dapatkan penghasilan tambahan dengan merekomendasikan KalaStudio ke jaringan Anda.",
      benefits: ["Sistem Tracking Transparan", "Pembayaran Mingguan", "Bonus Performa"]
    },
    {
      title: "Integrasi Teknologi",
      icon: "hub",
      desc: "Integrasikan API KalaStudio ke dalam sistem POS atau Akuntansi Anda.",
      benefits: ["Dokumentasi API Lengkap", "Sandbox Environment", "Co-Branding Opportunity"]
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-display transition-colors duration-300 dark:bg-slate-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Partnership Hero */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800/30 -skew-y-3 origin-top-left transition-colors duration-300"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary dark:bg-primary/20 rounded-full text-sm font-bold mb-6">
                Kemitraan Strategis
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                Tumbuh Bersama <span className="text-primary">Ekosistem KalaStudio</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                Bergabunglah dengan visi kami untuk mendigitalisasi jutaan UMKM melalui teknologi yang paling dekat dengan mereka: WhatsApp.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 transition-all duration-300 hover:-translate-y-1">
                  Daftar Jadi Mitra
                </button>
                <button className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:border-primary">
                  Unduh Proposal
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl dark:text-white  font-black mb-4">Pilih Program Anda</h2>
              <p className="text-slate-500 dark:text-slate-400">Tentukan cara terbaik untuk kita berkolaborasi.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-3xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 group">
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    {item.desc}
                  </p>
                  <ul className="space-y-4">
                    {item.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section Preview */}
        <section className="py-24 bg-slate-50 dark:bg-slate-800/20 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black mb-4 dark:text-white">Hubungi Tim Partnership</h2>
                <p className="text-slate-500">Ajukan pertanyaan atau mulai diskusi kemitraan hari ini.</p>
              </div>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 dark:text-white">Nama Lengkap</label>
                    <input type="text" className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Masukkan nama..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 dark:text-white">Email Bisnis</label>
                    <input type="email" className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="email@bisnis.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 dark:text-white">Pesan / Minat Kemitraan</label>
                  <textarea rows="4" className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Ceritakan sedikit tentang rencana kolaborasi Anda..."></textarea>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all duration-300">
                  Kirim Pengajuan
                </button>
              </form>
            </div>
          </div>
        </section>

        <BottomCTA />
      </main>

      <Footer />
    </div>
  );
}
