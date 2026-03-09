'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomCTA from '@/components/BottomCTA';

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = [
    {
      id: 1,
      title: "5 Cara Mengatur Keuangan UMKM Agar Tetap Sehat",
      category: "Tips Bisnis",
      date: "8 Mar 2024",
      image: "https://images.unsplash.com/photo-1454165833762-010491e7a027?q=80&w=800&auto=format&fit=crop",
      excerpt: "Mengelola arus kas adalah kunci utama keberlangsungan bisnis kecil. Pelajari langkah praktisnya di sini."
    },
    {
      id: 2,
      title: "Manfaat Menggunakan WhatsApp untuk Pencatatan Transaksi",
      category: "Teknologi",
      date: "5 Mar 2024",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
      excerpt: "Kenapa harus ribet buka laptop kalau bisa catat transaksi lewat aplikasi chat yang Anda gunakan setiap hari?"
    },
    {
      id: 3,
      title: "Update Fitur: Laporan Laba Rugi Otomatis Kini Lebih Cepat",
      category: "Product Update",
      date: "1 Mar 2024",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      excerpt: "Kami baru saja merilis pembaruan mesin AI kami untuk memproses rekap suara Anda dalam hitungan detik."
    },
    {
      id: 4,
      title: "Strategi Pemasaran Digital untuk Pengusaha Pemula",
      category: "Marketing",
      date: "26 Feb 2024",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop",
      excerpt: "Tingkatkan penjualan Anda dengan memanfaatkan media sosial dan konten kreatif yang menarik perhatian."
    },
    {
      id: 5,
      title: "Mengenal Perpajakan UMKM di Indonesia Tahun 2024",
      category: "Edukasi",
      date: "20 Feb 2024",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
      excerpt: "Jangan sampai bisnis Anda terkendala masalah pajak. Pahami regulasi terbaru dengan bahasa yang mudah."
    },
    {
      id: 6,
      title: "Cara Menjaga Data Keuangan Bisnis Tetap Aman",
      category: "Keamanan",
      date: "15 Feb 2024",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
      excerpt: "Keamanan data adalah tanggung jawab bersama. Simak tips menjaga kerahasiaan data di era digital."
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-display transition-colors duration-300 dark:bg-slate-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Blog Hero */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800/30 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              Wawasan & <span className="text-primary">Edukasi Bisnis</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              Temukan tips praktis, panduan teknologi, dan kabar terbaru dari industri UMKM untuk membantu bisnis Anda melaju lebih kencang.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 -mt-12 relative z-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row hover:shadow-primary/5 transition-all duration-500">
              <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Featured"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <span className="text-primary font-black text-xs uppercase tracking-widest mb-4">Artikel Pilihan</span>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight dark:text-white">Membangun Bisnis yang Tahan Banting di Era Digital</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg italic">
                  "Digitalisasi bukan lagi pilihan, melainkan keharusan. Namun, strategi yang tepat adalah kunci kemenangan..."
                </p>
                <div className="flex items-center gap-4">
                  <button className="text-primary font-bold flex items-center gap-2 group">
                    Baca Selengkapnya
                    <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1.5">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Feed */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 text-center md:text-left">
              <div>
                <h2 className="text-3xl font-black mb-2 dark:text-white">Terbitan Terbaru</h2>
                <p className="text-slate-500">Artikel edukasi harian untuk kemajuan usaha Anda.</p>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                <button className="px-6 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl shadow-sm font-bold text-sm">Semua</button>
                <button className="px-6 py-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold text-sm">Edukasi</button>
                <button className="px-6 py-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold text-sm">Tips</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <div key={post.id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-primary shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold mb-4">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      {post.date}
                    </div>
                    <h3 className="dark:text-white text-xl font-bold mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <button className="dark:text-white border-2 border-slate-200 dark:border-slate-800 hover:border-primary px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1">
                Tampilkan Lebih Banyak
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Jangan Ketinggalan Tips Eksklusif!</h2>
            <p className="text-white/80 mb-10 text-lg">Dapatkan berita UMKM dan edukasi keuangan setiap minggunya langsung ke email Anda.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Masukkan alamat email..."
                className="flex-grow px-6 py-5 rounded-2xl bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white focus:text-slate-900 outline-none transition-all focus:ring-4 focus:ring-white/20"
              />
              <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black shadow-xl hover:-translate-y-1 active:scale-95 transition-all">
                Berlangganan
              </button>
            </form>
          </div>
        </section>

        <BottomCTA />
      </main>

      <Footer />
    </div>
  );
}
