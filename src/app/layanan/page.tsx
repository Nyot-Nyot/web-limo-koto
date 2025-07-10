"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { FaFileAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaInstagram, FaAmbulance, FaShieldAlt, FaClock, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Constants for better maintainability
const CONTAINER_PADDING = "px-4 md:px-6";
const SECTION_SPACING = "mb-8 md:mb-12";
const GRID_GAPS = "gap-6 md:gap-8";

const layananList = [
  {
    id: "domisili",
    title: "Surat Keterangan Domisili",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
    description: "Surat keterangan tempat tinggal untuk keperluan administrasi",
    estimasi: "1-2 hari kerja",
    biaya: "Gratis",
    icon: "🏠",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "sktm",
    title: "Surat Keterangan Tidak Mampu (SKTM)",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
    description: "Surat keterangan untuk bantuan sosial atau beasiswa",
    estimasi: "1-2 hari kerja",
    biaya: "Gratis",
    icon: "📋",
    color: "from-green-500 to-green-600"
  },
  {
    id: "usaha",
    title: "Surat Keterangan Usaha",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW", "Foto tempat usaha"],
    description: "Surat keterangan untuk legalisasi usaha mikro dan kecil",
    estimasi: "2-3 hari kerja",
    biaya: "Gratis",
    icon: "🏪",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "pengantar_nikah",
    title: "Surat Pengantar Nikah",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
    description: "Surat pengantar untuk pendaftaran pernikahan di KUA",
    estimasi: "1 hari kerja",
    biaya: "Gratis",
    icon: "💒",
    color: "from-pink-500 to-pink-600"
  },
  {
    id: "surat_kematian",
    title: "Surat Keterangan Kematian",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW", "Surat keterangan dokter/RS"],
    description: "Surat keterangan untuk administrasi kematian",
    estimasi: "1 hari kerja",
    biaya: "Gratis",
    icon: "📃",
    color: "from-gray-500 to-gray-600"
  },
  {
    id: "surat_cerai",
    title: "Surat Cerai",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
    description: "Surat keterangan untuk administrasi perceraian",
    estimasi: "1-2 hari kerja",
    biaya: "Gratis",
    icon: "📄",
    color: "from-orange-500 to-orange-600"
  },
];

const kontakInfo = {
  pelayanan: [
    { icon: FaPhoneAlt, text: "08123456789092", label: "Telepon", color: "text-blue-400" },
    { icon: FaWhatsapp, text: "08123456789092", label: "WhatsApp", color: "text-green-400" },
    { icon: FaEnvelope, text: "limoKoto69@gmail.com", label: "Email", color: "text-red-400" },
    { icon: FaInstagram, text: "Limo Koto", label: "Instagram", color: "text-pink-400" },
  ],
  emergency: [
    { icon: FaAmbulance, text: "0823456789002", label: "Ambulance", color: "text-red-500" },
    { icon: FaShieldAlt, text: "0823456789002", label: "Keamanan", color: "text-blue-500" },
  ]
};

const jamLayanan = {
  senin_jumat: "08:00 - 12:00 & 13:30 - 16:00",
  sabtu: "08:00 - 11:00",
  minggu: "Tutup"
};


// Memoized Components for better performance
const BackgroundLayer = React.memo(() => (
  <>
    {/* Fixed Background */}
    <div 
      className="fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ zIndex: -2 }}
    />
    
    {/* Overlay */}
    <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }} />
  </>
));

BackgroundLayer.displayName = 'BackgroundLayer';

const PageHeader = React.memo(() => (
  <div className="text-center mb-8 md:mb-12 mt-8">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
      Layanan Publik
    </h1>
    <p className="text-lg md:text-xl text-gray-200 mb-4">
      Kantor Wali Nagari, Nagari Limo Koto
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-6 py-3 shadow-lg">
        <FaClock className="text-yellow-400" />
        <span className="font-medium">Senin-Jumat: {jamLayanan.senin_jumat}</span>
      </div>
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-6 py-3 shadow-lg">
        <FaMapMarkerAlt className="text-red-400" />
        <span className="font-medium">Nagari Limo Koto</span>
      </div>
    </div>
  </div>
));

PageHeader.displayName = 'PageHeader';

