'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomCTA from '@/components/BottomCTA';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/packages');
      if (!response.ok) {
        throw new Error('Gagal mengambil data paket.');
      }
      const data = await response.json();
      const packages = data.data || [];

      // Map API data to UI structure
      const mappedPlans = packages.map(pkg => {
        const monthlyPrice = pkg.prices.find(p => p.billing_cycle === 'monthly')?.price || 0;
        const annualPrice = pkg.prices.find(p => p.billing_cycle === 'annually')?.price || 0;

        let features = [];
        try {
          features = typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features;
        } catch (e) {
          console.error('Error parsing features:', e);
        }

        return {
          name: pkg.name,
          desc: pkg.description,
          monthlyPrice: monthlyPrice,
          annualPrice: annualPrice,
          features: features,
          cta: pkg.name === 'Professional' ? 'Hubungi Sales' : 'Coba Sekarang',
          popular: pkg.name === 'Business',
          isCustomPrice: pkg.name === 'Professional'
        };
      });

      let professionalPlan = {
        annualPrice: 'Custom',
        monthlyPrice: 'Custom',
        cta: 'Hubungi Sales',
        desc: 'Solusi lengkap untuk korporasi dengan kebutuhan integrasi.',
        features: [
          'Custom Dashboard & Branding',
          'Integrasi API',
          'Dedicated Account Manager',
          'Audit Trail Keuangan',
          'SLA 99.9% Uptime',
        ],
        name: 'Professional',
        popular: false,
        isCustomPrice: true
      };

      setPlans([...mappedPlans, professionalPlan]);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "Apakah saya bisa membatalkan langganan kapan saja?",
      a: "Ya, Anda dapat membatalkan langganan Anda kapan saja tanpa biaya tambahan. Akses Anda akan tetap aktif hingga masa langganan berakhir."
    },
    {
      q: "Apakah data saya aman di KalaStudio?",
      a: "Keamanan adalah prioritas kami. Seluruh data dienkripsi dengan standar bank dan disimpan di server dengan keamanan tinggi."
    },
    {
      q: "Apakah ada biaya tersembunyi?",
      a: "Tidak ada. Harga yang Anda lihat adalah harga yang Anda bayar. Tidak ada biaya aktivasi atau biaya pemeliharaan tambahan."
    },
    {
      q: "Dapatkah saya upgrade atau downgrade paket?",
      a: "Tentu! Anda bisa mengubah paket langganan Anda kapan saja melalui dashboard akun Anda."
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="bg-white text-slate-900 font-display transition-colors duration-300 dark:bg-slate-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Pricing Header */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800/30 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              Investasi Terbaik untuk <span className="text-primary">Bisnis Anda</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-12">
              Pilih paket yang sesuai dengan skala bisnis Anda. Mulai dengan gratis dan tumbuh bersama KalaStudio.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm font-bold ${!isAnnual ? 'text-primary' : 'text-slate-500'}`}>Bulanan</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-8 bg-slate-200 dark:bg-slate-700 rounded-full relative p-1 transition-colors group"
              >
                <div className={`w-6 h-6 bg-primary rounded-full shadow-md transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${isAnnual ? 'text-primary' : 'text-slate-500'}`}>Tahunan</span>
                <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Hemat 30%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-24 -mt-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-[40px] border-2 border-slate-100 dark:border-slate-800 shadow-xl">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-bold">Memuat data paket...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-[40px] border-2 border-red-100 dark:border-red-900/30 shadow-xl text-center">
                <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
                <p className="text-slate-900 dark:text-white font-black text-xl mb-2">Ups! Terjadi Kesalahan</p>
                <p className="text-slate-500 mb-6">{error}</p>
                <button
                  onClick={fetchPlans}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all"
                >
                  Coba Lagi
                </button>
              </div>
            ) : plans.length == 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-[40px] border-2 border-slate-100 dark:border-slate-800 shadow-xl">
                <p className="text-slate-500 font-bold">Tidak ada paket tersedia saat ini.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, idx) => (
                  <div
                    key={idx}
                    className={`dark:text-white bg-white dark:bg-slate-900 p-10 rounded-[40px] border-2 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl flex flex-col ${plan.popular
                      ? 'border-primary shadow-2xl scale-105 relative dark:shadow-primary/10'
                      : 'border-slate-100 dark:border-slate-800 shadow-xl'
                      }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-primary/30">
                        Paling Populer
                      </div>
                    )}

                    <div className="mb-8">
                      <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{plan.desc}</p>
                    </div>

                    <div className="mb-8">
                      {plan.isCustomPrice ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl md:text-5xl font-black">Custom</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl md:text-5xl font-black">{formatPrice(isAnnual ? plan.annualPrice : plan.monthlyPrice)}</span>
                            <span className="text-slate-500 font-bold">/bln</span>
                          </div>
                          {isAnnual && (
                            <p className="text-xs text-slate-400 mt-2 font-medium">Ditagih tahunan: {formatPrice(plan.annualPrice * 12)}</p>
                          )}
                        </>
                      )}
                    </div>

                    <ul className="space-y-4 mb-10 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                          <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 ${plan.popular
                      ? 'bg-primary text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:bg-primary/90'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}>
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4 dark:text-white">Pertanyaan Umum</h2>
              <p className="text-slate-500">Semua yang perlu Anda ketahui tentang pembayaran dan paket.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h4 className="dark:text-white font-bold text-lg mb-3 flex items-start gap-3">
                    <span className="text-primary mt-1 font-black">Q.</span>
                    {faq.q}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-8 border-l-2 border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BottomCTA />
      </main>

      <Footer />
    </div>
  );
}
