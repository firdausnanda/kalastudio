import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardFooter from '../components/DashboardFooter';

export default function AddTransactionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [transactionType, setTransactionType] = useState('out'); // 'in' or 'out'
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });

  const navigate = useNavigate();

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


  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: localStorage.getItem('theme') === 'dark' ? '#1e293b' : '#f8fafc',
      border: 'none',
      borderRadius: '1.25rem',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
    }),
    singleValue: (base) => ({
      ...base,
      color: localStorage.getItem('theme') === 'dark' ? '#e2e8f0' : '#475569',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: localStorage.getItem('theme') === 'dark' ? '#0f172a' : '#fff',
      borderRadius: '1.25rem',
      zIndex: 50,
      border: localStorage.getItem('theme') === 'dark' ? '1px solid #1e293b' : '1px solid #f1f5f9',
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      overflow: 'hidden',
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#9C413D' : isFocused ? (localStorage.getItem('theme') === 'dark' ? '#1e293b' : '#f8fafc') : 'transparent',
      color: isSelected ? '#fff' : (localStorage.getItem('theme') === 'dark' ? '#94a3b8' : '#475569'),
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
    }),
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Logic simpan (mockup)
    alert('Transaksi berhasil disimpan!');
    navigate('/transaksi');
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
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb & Title */}
            <div className="mb-10">
              <Link to="/transaksi" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors mb-4 uppercase tracking-widest">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Kembali ke Daftar
              </Link>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Catat Transaksi Baru</h2>
              <p className="text-slate-500 dark:text-slate-400">Pastikan data yang Anda masukkan sudah sesuai.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              {/* Type Switcher */}
              <div className="bg-white dark:bg-slate-900 p-2 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex gap-2">
                <button
                  type="button"
                  onClick={() => setTransactionType('out')}
                  className={`flex-grow flex items-center justify-center gap-3 py-4 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all ${transactionType === 'out' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <span className="material-symbols-outlined">remove_circle</span>
                  Pengeluaran
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType('in')}
                  className={`flex-grow flex items-center justify-center gap-3 py-4 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all ${transactionType === 'in' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  Pemasukan
                </button>
              </div>

              {/* Main Form Fields */}
              <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
                {/* Amount Input */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Nominal Transaksi</label>
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300 group-focus-within:text-primary transition-colors">Rp</span>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      className="w-full pl-20 pr-8 py-6 bg-slate-50 dark:bg-slate-800 border-none rounded-[24px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-3xl font-black dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-700"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-1 gap-8">
                  {/* Date Input */}
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Tanggal</label>
                    <input
                      type="date"
                      required
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold dark:text-white"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                {/* Note Area */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Catatan / Deskripsi</label>
                  <textarea
                    rows="3"
                    placeholder="Contoh: Beli keperluan toko..."
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold dark:text-white placeholder:text-slate-300"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  ></textarea>
                </div>

                {/* Source Info (Static for now) */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">edit_square</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sumber Pencatatan</p>
                    <p className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase">Input Manual</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-grow py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all text-sm"
                >
                  Simpan Transaksi
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/transaksi')}
                  className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 rounded-[24px] font-black uppercase tracking-[0.2em] border border-slate-100 dark:border-slate-800 hover:bg-slate-50 transition-all text-sm"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <DashboardFooter />
    </div>
  );
}
