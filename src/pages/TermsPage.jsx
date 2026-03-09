import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-slate-900 font-display transition-colors duration-300 dark:bg-slate-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="bg-slate-50 dark:bg-slate-800/30 py-20 px-4 transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center border-b border-slate-200 dark:border-slate-800 pb-10">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Syarat & <span className="text-primary">Ketentuan</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Pembaruan Terakhir: 9 Maret 2026
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert prose-lg">
            <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
              Selamat datang di KalaStudio. Dengan mendaftar dan menggunakan layanan kami, Anda menyetujui syarat dan ketentuan berikut ini. Harap baca dengan saksama sebelum menggunakan platform kami.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">1. Penerimaan Syarat</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Dengan mengakses atau menggunakan aplikasi KalaStudio, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak diperkenankan untuk menggunakan layanan kami.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">2. Layanan Kami</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              KalaStudio menyediakan layanan pembukuan berbasis WhatsApp AI untuk UMKM. Layanan kami mencakup pencatatan transaksi otomatis, pembuatan laporan keuangan, dan integrasi WhatsApp. Kami berhak untuk mengubah, menangguhkan, atau menghentikan layanan kapan saja dengan atau tanpa pemberitahuan.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">3. Kewajiban Pengguna</h2>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-6 space-y-2 marker:text-primary">
              <li>Anda harus memberikan informasi yang akurat dan lengkap saat mendaftar akun.</li>
              <li>Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi dan akun Anda.</li>
              <li>Anda setuju untuk tidak menggunakan layanan kami untuk tujuan ilegal atau tidak sah.</li>
              <li>Anda tidak diperbolehkan mengirimkan virus, worm, atau kode yang bersifat merusak.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">4. Berlangganan dan Pembayaran</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Beberapa fitur di KalaStudio memerlukan langganan berbayar. Biaya berlangganan akan ditagihkan di muka setiap bulan atau tahun, tergantung pada paket yang Anda pilih. Semua pembayaran yang telah dilakukan tidak dapat dikembalikan (non-refundable) kecuali diwajibkan oleh hukum.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">5. Privasi dan Data</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Kami menghargai privasi Anda. Pengumpulan dan penggunaan informasi pribadi Anda diatur oleh Kebijakan Privasi kami. Dengan menggunakan KalaStudio, Anda menyetujui pengumpulan dan penggunaan data sesuai dengan Kebijakan Privasi tersebut.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">6. Batasan Tanggung Jawab</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Sejauh diizinkan oleh hukum yang berlaku, KalaStudio tidak akan bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan kami, termasuk namun tidak terbatas pada kerugian laba, data, atau niat baik.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">7. Perubahan Syarat & Ketentuan</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Kami berhak, atas kebijakan kami sendiri, untuk mengubah atau mengganti Syarat dan Ketentuan ini kapan saja. Jika revisi bersifat material, kami akan mencoba memberikan pemberitahuan setidaknya 30 hari sebelum syarat baru berlaku.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">8. Hubungi Kami</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami di:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 font-medium">Email: <a href="mailto:contact@kalastudio.com" className="text-primary hover:underline">contact@kalastudio.com</a></p>
              <p className="text-slate-700 dark:text-slate-300 font-medium mt-2">WhatsApp: <a href="https://wa.me/6281217122497" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+62 812 1712 2497</a></p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
