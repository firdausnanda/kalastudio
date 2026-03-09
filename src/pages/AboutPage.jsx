import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomCTA from '../components/BottomCTA';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    {
      year: "2025",
      title: "Awal Mula",
      description: "KalaStudio berawal dari sebuah diskusi santai di tempat ngopi, dari obrolan santai yang kemudian berkembang menjadi visi besar: mendigitalisasi UMKM Indonesia melalui platform yang paling mereka kenal, yaitu WhatsApp."
    },
    {
      year: "2025",
      title: "Ekspansi AI",
      description: "Kami mengintegrasikan teknologi kecerdasan buatan (AI) untuk membuat pencatatan keuangan semudah mengirim pesan suara atau chat biasa."
    },
    {
      year: "2026",
      title: "Solusi Terpadu",
      description: "Kini kami melayani ribuan UMKM di seluruh Indonesia, membantu mereka tumbuh dengan data keuangan yang akurat dan keputusan berbasis AI."
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-display transition-colors duration-300 dark:bg-slate-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-slate-50 dark:bg-slate-800/30 py-24 px-4 transition-colors duration-300 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
              Misi Kami Membantu <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">UMKM Indonesia</span> Naik Kelas
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              KalaStudio adalah platform manajemen keuangan berbasis WhatsApp AI yang dirancang khusus untuk mempermudah operasional bisnis di Indonesia.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-[40px] rotate-2"></div>
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
                alt="Tim KalaStudio"
                className="rounded-[32px] shadow-2xl relative z-10 w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-black mb-6 dark:text-white">Kenapa KalaStudio?</h2>
              <div className="space-y-6">
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Kami percaya bahwa teknologi tercanggih sekalipun tidak akan berguna jika sulit digunakan. Itulah mengapa kami memilih WhatsApp—aplikasi yang sudah digunakan oleh hampir semua orang Indonesia—sebagai antarmuka utama layanan kami.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Dengan bantuan AI, kami menghilangkan kerumitan input data manual. Pengusaha bisa fokus pada strategi produk dan pelayanan, sementara kami mengurus semua pencatatan dan pelaporan keuangannya secara otomatis.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <div className="text- primary text-4xl font-black mb-1 dark:text-white">100+</div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pengguna Aktif</div>
                  </div>
                  <div>
                    <div className="text-primary text-4xl font-black mb-1">1M+</div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Transaksi Dicatat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-slate-50 dark:bg-slate-800/20 px-4 transition-colors">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 p-10 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <h3 className="text-2xl font-black mb-4 dark:text-white">Visi Kami</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  Menjadi ekosistem digital terdepan bagi UMKM di Indonesia, di mana manajemen finansial bukan lagi menjadi hambatan, melainkan pendorong utama pertumbuhan bisnis.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-10 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">flag</span>
                </div>
                <h3 className="text-2xl font-black mb-4 dark:text-white">Misi Kami</h3>
                <ul className="space-y-4">
                  {[
                    "Demokratisasi akses teknologi keuangan bagi pebisnis kecil.",
                    "Menyederhanakan operasional bisnis melalui inovasi berbasis AI.",
                    "Memberikan dampak positif yang nyata bagi ekonomi digital nasional."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400 text-lg">
                      <span className="text-primary font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Milestone Timeline */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-16 text-center dark:text-white">Perjalanan Kami</h2>
            <div className="relative">
              {/* Vertical line helper for desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800"></div>

              <div className="space-y-16">
                {milestones.map((item, idx) => (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Circle on line */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary border-4 border-white dark:border-slate-900 z-10 items-center justify-center text-white text-[10px] font-bold">
                      {item.year}
                    </div>

                    <div className="w-full md:w-[45%]">
                      <div className={`bg-white dark:bg-slate-800/40 p-8 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-lg ${idx % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                        <div className="md:hidden text-primary font-black mb-2">{item.year}</div>
                        <h4 className="text-xl font-black mb-3 dark:text-white">{item.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block w-10"></div>
                    <div className="hidden md:block w-[45%]"></div>
                  </div>
                ))}
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
