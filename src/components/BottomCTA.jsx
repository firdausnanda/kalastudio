"use client";
export default function BottomCTA() {
  return (
    <section className="py-24 bg-secondary dark:bg-slate-950 overflow-hidden relative transition-colors duration-300">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-1/2 -left-1/4 w-[100%] h-[200%] bg-primary rounded-full blur-[120px] transition-all"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Siap Membawa Usaha Anda Naik Kelas?</h2>
        <p className="text-xl text-slate-300 mb-10">Coba gratis fitur premium kami selama 7 hari. Tanpa kartu kredit, tanpa ribet.</p>
        <button className="bg-primary hover:bg-primary/90 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-primary/40 transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(156,65,61,0.5)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]">
          Mulai Gratis 7 Hari
        </button>
        <p className="mt-6 text-slate-400 text-sm font-medium">Sudah bergabung dengan 100+ UMKM lainnya</p>
      </div>
    </section>
  );
}
