'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardFooter from '@/components/DashboardFooter';

export default function TransactionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filterType, setFilterType] = useState({ value: 'all', label: 'Semua Jenis' });
  const [searchQuery, setSearchQuery] = useState('');

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

  const typeOptions = [
    { value: 'all', label: 'Semua Jenis' },
    { value: 'in', label: 'Pemasukan' },
    { value: 'out', label: 'Pengeluaran' },
  ];

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/dashboard/transaksi');
        const data = await res.json();
        if (data && data.success && data.data && Array.isArray(data.data.data)) {
          const mapped = data.data.data.map(trx => ({
            id: trx.id || Math.random(),
            date: new Date(trx.transaksi_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
            desc: trx.deskripsi || trx.kategori || 'Transaksi',
            category: trx.kategori || 'Lainnya',
            type: trx.tipe === 'pengeluaran' ? 'out' : 'in',
            amount: trx.total || 0,
            source: trx.sumber_input === 'wa' ? 'WhatsApp AI' : (trx.sumber_input || 'Manual')
          }));
          setTransactions(mapped);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(trx => {
    const matchType = filterType.value === 'all' || trx.type === filterType.value;
    const matchSearch = trx.desc.toLowerCase().includes(searchQuery.toLowerCase()) || trx.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#1e293b' : '#f8fafc',
      border: 'none',
      borderRadius: '0.75rem',
      padding: '2px 8px',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#e2e8f0' : '#475569',
      fontSize: '0.875rem',
      fontWeight: '700',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#0f172a' : '#fff',
      borderRadius: '1rem',
      zIndex: 50,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#9C413D' : isFocused ? ((typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#1e293b' : '#f8fafc') : 'transparent',
      color: isSelected ? '#fff' : ((typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? '#94a3b8' : '#475569'),
      cursor: 'pointer',
    }),
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
            {/* Header Page */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Daftar Transaksi</h2>
                <p className="text-slate-500 dark:text-slate-400">Kelola dan pantau seluruh arus kas bisnis Anda.</p>
              </div>
              <Link
                href="/transaksi/tambah"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">add</span>
                Tambah Transaksi
              </Link>
            </div>

            {/* Filter Section */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Jenis</label>
                <Select
                  defaultValue={filterType}
                  onChange={setFilterType}
                  options={typeOptions}
                  styles={customSelectStyles}
                  isSearchable={false}
                />
              </div>
              <div className="relative">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Cari Deskripsi</label>
                <input
                  type="text"
                  placeholder="Contoh: Penjualan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold dark:text-white"
                />
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 dark:border-slate-800/50">
                      <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Tanggal</th>
                      <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Deskripsi</th>
                      <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Nominal</th>
                      <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Sumber</th>
                      <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {isLoading ? (
                      <tr>
                        <td colSpan="5" className="px-8 py-12 text-center">
                          <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
                          <p className="text-sm text-slate-400 font-bold mt-4">Memuat transaksi...</p>
                        </td>
                      </tr>
                    ) : filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-8 py-12 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <span className="material-symbols-outlined text-5xl mb-4 opacity-50">receipt_long</span>
                            <p className="text-sm font-bold">Belum ada transaksi ditemukan.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((trx) => (
                        <tr key={trx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                          <td className="px-8 py-6 text-sm font-bold text-slate-500 dark:text-slate-400">{trx.date}</td>
                          <td className="px-8 py-6">
                            <p className="text-sm font-black text-slate-900 dark:text-white mb-0.5">{trx.desc}</p>
                            <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${trx.type === 'in' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                              {trx.type === 'in' ? 'Pemasukan' : 'Pengeluaran'}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <p className={`text-base font-black ${trx.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                              {trx.type === 'in' ? '+' : '-'}{formatCurrency(trx.amount)}
                            </p>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 dark:bg-primary/10 text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider border border-primary/10">
                              {trx.source === 'WhatsApp AI' && <span className="material-symbols-outlined text-xs">auto_awesome</span>}
                              {trx.source}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center justify-center gap-2">
                              <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all active:scale-90" title="Edit">
                                <span className="material-symbols-outlined text-xl">edit_note</span>
                              </button>
                              <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all active:scale-90" title="Hapus">
                                <span className="material-symbols-outlined text-xl">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Mockup */}
              <div className="px-8 py-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-400 uppercase">Menampilkan {filteredTransactions.length} transaksi</p>
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-all disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 transition-all">
                    1
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-primary text-sm font-black transition-all">
                    2
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-all">
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                  </button>
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
