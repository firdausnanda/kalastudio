'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomCTA from '@/components/BottomCTA';
import Link from 'next/link';

export default function PanduanPage() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "Apa itu Kala Studio AI dan bagaimana cara kerjanya?",
      a: "Kala Studio AI adalah asisten keuangan berbasis kecerdasan buatan yang dirancang khusus untuk membantu UMKM mencatat transaksi, mengelola keuangan, dan mendapatkan wawasan bisnis secara otomatis melalui WhatsApp."
    },
    {
      q: "Apakah saya perlu mengunduh aplikasi tambahan?",
      a: "Tidak. Kala Studio AI dirancang untuk beroperasi sepenuhnya di dalam platform WhatsApp. Anda dapat mengakses semua fitur langsung melalui chat dengan bot kami."
    },
    {
      q: "Apakah KalaStudio mendukung pencatatan dalam mata uang asing?",
      a: "Saat ini, sistem kami dioptimalkan untuk penggunaan mata uang Rupiah (IDR). Pembaruan selanjutnya akan mencakup dukungan multi-mata uang."
    },
    {
      q: "Apakah data keuangan saya aman?",
      a: "Ya, keamanan data adalah prioritas utama kami. Kami menggunakan enkripsi end-to-end dan protokol keamanan standar industri untuk melindungi informasi keuangan Anda."
    },
    {
      q: "Apakah saya harus menggunakan format pengetikan khusus?",
      a: "Tidak. AI KalaStudio dirancang untuk memahami bahasa alami. Anda dapat mengetik transaksi seperti biasa (misal: 'Beli pulsa 50rb') dan AI akan otomatis mengkategorikannya."
    },
  ];

  const categories = [
    {
      title: "Mulai Cepat",
      icon: "rocket_launch",
      description: "Panduan langkah demi langkah untuk mendaftarkan akun dan menghubungkan WhatsApp Anda.",
      articles: ["Cara Daftar Akun", "Menghubungkan WhatsApp", "Pengaturan Profil Bisnis"]
    },
    {
      title: "Integrasi",
      icon: "settings_input_component",
      description: "Pelajari cara menghubungkan KalaStudio dengan sistem POS, Akuntansi, dan layanan lainnya.",
      articles: ["Integrasi API", "Webhook Setup", "Ekspor Data ke Excel"]
    },
    {
      title: "Laporan Keuangan",
      icon: "payments",
      description: "Memahami cara membaca laporan laba rugi, arus kas, dan rekap harian otomatis.",
      articles: ["Membaca Laporan AI", "Kategori Transaksi", "Rekap Voice Note"]
    },
    {
      title: "Keamanan & Akun",
      icon: "shield_lock",
      description: "Informasi tentang perlindungan data, manajemen staf, dan pengaturan privasi.",
      articles: ["Reset Password", "Manajemen User Staf", "Keamanan Data WhatsApp"]
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-display transition-colors duration-300 dark:bg-slate-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Help Center Hero */}
        <section className="bg-slate-50 dark:bg-slate-800/30 py-20 px-4 transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Pusat <span className="text-primary">Panduan & Bantuan</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
              Cari jawaban atau pelajari cara memaksimalkan KalaStudio untuk pertumbuhan bisnis Anda.
            </p>

            {/* Search Bar Simulation */}
            <div className="relative max-w-2xl mx-auto shadow-2xl shadow-primary/5">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                type="text"
                placeholder="Cari panduan (misal: 'cara hubungkan WA')..."
                className="w-full pl-14 pr-6 py-5 rounded-[20px] bg-white dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {categories.map((cat, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 dark:text-white">{cat.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                        {cat.description}
                      </p>
                      <ul className="space-y-3">
                        {cat.articles.map((article, i) => (
                          <li key={i}>
                            <a href="#" className="text-primary font-semibold text-sm hover:underline flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px]">description</span>
                              {article}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles List */}
        <section className="py-24 bg-slate-50 dark:bg-slate-800/20 transition-colors duration-300 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-10 text-center md:text-left dark:text-white">Pertanyaan Populer</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-200 pr-8">{faq.q}</span>
                    <span className={`material-symbols-outlined text-primary transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Need Help CTA */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-2xl mx-auto bg-primary rounded-[40px] p-12 text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <h2 className="text-3xl font-black mb-4 relative z-10">Belum Menemukan Jawaban?</h2>
            <p className="text-white/80 mb-10 relative z-10 text-lg">
              Tim dukungan kami siap membantu Anda 24/7 melalui WhatsApp atau Email.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link href="/kontak" className="bg-white text-primary px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
                <span className="material-symbols-outlined">chat</span>
                Hubungi Support
              </Link>
            </div>
          </div>
        </section>

        <BottomCTA />
      </main>

      <Footer />
    </div>
  );
}
