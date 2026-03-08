export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-secondary dark:text-white transition-colors">Apa Kata Pemilik Usaha yang Sudah Beralih?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
            <div className="flex text-amber-400 mb-4">
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed transition-colors">"Dulu repot banget tiap malem harus rekap nota yang numpuk. Sekarang tinggal VN pas ada yang beli, beres!"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors" data-alt="Foto profil pengguna wanita pemilik kedai kopi"></div>
              <div>
                <p className="font-bold text-secondary dark:text-white transition-colors">Siti Aminah</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">Owner Kedai Kopi Sederhana</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
            <div className="flex text-amber-400 mb-4">
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed transition-colors">"Sangat terbantu buat pantau piutang pelanggan. ChatKas ngingetin otomatis lewat WA, jadi nggak enak nagihnya pun berkurang."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors" data-alt="Foto profil pengguna pria pemilik toko grosir"></div>
              <div>
                <p className="font-bold text-secondary dark:text-white transition-colors">Budi Santoso</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">Toko Grosir Jaya</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
            <div className="flex text-amber-400 mb-4">
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed transition-colors">"AI-nya pinter banget. Saya ngomong pake bahasa gaul aja dia tetep ngerti masuknya ke pengeluaran apa."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors" data-alt="Foto profil pengguna pria pemilik bisnis barbershop"></div>
              <div>
                <p className="font-bold text-secondary dark:text-white transition-colors">Andi Wijaya</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">Freelance Barber</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
