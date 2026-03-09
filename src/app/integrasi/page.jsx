'use client';
import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardFooter from '@/components/DashboardFooter';

export default function IntegrationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 3000);
  };

  const handleDisconnect = () => {
    if (confirm('Apakah Anda yakin ingin memutuskan koneksi WhatsApp?')) {
      setIsConnected(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col font-display transition-colors duration-300">
      <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex flex-grow relative overflow-hidden">
        <DashboardSidebar isSidebarOpen={isSidebarOpen} />

        <div
          className={`
            fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300
            ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        <main className="flex-grow p-4 md:p-8 lg:p-10 transition-all duration-300 ease-in-out">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Integrasi WhatsApp</h2>
                <p className="text-slate-500 dark:text-slate-400">Hubungkan bisnis Anda dengan asisten AI tercanggih.</p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Status: {isConnected ? 'Terhubung' : 'Terputus'}
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Connection Wizard */}
              <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center text-center">
                {!isConnected ? (
                  <>
                    <div className="mb-8 relative">
                      <div className="w-64 h-64 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 relative overflow-hidden group">
                        {isConnecting ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Menghubungkan...</p>
                          </div>
                        ) : (
                          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
                            {/* Mock QR Code */}
                            <div className="grid grid-cols-4 gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                              {[...Array(16)].map((_, i) => (
                                <div key={i} className="w-8 h-8 bg-slate-900 dark:bg-white rounded-sm"></div>
                              ))}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="material-symbols-outlined text-6xl text-primary opacity-20 group-hover:opacity-100 transition-all group-hover:scale-110">qr_code_scanner</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Scan QR Code</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-xs">
                      Buka WhatsApp di ponsel Anda, ketuk Menu atau Pengaturan, lalu pilih Perangkat Tertaut.
                    </p>
                    <button
                      onClick={handleConnect}
                      disabled={isConnecting}
                      className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all text-xs disabled:opacity-50 disabled:translate-y-0"
                    >
                      {isConnecting ? 'Memproses...' : 'Hubungkan Sekarang'}
                    </button>
                  </>
                ) : (
                  <div className="py-10 flex flex-col items-center">
                    <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8">
                      <span className="material-symbols-outlined text-5xl">check_circle</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">WhatsApp Aktif!</h3>
                    <p className="text-sm text-green-600 dark:text-green-400 font-bold uppercase tracking-widest mb-8">Nomor Terhubung: +62 812-****-4321</p>
                    <div className="space-y-4 w-full">
                      <button className="w-full py-4 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all">
                        Uji Coba Kirim Pesan
                      </button>
                      <button
                        onClick={handleDisconnect}
                        className="w-full py-4 text-red-500 font-bold text-sm hover:underline"
                      >
                        Putuskan Koneksi
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Guide Section */}
              <div className="space-y-8">
                <div className="bg-primary rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                  <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[200px] opacity-10 rotate-12">auto_awesome</span>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-6 uppercase tracking-wider">Cara Kerja AI</h3>
                    <div className="space-y-8">
                      <div className="flex gap-5">
                        <div className="w-10 h-10 shrink-0 bg-white/20 rounded-xl flex items-center justify-center font-black">1</div>
                        <div>
                          <p className="font-black uppercase tracking-widest text-xs mb-1">Kirim Teks atau Voice Note</p>
                          <p className="text-sm text-white/80 leading-relaxed font-medium">"Tadi pagi laku kopi susu 5 cup harga 15rb per cup."</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="w-10 h-10 shrink-0 bg-white/20 rounded-xl flex items-center justify-center font-black">2</div>
                        <div>
                          <p className="font-black uppercase tracking-widest text-xs mb-1">Kirim Foto Struk</p>
                          <p className="text-sm text-white/80 leading-relaxed font-medium">Cukup foto struk belanjaan Anda, AI akan mengekstrak nominalnya otomatis.</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="w-10 h-10 shrink-0 bg-white/20 rounded-xl flex items-center justify-center font-black">3</div>
                        <div>
                          <p className="font-black uppercase tracking-widest text-xs mb-1">Cek Laporan Cepat</p>
                          <p className="text-sm text-white/80 leading-relaxed font-medium">Tanya "Berapa saldo hari ini?" dan dapatkan jawaban instan di WhatsApp.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 p-8 rounded-[40px] flex gap-6">
                  <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20">
                    <span className="material-symbols-outlined">lightbulb</span>
                  </div>
                  <div>
                    <h4 className="font-black text-amber-600 dark:text-amber-500 uppercase tracking-widest text-sm mb-2">Tips Pro</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">Gunakan Voice Note dalam Bahasa Indonesia yang lugas agar sistem AI dapat memprosesnya dengan akurat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <DashboardFooter />
    </div>
  );
}
