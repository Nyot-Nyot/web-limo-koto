'use client';

import { memo } from 'react';

const VisiMisi = memo(() => {
  return (
    <div className="flex items-center justify-center px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Visi & <span className="text-yellow-400">Misi</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Komitmen Nagari Lima Koto dalam membangun masa depan yang lebih baik
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Visi */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">VISI</h3>
            </div>
            <p className="text-white text-center text-lg leading-relaxed">
              “Mewujudkan tata kelola pemerintahan nagari yang baik sehingga terciptanya nagari limo koto yang religius, sejahtera, adil, sdm unggul serta memegang teguh adat istiadat“
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">MISI</h3>
            </div>
            <div className="space-y-4">
              {[
                'Menciptakan Pemerintahan Nagari yang Berkualitas, Transparan, Akuntabel serta Memberikan Pelayanan yang Prima.',
                'Mendukung dan Menyelaraskan Program-program yang dilaksanakan oleh Pemerintah Daerah maupun pusat serta melanjutkan program yang dibuat oleh Pemerintah Nagari sebelumnya.',
                'Mendorong terciptanya Masyarakat yang Religius serta memegang Teguh Adat Istiadat.',
                'Mendorong dan Meningkatkan Perekonomian Masyarakat Nagari melalui Sumber Daya Alam dan Sumber Daya Manusia yang unggul dalam menggali Potensi Nagari.',
                'Pendataan Aset Nagari dan Pengelolaannya secara Profesional.',
                'Berkolaborasi dan Berkoordinasi dengan seluruh unsur yang ada seperti KAN, BPN, Bundo Kanduang, Alim Ulama, Tokoh Masyarakat, Para Perantau serta Karang Taruna.',
                'Mewujudkan Nagari Baru dengan cara Musyawarah Mufakat dengan Pemangku kepentingan demi tercapainya pelayanan yang optimal.'
              ].map((misi, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-white leading-relaxed">{misi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

VisiMisi.displayName = 'VisiMisi';

export default VisiMisi;
