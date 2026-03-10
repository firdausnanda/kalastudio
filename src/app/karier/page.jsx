'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomCTA from '@/components/BottomCTA';

export default function CareerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: "rocket_launch",
      title: "Inovasi Tanpa Henti",
      description: "Kami selalu mencari cara baru untuk mempermudah hidup UMKM melalui teknologi yang tepat guna dan mudah diakses.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: "favorite",
      title: "Peduli & Empati",
      description: "Kami membangun produk dengan mendengarkan langsung keluh kesah dan kebutuhan para pengguna kami setiap harinya.",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      icon: "groups",
      title: "Tumbuh Bersama",
      description: "Kami percaya budaya kerja yang kolaboratif dan saling mendukung adalah kunci untuk menciptakan dampak yang besar.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: "workspace_premium",
      title: "Kualitas Terbaik",
      description: "Kami berkomitmen untuk selalu memberikan standar tertinggi dalam setiap baris kode dan setiap interaksi pengguna.",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    }
  ];

  const jobs = [
    // {
    //   id: 1,
    //   title: "Senior Frontend Engineer",
    //   department: "Engineering",
    //   location: "Remote / Jakarta",
    //   type: "Full-time",
    //   description: "Membangun antarmuka yang indah dan responsif untuk platform KalaStudio menggunakan React dan Tailwind CSS."
    // },
    // {
    //   id: 2,
    //   title: "AI Researcher & Prompt Engineer",
    //   department: "Product",
    //   location: "Remote",
    //   type: "Full-time",
    //   description: "Menyempurnakan model AI kami untuk memahami konteks finansial yang tidak terstruktur dari log WhatsApp."
    // },
    // {
    //   id: 3,
    //   title: "Product Marketing Specialist",
    //   department: "Marketing",
    //   location: "Jakarta",
    //   type: "Full-time",
    //   description: "Merancang dan mengeksekusi kampanye pemasaran digital untuk meningkatkan adopsi di pasar UMKM."
    // },
    // {
    //   id: 4,
    //   title: "Customer Success Associate",
    //   department: "Operations",
    //   location: "Remote",
    //   type: "Full-time",
    //   description: "Membantu pengguna baru melakukan onboarding dan memastikan mereka mendapatkan nilai maksimal dari KalaStudio."
    // }
  ];

  return (
    <div className="bg-white text-slate-900 font-display transition-colors duration-300 dark:bg-slate-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-slate-50 dark:bg-slate-800/30 pt-32 pb-24 px-4 transition-colors duration-300 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
              Ayo Bangun Masa Depan <br />
              <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">UMKM Indonesia</span> Bersama
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Bergabunglah dengan tim yang bersemangat dalam mendemokratisasi akses teknologi keuangan untuk jutaan pebisnis kecil di seluruh Nusantara.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#lowongan"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('lowongan')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
              >
                Lihat Lowongan Terbuka
              </a>
            </div>
          </div>
        </section>

        {/* Culture & Values */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black mb-6 dark:text-white">Budaya Kami</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Di KalaStudio, kami lebih dari sekadar kolega. Kami adalah pembangun produk empati yang peduli dengan kesuksesan pengguna kami.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/40 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${item.bg} ${item.color}`}>
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-black mb-4 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perks / Benefits Image Grid */}
        <section className="py-12 px-4 mb-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative group overflow-hidden rounded-[32px]">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Tim kerja kolaboratif" className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-black text-white mb-2">Kerja Kolaboratif</h3>
                <p className="text-slate-200">Lingkungan yang mendukung inovasi bersama.</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-[32px]">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Keseimbangan kerja dan hidup" className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-black text-white mb-2">Work-Life Balance</h3>
                <p className="text-slate-200">Fleksibilitas untuk hasil terbaik.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section id="lowongan" className="py-24 bg-slate-50 dark:bg-slate-800/20 px-4 transition-colors">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-black mb-4 dark:text-white">Posisi Terbuka</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Temukan peran yang cocok dan berdampak bagi karier Anda.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm">
                  {jobs.length} Posisi
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div key={job.id} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-bold uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black mb-3 dark:text-white group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 md:mb-0 max-w-2xl">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-4 shrink-0">
                      <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                        <span className="material-symbols-outlined text-[20px] mr-1">location_on</span>
                        {job.location}
                      </div>
                      <button className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-primary dark:bg-slate-800 dark:hover:bg-primary text-slate-700 hover:text-white dark:text-slate-300 dark:hover:text-white rounded-xl font-bold transition-colors duration-300">
                        Lamar Sekarang
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-slate-900 p-12 rounded-[32px] border border-slate-100 dark:border-slate-800 text-center">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl text-slate-400 dark:text-slate-500">
                      work_history
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Belum Ada Lowongan
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Maaf, saat ini belum ada posisi yang terbuka untuk kategori ini. Silakan periksa kembali di lain waktu.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-12 text-center bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl text-slate-400">mail</span>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Tidak melihat peran yang sesuai?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Kami selalu mencari talenta hebat. Kirimkan CV Anda secara langsung dan beri tahu bagaimana Anda bisa membantu kami.
              </p>
              <a href="mailto:team@kalastudioai.com" className="text-primary font-bold hover:underline">
                team@kalastudioai.com
              </a>
            </div>
          </div>
        </section>

        <BottomCTA />
      </main>

      <Footer />
    </div>
  );
}
