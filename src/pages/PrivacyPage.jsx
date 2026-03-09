import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPage() {
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
              Kebijakan <span className="text-primary">Privasi</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Pembaruan Terakhir: 9 Maret 2026
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert prose-lg">
            <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
              KalaStudio menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi yang Anda bagikan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan platform kami.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Kami mengumpulkan beberapa jenis informasi untuk menyediakan dan meningkatkan layanan kami bagi Anda:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-6 space-y-2 marker:text-primary">
              <li><strong>Informasi Pribadi:</strong> Nama, alamat email, nomor telepon (termasuk nomor WhatsApp), dan informasi kontak lainnya yang Anda berikan saat mendaftar.</li>
              <li><strong>Data Transaksi:</strong> Data pembukuan, catatan pengeluaran/pemasukan, dan rincian transaksi bisnis Anda yang dikirimkan melalui platform atau WhatsApp.</li>
              <li><strong>Data Penggunaan:</strong> Informasi tentang cara Anda mengakses dan menggunakan platform KalaStudio, termasuk alamat IP, jenis browser, halaman yang dikunjungi, dan waktu akses.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Informasi yang kami kumpulkan digunakan untuk berbagai tujuan operasional:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-6 space-y-2 marker:text-primary">
              <li>Menyediakan, mengoperasikan, dan memelihara layanan KalaStudio.</li>
              <li>Memproses transaksi pembukuan dan menghasilkan laporan AI yang akurat.</li>
              <li>Berkomunikasi dengan Anda mengenai pembaruan layanan, penawaran, dan dukungan pelanggan.</li>
              <li>Mendeteksi, mencegah, dan menangani masalah teknis atau indikasi penipuan.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">3. Berbagi dan Pengungkapan Data</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami hanya dapat membagikan informasi Anda dalam situasi berikut:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-6 space-y-2 marker:text-primary">
              <li><strong>Penyedia Layanan:</strong> Kami mempekerjakan perusahaan pihak ketiga untuk memfasilitasi layanan kami (misalnya, hosting, analitik, integrasi WhatsApp). Mereka memiliki akses ke data Anda hanya untuk melakukan tugas tersebut atas nama kami dan berkewajiban untuk tidak mengungkapkannya.</li>
              <li><strong>Kepatuhan Hukum:</strong> Jika diwajibkan oleh hukum yang berlaku atau permintaan otoritas pemerintah yang sah.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">4. Keamanan Data</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Keamanan data Anda adalah prioritas utama kami. Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai standar industri untuk melindungi data pribadi dan catatan keuangan bisnis Anda dari akses, pengungkapan, atau kerusakan yang tidak sah.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">5. Hak Privasi Anda</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Dalam hal perlindungan data, Anda memiliki hak untuk:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-6 space-y-2 marker:text-primary">
              <li>Mengakses, memperbarui, atau menghapus informasi pribadi yang kami miliki tentang Anda.</li>
              <li>Menarik persetujuan Anda sewaktu-waktu (meskipun hal ini dapat memengaruhi kemampuan kami untuk menyediakan layanan pembukuan).</li>
              <li>Meminta salinan data transaksi atau riwayat keuangan Anda.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">6. Perubahan pada Kebijakan Privasi Ini</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang setiap perubahan dengan memasang Kebijakan Privasi yang baru di halaman ini dan/atau melalui email. Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala untuk setiap perubahan.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">7. Hubungi Kami</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi kami atau cara kami menangani data Anda, silakan hubungi kami di:
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
