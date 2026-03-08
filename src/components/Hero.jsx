import { useState, useEffect } from 'react';

export default function Hero() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 500);
      return () => clearTimeout(timer);
    } else if (step === 1) {
      const timer = setTimeout(() => setStep(2), 800);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      const timer = setTimeout(() => setStep(3), 1500);
      return () => clearTimeout(timer);
    } else if (step === 3) {
      const timer = setTimeout(() => setStep(4), 1000);
      return () => clearTimeout(timer);
    } else if (step === 4) {
      const timer = setTimeout(() => setStep(0), 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="flex flex-col gap-10">
            <h1 className="text-5xl lg:text-6xl font-black text-secondary dark:text-white leading-[1.1] tracking-tight transition-colors duration-300">
              Otomatisasi Pembukuan UMKM, Cukup dari WhatsApp Anda.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl transition-colors duration-300">
              Tinggalkan rekap manual. Catat transaksi dengan Voice Note di WhatsApp, biarkan AI kami menyusun laporan laba-rugi bisnis Anda secara real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 dark:shadow-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]">
                Coba Gratis Sekarang
              </button>
              <button className="border-2 border-slate-200 dark:border-slate-700 hover:border-secondary dark:hover:border-slate-500 text-secondary dark:text-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300">
                Jadwalkan Demo
              </button>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px]">
              {/* Minimalist Dashboard Card */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-full aspect-[16/10] bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 hidden md:block">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-1/3 bg-slate-100 rounded-full"></div>
                    <div className="h-2 w-1/4 bg-slate-50 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="h-24 rounded-2xl bg-slate-50"></div>
                  <div className="h-24 rounded-2xl bg-slate-50"></div>
                </div>
                <div className="h-32 w-full bg-primary/5 rounded-2xl flex items-end justify-around p-4">
                  <div className="w-8 h-[40%] bg-primary/20 rounded-t-lg"></div>
                  <div className="w-8 h-[70%] bg-primary/40 rounded-t-lg"></div>
                  <div className="w-8 h-[50%] bg-primary/20 rounded-t-lg"></div>
                  <div className="w-8 h-[90%] bg-primary/60 rounded-t-lg"></div>
                </div>
              </div>
              {/* Sleek Smartphone */}
              <div className="relative z-10 mx-auto lg:ml-auto lg:mr-0 w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden shadow-primary/20">
                <div className="absolute top-0 w-full h-8 bg-slate-900 flex justify-center pt-2">
                  <div className="w-20 h-4 bg-black rounded-full"></div>
                </div>
                <div className="h-full pt-8 flex flex-col bg-[#F0F2F5]">
                  <div className="bg-primary px-6 py-4 text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                    <span className="font-bold text-sm">KalaStudio Assistant</span>
                  </div>
                  <div className="p-4 flex flex-col gap-3 overflow-hidden h-full justify-end pb-4">
                    {/* ... (isi chat tetap sama) ... */}
                    {/* Voice Note dari User */}
                    {step >= 1 && (
                      <div className="bg-primary/10 border border-primary/20 p-3 rounded-2xl rounded-tr-none text-xs w-4/5 self-end shadow-sm flex items-center gap-2 animate-fade-in-up">
                        <span className="material-symbols-outlined text-sm text-primary">mic</span>
                        <span>Voice Note Transaksi</span>
                        <div className="flex items-center gap-0.5 ml-1 h-3">
                          <div className="w-[3px] bg-primary/70 rounded-full h-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                          <div className="w-[3px] bg-primary/70 rounded-full h-full animate-bounce" style={{ animationDelay: '0.2s', animationDirection: 'reverse' }}></div>
                          <div className="w-[3px] bg-primary/70 rounded-full h-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <div className="text-[9px] text-slate-400 ml-auto mt-0.5">09:41</div>
                      </div>
                    )}

                    {/* Indikator Bot Mengetik */}
                    {step === 2 && (
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none text-xs w-16 shadow-sm flex gap-1 items-center animate-fade-in-up">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                    )}

                    {/* Balasan Teks dari Bot */}
                    {step >= 3 && (
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none text-xs w-4/5 shadow-sm text-slate-600 animate-fade-in-up">
                        Halo! Berhasil mencatat penjualan Kopi Susu x2 (Rp 40.000).
                        <div className="text-[9px] text-slate-400 text-right mt-1">09:41</div>
                      </div>
                    )}

                    {/* Kartu Ringkasan Hari Ini */}
                    {step >= 4 && (
                      <div className="bg-white p-4 rounded-2xl text-[10px] shadow-lg border-l-4 border-primary mt-1 animate-fade-in-up">
                        <div className="font-bold text-slate-800 mb-2">Ringkasan Hari Ini</div>
                        <div className="flex justify-between mb-1"><span>Omzet</span><span className="text-primary font-bold">Rp 1.250.000</span></div>
                        <div className="flex justify-between"><span>Transaksi</span><span className="text-slate-500">42 Nota</span></div>
                        <div className="text-[9px] text-slate-400 text-right mt-2">09:42</div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input Box */}
                  <div className="bg-[#f0f2f5] px-3 py-3 border-t border-slate-200 flex items-center gap-2 mt-auto">
                    <button className="text-slate-500 flex items-center justify-center p-1.5 hover:bg-slate-200 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-slate-400 shadow-sm border border-slate-100 flex items-center justify-between">
                      {step === 0 ? <span className="animate-pulse">Tahan 🎤 untuk rekam...</span> : <span>Ketik pesan...</span>}
                      <span className="material-symbols-outlined text-[16px] text-slate-400">attach_file</span>
                    </div>
                    {step === 0 ? (
                      <button className="bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md animate-bounce shadow-primary/30 flex-shrink-0">
                        <span className="material-symbols-outlined text-[18px]">mic</span>
                      </button>
                    ) : (
                      <button className="bg-slate-500 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                        <span className="material-symbols-outlined text-[18px]">mic</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
