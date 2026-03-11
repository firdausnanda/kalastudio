'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Select from 'react-select';
import Spinner from '@/components/Spinner';

const BUSINESS_TYPES = [
  'Kuliner & Restoran',
  'Fashion & Pakaian',
  'Retail & Toko',
  'Jasa & Profesional',
  'Agency Kreatif',
  'Teknologi & Software',
  'Pendidikan & Kursus',
  'Kesehatan & Kecantikan',
  'Properti',
  'Keperluan Pribadi',
  'Logistik & Pengiriman',
  'Lainnya',
];

export default function LengkapiProfilPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.businessType || !formData.phone || !formData.address) {
      setError('Seluruh informasi wajib diisi.');
      return;
    }
    await saveProfile(formData);
  };

  const saveProfile = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/profil/detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'Terjadi kesalahan. Silakan coba lagi.');
        setIsLoading(false);
      }
    } catch {
      setError('Gagal terhubung ke server. Periksa koneksi Anda.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 font-display flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo / Brand */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Image
            src="/img/logo.png"
            alt="KalaStudio Logo"
            width={160}
            height={60}
            priority
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${step >= s
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                  }`}
              >
                {step > s ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  s
                )}
              </div>
              {s < 2 && (
                <div className={`w-16 h-0.5 rounded-full transition-all duration-500 ${step > s ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl shadow-slate-200/80 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-10">
          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Selamat datang! 🎉</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Untuk memulai, kami perlu tahu sedikit tentang bisnis Anda.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl border border-red-100 dark:border-red-900">
                    {error}
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                      Nama Bisnis <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">storefront</span>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Contoh: Warung Bu Siti"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                      Jenis Usaha <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none z-10">category</span>
                      <Select
                        name="businessType"
                        instanceId="businessType-select"
                        options={BUSINESS_TYPES.map(t => ({ value: t, label: t }))}
                        value={formData.businessType ? { value: formData.businessType, label: formData.businessType } : null}
                        onChange={(opt) => setFormData({ ...formData, businessType: opt ? opt.value : '' })}
                        placeholder="Pilih jenis usaha..."
                        isClearable
                        required
                        unstyled
                        menuPlacement="top"
                        classNamePrefix="react-select"
                        classNames={{
                          control: (state) => `w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border ${state.isFocused ? 'border-primary ring-4 ring-primary/10' : 'border-slate-200 dark:border-slate-700'} rounded-2xl outline-none transition-all text-sm font-semibold cursor-pointer`,
                          valueContainer: () => "p-0 gap-1 cursor-text",
                          singleValue: () => "text-slate-800 dark:text-white",
                          placeholder: () => "text-slate-400 font-normal",
                          input: () => "dark:text-white",
                          menu: () => "mb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden",
                          menuList: () => "p-2 max-h-60 overflow-y-auto",
                          option: (state) => `px-4 py-3 text-sm font-semibold rounded-xl cursor-pointer transition-colors ${state.isSelected ? 'bg-primary text-white' : state.isFocused ? 'bg-primary/10 text-primary dark:bg-slate-700 dark:text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`,
                          indicatorSeparator: () => "hidden",
                          dropdownIndicator: (state) => `text-slate-400 transition-transform ${state.selectProps.menuIsOpen ? 'rotate-180' : ''}`,
                          clearIndicator: () => "text-slate-400 hover:text-red-500 transition-colors",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!formData.businessName || !formData.businessType) {
                      setError('Nama bisnis dan jenis usaha wajib diisi.');
                      return;
                    }
                    setError('');
                    setStep(2);
                  }}
                  className="group w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/30 flex justify-center items-center gap-2 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                >
                  Lanjutkan
                  <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <button
                    type="button"
                    onClick={() => { setStep(1); setError(''); }}
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-primary transition-colors mb-4"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Kembali
                  </button>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Informasi Kontak</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Mohon lengkapi informasi kontak untuk bisnis Anda.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl border border-red-100 dark:border-red-900">
                    {error}
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                      Nomor Telepon <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">phone</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="08xxxxxxxxxx"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                      Alamat Usaha <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-4 text-slate-400 text-xl">location_on</span>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Jl. Contoh No. 1, Kota..."
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/30 flex justify-center items-center gap-2 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        Simpan & Masuk ke Dashboard
                        <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">rocket_launch</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => { setStep(1); setError(''); }}
                    className="w-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm font-semibold py-2 transition-colors"
                  >
                    Halaman Sebelumnya
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-6">
          Data Anda aman dan tidak akan dibagikan kepada pihak ketiga.
        </p>
      </div>
    </div>
  );
}
