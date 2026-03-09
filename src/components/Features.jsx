"use client";
export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-black text-secondary dark:text-white mb-6 transition-colors">
            Fokus Kembangkan Bisnis,<br />Administrasi Biar Kami yang Tangani.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-primary/30 transition-all group">
            <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl font-bold">timer</span>
            </div>
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 transition-colors">Pencatatan Hitungan Detik</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">Catat transaksi secepat mengirim pesan chat biasa. Tidak perlu buka aplikasi berat.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-primary/30 transition-all group">
            <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl font-bold">psychology</span>
            </div>
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 transition-colors">Teknologi AI Cerdas</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">AI kami mengerti konteks teks dan suara secara otomatis. Mengubah chat jadi entri jurnal akuntansi.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-primary/30 transition-all group">
            <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl font-bold">trending_up</span>
            </div>
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 transition-colors">Keputusan Bisnis Lebih Cepat</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">Laporan real-time untuk strategi bisnis yang lebih akurat. Tahu profit Anda hari ini, detik ini juga.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
