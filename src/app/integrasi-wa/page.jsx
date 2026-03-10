'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomCTA from '@/components/BottomCTA';
import Link from 'next/link';
import Image from 'next/image';

export default function IntegrasiWAPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: 'Pencatatan Otomatis dari Voice Note',
      description: 'Kirim pesan suara (Voice Note) tentang pemasukan atau pengeluaran, AI kami otomatis mengubahnya menjadi catatan terstruktur dan rapi.',
      icon: 'mic',
      color: 'bg-emerald-500'
    },
    {
      title: 'Upload Struk Jadi Mudah',
      description: 'Cukup foto dan kirim strok belanja ke WhatsApp KalaStudio, dan biarkan AI yang mengekstraksi dan mengkategorikannya murni dari foto.',
      icon: 'receipt_long',
      color: 'bg-blue-500'
    },
    {
      title: 'Tanya Laporan ke AI',
      description: 'Ingin tahu laba hari ini? Atau pengeluaran minggu ini? Cukup tanyakan lewat chat WhatsApp dan dapatkan jawabannya secara instan.',
      icon: 'chat_bubble',
      color: 'bg-amber-500'
    },
    {
      title: 'Update & Pengingat',
      description: 'Dapatkan notifikasi hutang jatuh tempo atau peringatan saldo menipis agar bisnis Anda tetap sehat, semua via WhatsApp.',
      icon: 'notifications_active',
      color: 'bg-purple-500'
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'Daftar Akun KalaStudio',
      description: 'Buat akun Anda, lalu masuk ke Dashboard. Pilih menu "Integrasi WhatsApp".'
    },
    {
      step: '2',
      title: 'Scan QR Code',
      description: 'Buka WhatsApp di ponsel, pilih "Perangkat Tertaut" (Linked Devices), lalu scan QR Code di layar.'
    },
    {
      step: '3',
      title: 'Mulai Chat dengan AI',
      description: 'Setiap anggota tim yang terdaftar dapat mulai mengirim pesan pencatatan ke nomor WhatsApp bisnis Anda, dan AI menanganinya 24/7.'
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-display transition-colors duration-300 dark:bg-slate-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">

        {/* Features Split */}
        <section id="features" className="py-24 px-4 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                Mengapa Harus <span className="text-primary">Integrasi WhatsApp?</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Tidak perlu lagi login ke dashboard tiap kali mau catat transaksi. Cukup lewat WA, aplikasi yang sudah sering Anda gunakan setiap hari.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all group">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} text-white flex items-center justify-center mb-6 shadow-xl ${feature.color.replace('bg-', 'shadow-')}/30 group-hover:-translate-y-2 transition-transform duration-300`}>
                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 bg-slate-50 dark:bg-slate-800/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center mb-16">
              Mulai Dalam <span className="text-primary">3 Langkah Mudah</span>
            </h2>

            <div className="space-y-8 relative">
              <div className="absolute top-0 bottom-0 left-[2.5rem] md:left-[3.5rem] w-0.5 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="flex-shrink-0 z-10 w-20 h-20 md:w-28 md:h-28 bg-white dark:bg-slate-900 rounded-[32px] md:rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center justify-center">
                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Step</span>
                    <span className="text-3xl md:text-4xl font-black text-primary">{step.step}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[32px] flex-1 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security / Highlight Box */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-black rounded-[40px] p-10 md:p-16 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="w-24 h-24 shrink-0 bg-white/10 rounded-[2rem] flex items-center justify-center border border-white/10 relative z-10">
              <span className="material-symbols-outlined text-5xl text-green-400">shield_lock</span>
            </div>
            <div className="flex-1 relative z-10 text-center md:text-left">
              <h3 className="text-3xl font-black mb-4">Privasi & Keamanan Data 100% Terjamin</h3>
              <p className="text-slate-300 leading-relaxed text-lg hidden md:block">
                Semua pesan dan transaksi Anda diproses secara otomatis oleh sistem AI kami tanpa campur tangan manusia. Data keuangan tersimpan dengan enkripsi canggih sehingga privasi bisnis Anda selalu aman dan terlindungi.
              </p>
              <p className="text-slate-300 leading-relaxed text-lg md:hidden">
                Semua pesan diproses oleh AI. Data keuangan Anda dienkripsi penuh agar aman.
              </p>
            </div>
          </div>
        </section>

        <BottomCTA />
      </main>

      <Footer />
    </div>
  );
}
