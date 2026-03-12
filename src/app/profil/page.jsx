'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardFooter from '@/components/DashboardFooter';
import Swal from 'sweetalert2';

export default function BusinessProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [subscription, setSubscription] = useState({
    plan: '..... Plan',
    status: '.....',
    renewalDate: '.....'
  });
  const [stats, setStats] = useState({
    totalTransactions: 0,
    quotaUsage: 0
  });

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

    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/dashboard/user');
        const json = await res.json();

        if (json.success && json.data) {
          const user = json.data.data || json.data;
          const cleanNumber = user.nomor_wa.replace("@s.whatsapp.net", "");

          setFormData({
            businessName: user.nama_bisnis || '',
            businessType: user.kategori_bisnis || '',
            ownerName: user.nama || '',
            email: user.email || '',
            phone: cleanNumber || '',
            address: user.alamat || '',
          });

          // Update subscription info
          setSubscription({
            plan: user.plan || user.paket || '...... Plan',
            status: new Date(user.trial_ends_at) > new Date() && user.token_balance > 0 ? 'AKTIF' : 'NON-AKTIF',
            renewalDate: user.trial_ends_at ? new Date(user.trial_ends_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '.....'
          });
        }

        // Fetch Stats Summary
        const summaryRes = await fetch('/api/dashboard/summary');
        const summaryJson = await summaryRes.json();
        if (summaryJson.success && summaryJson.data) {
          const s = summaryJson.data;
          const usagePercent = (s.token?.total > 0 ? Math.round((s.token?.total - s.token?.balance / s.token?.total)) : 0);

          setStats(prev => ({
            ...prev,
            totalTransactions: s.kuota?.terpakai || s.jumlah_transaksi || 0,
            quotaUsage: usagePercent
          }));
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    window.fetchProfileData = fetchProfileData;
    fetchProfileData();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSave = async (confirmedData) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/dashboard/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama_bisnis: confirmedData.businessName,
          kategori_bisnis: confirmedData.businessType,
          nama: confirmedData.ownerName,
          alamat: confirmedData.address,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Profil bisnis berhasil diperbarui!',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-[30px] border-none shadow-2xl dark:bg-slate-900 dark:text-white',
            title: 'font-black uppercase tracking-wider',
          }
        });

        // Refresh data setelah simpan menggunakan fungsi fetch yang konsisten
        if (window.fetchProfileData) {
          await window.fetchProfileData();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: `Gagal memperbarui profil: ${json.error || 'Terjadi kesalahan'}`,
          customClass: {
            popup: 'rounded-[30px] border-none shadow-2xl dark:bg-slate-900 dark:text-white',
          }
        });
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan Sistem',
        text: 'Terjadi kesalahan sistem saat menyimpan profil.',
        customClass: {
          popup: 'rounded-[30px] border-none shadow-2xl dark:bg-slate-900 dark:text-white',
        }
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Ganti Kata Sandi',
      html: `
        <div class="space-y-4 text-left p-2">
          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Kata Sandi Lama</label>
            <input id="swal-input1" type="password" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm" placeholder="Masukkan kata sandi lama">
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Kata Sandi Baru</label>
            <input id="swal-input2" type="password" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm" placeholder="Masukkan kata sandi baru">
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Simpan Password',
      cancelButtonText: 'Batal',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-[40px] border-none shadow-2xl dark:bg-slate-900 dark:text-white p-8',
        title: 'font-black uppercase tracking-wider text-xl mb-4',
        confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 py-4 font-black uppercase tracking-widest text-[10px] border-none outline-none shadow-lg shadow-primary/20',
        cancelButton: 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-2xl px-8 py-4 font-black uppercase tracking-widest text-[10px] border-none outline-none'
      },
      preConfirm: () => {
        const passLama = document.getElementById('swal-input1').value;
        const passBaru = document.getElementById('swal-input2').value;
        if (!passLama || !passBaru) {
          Swal.showValidationMessage('Semua bidang wajib diisi');
          return false;
        }
        return { password_lama: passLama, password_baru: passBaru };
      }
    });

    if (formValues) {
      try {
        Swal.fire({
          title: 'Memproses...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
          customClass: {
            popup: 'rounded-[30px] dark:bg-slate-900',
          }
        });

        const res = await fetch('/api/dashboard/user/change-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });

        const json = await res.json();

        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Kata sandi berhasil diperbarui.',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              popup: 'rounded-[30px] dark:bg-slate-900 dark:text-white',
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: json.error || 'Terjadi kesalahan saat mengubah kata sandi.',
            customClass: {
              popup: 'rounded-[30px] dark:bg-slate-900 dark:text-white',
            }
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan',
          text: 'Gagal menghubungi server.',
          customClass: {
            popup: 'rounded-[30px] dark:bg-slate-900 dark:text-white',
          }
        });
      }
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Konfirmasi Perubahan',
      text: "Pastikan data yang dimasukkan sudah benar.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Simpan',
      cancelButtonText: 'Batal',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-[30px] border-none shadow-2xl dark:bg-slate-900 dark:text-white',
        confirmButton: 'px-6 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all active:scale-95',
        cancelButton: 'px-6 py-3 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all border border-slate-100 dark:border-slate-700',
        title: 'font-black uppercase tracking-wider',
        actions: 'gap-4'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        handleSave(formData);
      }
    });
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
                <form onSubmit={onFormSubmit} className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8 relative overflow-hidden">
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-4">
                      <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Memuat Data...</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Nama Pemilik Usaha</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold dark:text-white"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Nama Bisnis</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold dark:text-white"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Jenis Usaha</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold dark:text-white"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        required
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
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">No. Telepon</label>
                      <input
                        type="tel"
                        className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800/50 border-none rounded-[20px] outline-none transition-all text-sm font-bold dark:text-white cursor-not-allowed"
                        value={formData.phone}
                        readOnly
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
                      required
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSaving || isLoading}
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
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Perbarui kata sandi anda</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleChangePassword}
                      className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                    >
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
                      <h4 className="text-2xl font-black bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent uppercase tracking-wider capitalize">{subscription.plan} Plan</h4>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                        <span>Status</span>
                        <span className={`${subscription.status === 'AKTIF' ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                          <span className="material-symbols-outlined text-xs">{subscription.status === 'AKTIF' ? 'check_circle' : 'cancel'}</span>
                          {subscription.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                        <span>Pembaruan</span>
                        <span>{subscription.renewalDate}</span>
                      </div>
                    </div>

                    <Link
                      href="/langganan"
                      className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center"
                    >
                      Upgrade Paket
                    </Link>
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
                        <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">{stats.totalTransactions.toLocaleString('id-ID')}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Transaksi</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">auto_awesome</span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">{stats.quotaUsage}%</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kuota Terpakai</p>
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
