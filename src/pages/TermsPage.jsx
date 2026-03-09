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

            <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-8 rounded-r-3xl my-12 transition-all">
              <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
                5. Aturan Main Penggunaan Token
              </h2>

              <p className="text-slate-700 dark:text-slate-300 font-medium mb-8 leading-relaxed">
                Untuk memastikan KalaStudio selalu bisa melayani warung dan toko kamu dengan cepat dan akurat, kami menggunakan sistem <span className="text-primary font-black whitespace-nowrap">"1 Aksi = 1 Token"</span> yang sangat mudah dipahami. Nggak perlu pusing mikir hitungan rumit!
              </p>

              <div className="space-y-10">
                <div className="group">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">1</span>
                    Apa Itu 1 Token?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                    Setiap kali kamu meminta bantuan KalaStudio untuk mencatat transaksi, KalaStudio akan menggunakan 1 Token dari kuota bulananmu. Ini berlaku untuk semua cara pencatatan:
                  </p>
                  <ul className="grid sm:grid-cols-3 gap-4 list-none pl-0 mt-4">
                    <li className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                      <span className="material-symbols-outlined text-primary mb-2">mic</span>
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Ngobrol (Voice Note)</p>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">1 Token / rekaman</p>
                    </li>
                    <li className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                      <span className="material-symbols-outlined text-primary mb-2">image</span>
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Kirim Foto</p>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">1 Token / foto nota</p>
                    </li>
                    <li className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                      <span className="material-symbols-outlined text-primary mb-2">edit_note</span>
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Ketik Manual</p>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">1 Token / pesan teks</p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">2</span>
                    Batasan Wajar
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 font-black text-xs">VN</div>
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">Voice Note (Maksimal 15 Detik)</p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-1 italic">Bicara singkat dan jelas! Jika lebih dari 15 detik, sistem akan menggunakan 2 Token. Tips: "Catat pecel tiga puluh ribu" hanya butuh 3 detik!</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 font-black text-xs">FT</div>
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">Foto Nota (1 Foto/Pengiriman)</p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-1 italic">Pastikan foto jelas dan terang. 1 Lembar nota = 1 Token. Jika ada 3 nota, kirim foto terpisah.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 font-black text-xs">TX</div>
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">Teks Manual (Maksimal 500 Karakter)</p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-1 italic">Cukup untuk detail transaksi atau utang pelanggan tanpa harus mengetik novel.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-2xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 blur-2xl rounded-full"></div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-3">3. Masa Berlaku</h3>
                    <ul className="text-xs space-y-2 list-none pl-0 font-bold text-slate-300">
                      <li className="flex gap-2"><span className="text-primary">•</span> Reset otomatis setiap bulan (Siklus Tagihan).</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Token tidak dapat diakumulasikan ke bulan berikutnya.</li>
                    </ul>
                  </div>
                  <div className="bg-primary p-6 rounded-2xl text-white">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white/70 mb-3">4. Kehabisan Token?</h3>
                    <p className="text-xs font-bold leading-relaxed">
                      Usahamu lagi laris manis! Kamu bisa membeli <span className="bg-white/20 px-2 py-0.5 rounded">Paket Top-Up Token Ekstra</span> langsung dari dashboard tanpa harus upgrade paket langganan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">6. Privasi dan Data</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Kami menghargai privasi Anda. Pengumpulan dan penggunaan informasi pribadi Anda diatur oleh Kebijakan Privasi kami. Dengan menggunakan KalaStudio, Anda menyetujui pengumpulan dan penggunaan data sesuai dengan Kebijakan Privasi tersebut.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">7. Batasan Tanggung Jawab</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Sejauh diizinkan oleh hukum yang berlaku, KalaStudio tidak akan bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan kami, termasuk namun tidak terbatas pada kerugian laba, data, atau niat baik.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">8. Perubahan Syarat & Ketentuan</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Kami berhak, atas kebijakan kami sendiri, untuk mengubah atau mengganti Syarat dan Ketentuan ini kapan saja. Jika revisi bersifat material, kami akan mencoba memberikan pemberitahuan setidaknya 30 hari sebelum syarat baru berlaku.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">9. Hubungi Kami</h2>
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
