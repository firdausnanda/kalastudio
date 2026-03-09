import { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardFooter from '../components/DashboardFooter';

export default function BusinessProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    businessName: 'Kala Studio',
    businessType: 'Agency Kreatif',
    email: 'contact@kalastudio.com',
    phone: '081234567890',
    address: 'Jl. Senopati No. 12, Jakarta Selatan',
  });

  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profil bisnis berhasil diperbarui!');
    }, 1500);
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
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Header Section */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Profil Bisnis</h2>
              <p className="text-slate-500 dark:text-slate-400">Kelola identitas dan pengaturan akun bisnis Anda.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Profile Form */}
              <div className="lg:col-span-2 space-y-8">
                <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Nama Bisnis</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold dark:text-white"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Jenis Usaha</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold dark:text-white"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Email Bisnis</label>
                      <input
                        type="email"
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold dark:text-white"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">No. Telepon</label>
                      <input
                        type="tel"
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold dark:text-white"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Alamat Usaha</label>
                    <textarea
                      rows="3"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold dark:text-white"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full md:w-auto px-10 py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all text-xs disabled:opacity-50"
                    >
                      {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                  </div>
                </form>

                {/* Account Security Mockup */}
                <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Keamanan Akun</h3>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <p className="text-sm font-black text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-widest text-xs">Kata Sandi</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Terakhir diubah 3 bulan yang lalu</p>
                    </div>
                    <button className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                      Ganti Kata Sandi
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                {/* Subscription Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-primary/20 dark:to-primary/5 p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Paket Langganan</p>
                    <div className="flex items-center gap-3 mb-6">
                      <h4 className="text-2xl font-black bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent uppercase tracking-wider">Business Plan</h4>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                        <span>Status</span>
                        <span className="text-green-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">check_circle</span>
                          AKTIF
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                        <span>Pembaruan</span>
                        <span>01 April 2026</span>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] transition-all active:scale-95">
                      Upgrade Paket
                    </button>
                  </div>
                </div>

                {/* Business Analytics Quick View */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Statistik Bisnis</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">receipt_long</span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">1,240</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Transaksi</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">auto_awesome</span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">85%</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Efisiensi AI</p>
                      </div>
                    </div>
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
