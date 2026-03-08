export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="/img/logo.png" alt="ChatKas Logo" className="h-8 rounded-lg" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed transition-colors">
              Solusi pembukuan termudah berbasis WhatsApp AI untuk digitalisasi UMKM di seluruh Indonesia.
            </p>
          </div>
          <div>
            <h5 className="text-secondary dark:text-white font-bold mb-6 transition-colors">Produk</h5>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 transition-colors">
              <li><a className="hover:text-primary transition-colors" href="#">Fitur Utama</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Laporan AI</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Integrasi WA</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Update Terbaru</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-secondary dark:text-white font-bold mb-6 transition-colors">Perusahaan</h5>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 transition-colors">
              <li><a className="hover:text-primary transition-colors" href="#">Tentang Kami</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Karier</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-secondary dark:text-white font-bold mb-6 transition-colors">Hubungi Kami</h5>
            <div className="flex gap-4 mb-6">
              <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-secondary dark:text-slate-300 hover:bg-primary hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined text-sm">social_leaderboard</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-secondary dark:text-slate-300 hover:bg-primary hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-secondary dark:text-slate-300 hover:bg-primary hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined text-sm">camera</span>
              </a>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 transition-colors">Gedung Inovasi Lt. 4, Jakarta Selatan, Indonesia</p>
          </div>
        </div>
        <div className="border-t border-slate-50 dark:border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
          <p className="text-xs text-slate-400 dark:text-slate-500 transition-colors">© 2026 KalaStudio. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-slate-400 dark:text-slate-500 transition-colors">
            <a className="hover:text-secondary dark:hover:text-primary" href="#">Syarat &amp; Ketentuan</a>
            <a className="hover:text-secondary dark:hover:text-primary" href="#">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
