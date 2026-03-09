"use client";
export default function DetailedFeatures() {
  return (
    <section className="py-32 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] -z-10 transition-colors"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] -z-10 transition-colors"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Kelebihan Utama</span>
          <h2 className="text-4xl md:text-5xl font-black text-secondary dark:text-white mb-6 leading-tight transition-colors">
            Solusi Pembukuan Paling Natural yang Pernah Ada
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 transition-colors">Kami menggabungkan kemudahan WhatsApp dengan kecanggihan AI untuk memberikan kontrol finansial penuh pada bisnis Anda.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: WhatsApp Integration */}
          <div className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-2xl shadow-slate-200/40 dark:shadow-none hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 dark:from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
                <span className="material-symbols-outlined text-3xl">forum</span>
              </div>
              <h3 className="text-2xl font-black text-secondary dark:text-white mb-4 transition-colors">Integrasi Natural WhatsApp</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed transition-colors">Kirim VN atau chat dalam bahasa sehari-hari. AI kami mengerti slang dan dialek lokal untuk input data yang akurat.</p>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-4 border border-slate-100 dark:border-slate-600 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase transition-colors">AI Processing</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden transition-colors">
                  <div className="h-full bg-primary w-[75%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Instant Reports */}
          <div className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-2xl shadow-slate-200/40 dark:shadow-none hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 dark:from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
                <span className="material-symbols-outlined text-3xl">analytics</span>
              </div>
              <h3 className="text-2xl font-black text-secondary dark:text-white mb-4 transition-colors">Laporan Visual Instan</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed transition-colors">Tarik laporan laba rugi, arus kas, hingga inventaris dalam format PDF/Excel hanya dengan satu perintah chat.</p>
              <div className="flex gap-2">
                <div className="flex-1 h-12 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                </div>
                <div className="flex-1 h-12 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-emerald-600">table_chart</span>
                </div>
                <div className="flex-[2] h-12 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <span className="text-[10px] font-bold text-primary">DOWNLOAD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Debt Management */}
          <div className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-2xl shadow-slate-200/40 dark:shadow-none hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 dark:from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
                <span className="material-symbols-outlined text-3xl">notifications_active</span>
              </div>
              <h3 className="text-2xl font-black text-secondary dark:text-white mb-4 transition-colors">Pengingat Otomatis</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed transition-colors">Jangan biarkan piutang macet. ChatKas akan mengirimkan notifikasi pengingat tepat waktu ke Anda atau pelanggan.</p>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-100 dark:border-amber-900/50 flex items-start gap-3 transition-colors">
                <span className="material-symbols-outlined text-amber-500 text-xl">priority_high</span>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-amber-900 dark:text-amber-400 leading-tight transition-colors">Piutang Toko Berkah</p>
                  <p className="text-[10px] text-amber-700 dark:text-amber-500 transition-colors">Jatuh tempo hari ini: Rp 450.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 p-8 rounded-[3rem] bg-secondary dark:bg-slate-800 border dark:border-slate-700 text-white flex flex-col md:flex-row items-center justify-between gap-8 transition-colors">
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              <div className="w-14 h-14 rounded-full border-4 border-secondary dark:border-slate-800 bg-slate-300 transition-colors"></div>
              <div className="w-14 h-14 rounded-full border-4 border-secondary dark:border-slate-800 bg-slate-400 transition-colors"></div>
              <div className="w-14 h-14 rounded-full border-4 border-secondary dark:border-slate-800 bg-primary flex items-center justify-center font-bold text-xs transition-colors">100+</div>
            </div>
            <div>
              <p className="font-bold text-lg dark:text-white">Bergabung dengan 100+ UMKM</p>
              <p className="text-slate-400 dark:text-slate-300 text-sm transition-colors">Mulai digitalisasi bisnis Anda hari ini.</p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]">
            Coba Gratis Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}