const LayananCard = React.memo(({ layanan, onClick }: { layanan: typeof layananList[0]; onClick: () => void }) => (
  <div className="bg-white/10 backdrop-blur-lg text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group border border-white/20">
    <div className={`h-2 bg-gradient-to-r ${layanan.color}`}></div>
    
    <div className="p-6">
      {/* Header with Icon */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-16 h-16 bg-gradient-to-r ${layanan.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
          {layanan.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-1 group-hover:text-blue-300 transition-colors">
            {layanan.title}
          </h3>
          <p className="text-gray-300 text-sm">
            {layanan.description}
          </p>
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
          <FaFileAlt className="text-sm" />
          Persyaratan:
        </h4>
        <ul className="space-y-2">
          {layanan.items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
              <FaCheckCircle className="text-green-400 text-xs flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Service Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-gray-400 mb-1">Estimasi</div>
          <div className="font-semibold text-blue-300">{layanan.estimasi}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-gray-400 mb-1">Biaya</div>
          <div className="font-semibold text-green-300">{layanan.biaya}</div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onClick}
        className={`w-full bg-gradient-to-r ${layanan.color} hover:shadow-lg hover:shadow-blue-500/25 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]`}
      >
        Ajukan Permohonan
      </button>
    </div>
  </div>
));

LayananCard.displayName = 'LayananCard';

const ContactCard = React.memo(({ title, items, type }: { 
  title: string; 
  items: typeof kontakInfo.pelayanan; 
  type: 'primary' | 'emergency' 
}) => (
  <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border ${
    type === 'emergency' ? 'border-red-500/30' : 'border-white/20'
  } hover:shadow-2xl transition-all duration-300`}>
    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
      type === 'emergency' ? 'text-red-400' : 'text-yellow-400'
    }`}>
      {type === 'emergency' ? '🚨' : '📞'} {title}
    </h3>
    <div className="space-y-4">
      {items.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
            <IconComponent className={`text-lg ${item.color}`} />
            <div>
              <div className="text-sm text-gray-400">{item.label}</div>
              <div className="font-medium text-white">{item.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
));

ContactCard.displayName = 'ContactCard';

const OperationalHours = React.memo(() => (
  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
      🕒 Jam Operasional
    </h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
        <span className="text-gray-300">Senin - Jumat</span>
        <span className="font-medium text-green-400 flex items-center gap-2">
          <FaCheckCircle className="text-xs" />
          {jamLayanan.senin_jumat}
        </span>
      </div>
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
        <span className="text-gray-300">Sabtu</span>
        <span className="font-medium text-yellow-400">{jamLayanan.sabtu}</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
        <span className="text-gray-300">Minggu</span>
        <span className="font-medium text-red-400 flex items-center gap-2">
          <FaTimesCircle className="text-xs" />
          {jamLayanan.minggu}
        </span>
      </div>
    </div>
  </div>
));

OperationalHours.displayName = 'OperationalHours';

const ReviewSection = React.memo(() => {
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!review.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setReview('');
    setIsSubmitting(false);
    // You can add actual review submission logic here
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-400">
        💬 Saran & Masukan
      </h3>
      <p className="text-gray-300 mb-4 text-sm">
        Bantu kami meningkatkan pelayanan dengan memberikan saran dan masukan Anda.
      </p>
      <div className="space-y-4">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows={4}
          placeholder="Tulis saran atau masukan Anda di sini..."
        />
        <button
          onClick={handleSubmit}
          disabled={!review.trim() || isSubmitting}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Masukan'}
        </button>
      </div>
    </div>
  );
});

ReviewSection.displayName = 'ReviewSection';
export default function LayananPage() {
  const router = useRouter();

  // Memoize expensive computations
  const gridClasses = useMemo(() => 
    `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${GRID_GAPS}`,
    []
  );

  const contactGridClasses = useMemo(() => 
    `grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ${GRID_GAPS}`,
    []
  );

  return (
    <div className="relative min-h-screen">
      <BackgroundLayer />
      
      <Header />
      
      <div className="min-h-screen">
        <div className={`container mx-auto ${CONTAINER_PADDING} py-16 md:py-20 text-white`}>
          <PageHeader />

          {/* Services Section */}
          <section className={SECTION_SPACING}>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
                Jenis Layanan
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Berbagai layanan administrasi yang tersedia untuk masyarakat Nagari Limo Koto
              </p>
            </div>
            
            <div className={gridClasses}>
              {layananList.map((layanan) => (
                <LayananCard 
                  key={layanan.id} 
                  layanan={layanan} 
                  onClick={() => router.push(`/layanan/${layanan.id}`)} 
                />
              ))}
            </div>
          </section>

          {/* Contact & Information Section */}
          <section className={SECTION_SPACING}>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
                Informasi & Kontak
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Hubungi kami untuk informasi lebih lanjut atau dalam keadaan darurat
              </p>
            </div>
            
            <div className={contactGridClasses}>
              <ContactCard 
                title="Kontak Pelayanan" 
                items={kontakInfo.pelayanan} 
                type="primary"
              />
              <ContactCard 
                title="Kontak Darurat" 
                items={kontakInfo.emergency} 
                type="emergency"
              />
              <OperationalHours />
            </div>
          </section>

          {/* Review Section */}
          <section className={SECTION_SPACING}>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
                Umpan Balik
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Masukan Anda sangat berharga untuk peningkatan kualitas layanan kami
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <ReviewSection />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
