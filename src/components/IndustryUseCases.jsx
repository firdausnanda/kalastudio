"use client";
export default function IndustryUseCases() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-secondary dark:text-white transition-colors">Satu Solusi Cerdas untuk Berbagai Jenis Usaha.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-10 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-6 transition-colors">
              <span className="material-symbols-outlined text-4xl">restaurant</span>
            </div>
            <h4 className="text-xl font-bold text-secondary dark:text-white mb-4 transition-colors">F&amp;B (Kedai &amp; Resto)</h4>
            <p className="text-slate-600 dark:text-slate-400 transition-colors">Pantau stok bahan baku dan omzet harian tanpa perlu kasir mahal.</p>
          </div>
          <div className="text-center p-10 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-6 transition-colors">
              <span className="material-symbols-outlined text-4xl">storefront</span>
            </div>
            <h4 className="text-xl font-bold text-secondary dark:text-white mb-4 transition-colors">Retail &amp; Toko Kelontong</h4>
            <p className="text-slate-600 dark:text-slate-400 transition-colors">Catat ribuan SKU dengan mudah. Tahu barang paling laris setiap minggu.</p>
          </div>
          <div className="text-center p-10 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-6 transition-colors">
              <span className="material-symbols-outlined text-4xl">content_cut</span>
            </div>
            <h4 className="text-xl font-bold text-secondary dark:text-white mb-4 transition-colors">Jasa &amp; Freelance</h4>
            <p className="text-slate-600 dark:text-slate-400 transition-colors">Kirim invoice profesional dan catat biaya operasional proyek secara rapi.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
