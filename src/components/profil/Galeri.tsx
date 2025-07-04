'use client';

import { useState, useRef, useEffect } from 'react';

export default function Galeri() {
  const [activeCategory, setActiveCategory] = useState('makanan');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [imageTransition, setImageTransition] = useState(false);
  
  const itemWidth = 320; // 18rem (288px) + gap (32px) = 320px per column

  const categories = [
    { id: 'makanan', name: 'Makanan Tradisional' },
    { id: 'budaya', name: 'Budaya & Adat' },
    { id: 'alam', name: 'Keindahan Alam' },
    { id: 'arsitektur', name: 'Arsitektur' }
  ];

  const galleries = {
    makanan: [
      { 
        id: 1, 
        title: 'Rendang Dagiang', 
        image: 'https://placehold.co/400x300',
        description: 'Rendang dagiang adalah masakan tradisional khas Minangkabau yang terbuat dari daging sapi yang dimasak dengan santan dan rempah-rempah pilihan. Proses memasaknya membutuhkan waktu yang lama hingga bumbu meresap sempurna dan daging menjadi empuk.'
      },
      { 
        id: 2, 
        title: 'Gulai Ikan Bilih', 
        image: 'https://placehold.co/400x300',
        description: 'Gulai ikan bilih merupakan hidangan tradisional yang menggunakan ikan bilih segar dari Danau Singkarak. Dimasak dengan kuah santan yang kaya rempah dan memberikan cita rasa yang autentik khas Sumatera Barat.'
      },
      { 
        id: 3, 
        title: 'Dendeng Batokok', 
        image: 'https://placehold.co/400x300',
        description: 'Dendeng batokok adalah daging sapi yang dipukul-pukul hingga tipis kemudian dijemur dan digoreng. Makanan ini memiliki tekstur yang unik dan rasa yang gurih, cocok sebagai lauk atau camilan.'
      },
      { 
        id: 4, 
        title: 'Kalio Ayam', 
        image: 'https://placehold.co/400x300',
        description: 'Kalio ayam adalah masakan ayam dengan bumbu rendang namun dengan kuah yang lebih banyak. Cita rasanya yang kaya dan pedas menjadikannya salah satu makanan favorit masyarakat Minang.'
      },
      { 
        id: 5, 
        title: 'Sate Padang', 
        image: 'https://placehold.co/400x300',
        description: 'Sate Padang memiliki kuah kental berwarna kuning dengan bumbu yang khas. Daging yang digunakan biasanya daging sapi atau kambing yang dipotong kecil dan ditusuk dengan bambu.'
      },
      { 
        id: 6, 
        title: 'Gulai Tunjang', 
        image: 'https://placehold.co/400x300',
        description: 'Gulai tunjang adalah masakan berkuah santan yang menggunakan kikil atau tulang rawan sapi. Teksturnya yang kenyal dan kuah yang gurih membuatnya menjadi favorit.'
      },
      { 
        id: 7, 
        title: 'Ayam Pop', 
        image: 'https://placehold.co/400x300',
        description: 'Ayam Pop adalah ayam goreng khas Padang yang dimasak dengan cara direbus terlebih dahulu dengan bumbu rempah, kemudian digoreng hingga kulitnya menjadi putih kekuningan.'
      },
      { 
        id: 8, 
        title: 'Gulai Kambing', 
        image: 'https://placehold.co/400x300',
        description: 'Gulai kambing dengan kuah santan yang kental dan bumbu yang meresap sempurna. Daging kambing yang empuk dipadukan dengan rempah-rempah tradisional.'
      },
      { 
        id: 9, 
        title: 'Pical Ayam', 
        image: 'https://placehold.co/400x300',
        description: 'Pical ayam adalah ayam yang dimasak dengan bumbu khas Minang, digoreng dengan teknik khusus sehingga menghasilkan rasa yang unik dan menggugah selera.'
      },
      { 
        id: 10, 
        title: 'Nasi Kapau', 
        image: 'https://placehold.co/400x300',
        description: 'Nasi Kapau adalah hidangan nasi dengan berbagai lauk pauk khas Minang yang disajikan dalam piring. Biasanya terdiri dari nasi putih dengan aneka gulai dan lauk.'
      },
      { 
        id: 11, 
        title: 'Lado Tanak', 
        image: 'https://placehold.co/400x300',
        description: 'Lado tanak adalah sambal khas Minang yang dimasak dengan santan dan ikan teri. Rasanya pedas dan gurih, cocok sebagai pelengkap berbagai masakan.'
      },
      { 
        id: 12, 
        title: 'Gado-gado Padang', 
        image: 'https://placehold.co/400x300',
        description: 'Gado-gado Padang berbeda dengan gado-gado Betawi. Sayuran segar dicampur dengan bumbu kacang yang kental dan pedas khas Minang.'
      }
    ],
    budaya: [
      { 
        id: 1, 
        title: 'Tari Piring', 
        image: 'https://placehold.co/400x300',
        description: 'Tari Piring adalah tarian tradisional Minangkabau yang menggunakan piring sebagai properti utama. Tarian ini menggambarkan kegembiraan masyarakat dalam merayakan panen yang melimpah dan kehidupan yang sejahtera.'
      },
      { 
        id: 2, 
        title: 'Randai', 
        image: 'https://placehold.co/400x300',
        description: 'Randai adalah seni pertunjukan tradisional Minangkabau yang memadukan unsur teater, musik, tari, dan silat. Pertunjukan ini biasanya menceritakan kisah-kisah heroik atau pesan moral yang disampaikan secara interaktif.'
      },
      { 
        id: 3, 
        title: 'Saluang', 
        image: 'https://placehold.co/400x300',
        description: 'Saluang adalah alat musik tiup tradisional yang terbuat dari bambu. Suara saluang yang merdu sering mengiringi lagu-lagu daerah Minang dan menciptakan suasana yang romantis dan menyentuh hati.'
      },
      { 
        id: 4, 
        title: 'Batagak Penghulu', 
        image: 'https://placehold.co/400x300',
        description: 'Batagak Penghulu adalah upacara adat pengangkatan penghulu atau pemimpin tradisional dalam masyarakat Minangkabau. Upacara ini penuh dengan ritual dan simbol yang mencerminkan nilai-nilai adat istiadat.'
      },
      { 
        id: 5, 
        title: 'Tari Indang', 
        image: 'https://placehold.co/400x300',
        description: 'Tari Indang adalah tarian yang diiringi dengan rebana dan syair-syair Islami. Tarian ini biasanya dipentaskan pada acara-acara keagamaan dan perayaan tradisional.'
      },
      { 
        id: 6, 
        title: 'Silek Minang', 
        image: 'https://placehold.co/400x300',
        description: 'Silek Minang adalah seni bela diri tradisional Minangkabau yang meniru gerakan-gerakan binatang. Setiap gerakan memiliki filosofi dan makna yang mendalam.'
      },
      { 
        id: 7, 
        title: 'Talempong', 
        image: 'https://placehold.co/400x300',
        description: 'Talempong adalah alat musik tradisional Minang yang terbuat dari perunggu. Dimainkan secara berkelompok dan menghasilkan harmoni yang indah.'
      },
      { 
        id: 8, 
        title: 'Tari Pasambahan', 
        image: 'https://placehold.co/400x300',
        description: 'Tari Pasambahan adalah tarian penyambutan tamu yang sakral dalam budaya Minang. Tarian ini menunjukkan rasa hormat dan penghargaan kepada tamu yang datang.'
      },
      { 
        id: 9, 
        title: 'Kaba Minang', 
        image: 'https://placehold.co/400x300',
        description: 'Kaba adalah cerita rakyat Minang yang dituturkan secara lisan dari generasi ke generasi. Berisi nilai-nilai moral dan sejarah masyarakat Minangkabau.'
      },
      { 
        id: 10, 
        title: 'Upacara Manyambah', 
        image: 'https://placehold.co/400x300',
        description: 'Upacara Manyambah adalah ritual adat untuk menyambut tamu penting atau dalam acara-acara besar. Dilakukan dengan tata cara yang sangat sopan dan penuh makna.'
      }
    ],
    alam: [
      { 
        id: 1, 
        title: 'Panorama Bukit', 
        image: 'https://placehold.co/400x300',
        description: 'Pemandangan bukit-bukit hijau yang membentang luas menawarkan panorama alam yang memukau. Udara sejuk dan pemandangan yang indah menjadikan tempat ini ideal untuk refreshing dan menikmati keindahan alam.'
      },
      { 
        id: 2, 
        title: 'Sungai Batang Hari', 
        image: 'https://placehold.co/400x300',
        description: 'Sungai Batang Hari merupakan sumber kehidupan bagi masyarakat sekitar. Airnya yang jernih dan aliran yang tenang menciptakan ekosistem yang seimbang dan mendukung berbagai aktivitas masyarakat.'
      },
      { 
        id: 3, 
        title: 'Sawah Terasering', 
        image: 'https://placehold.co/400x300',
        description: 'Sawah terasering menunjukkan kearifan lokal dalam pengelolaan lahan pertanian. Struktur bertingkat ini tidak hanya efisien untuk bercocok tanam, tetapi juga menciptakan pemandangan yang sangat indah.'
      },
      { 
        id: 4, 
        title: 'Air Terjun Lembah', 
        image: 'https://placehold.co/400x300',
        description: 'Air terjun yang tersembunyi di lembah hijau menawarkan kesegaran alami. Suara gemericik air dan udara sejuk menjadikannya tempat yang sempurna untuk melepas penat.'
      },
      { 
        id: 5, 
        title: 'Hutan Bambu', 
        image: 'https://placehold.co/400x300',
        description: 'Hutan bambu yang rindang memberikan suasana tenang dan damai. Cahaya matahari yang menyaring melalui rumpun bambu menciptakan pemandangan yang eksotis.'
      },
      { 
        id: 6, 
        title: 'Ladang Teh', 
        image: 'https://placehold.co/400x300',
        description: 'Perkebunan teh yang hijau membentang di lereng bukit. Pemandangan ini menawarkan keindahan alam yang menyejukkan mata dan jiwa.'
      },
      { 
        id: 7, 
        title: 'Danau Kecil', 
        image: 'https://placehold.co/400x300',
        description: 'Danau kecil yang tenang dikelilingi pepohonan hijau. Permukaan air yang jernih memantulkan langit biru dan awan putih.'
      },
      { 
        id: 8, 
        title: 'Kebun Kopi', 
        image: 'https://placehold.co/400x300',
        description: 'Perkebunan kopi lokal yang dikelola secara tradisional. Aroma kopi yang harum berpadu dengan pemandangan hijau yang menenangkan.'
      },
      { 
        id: 9, 
        title: 'Lembah Hijau', 
        image: 'https://placehold.co/400x300',
        description: 'Lembah yang subur dengan vegetasi yang beragam. Tempat ini menjadi habitat berbagai flora dan fauna lokal yang dilindungi.'
      }
    ],
    arsitektur: [
      { 
        id: 1, 
        title: 'Rumah Gadang', 
        image: 'https://placehold.co/400x300',
        description: 'Rumah Gadang adalah rumah adat Minangkabau yang memiliki atap berbentuk tanduk kerbau. Arsitektur unik ini mencerminkan filosofi dan budaya masyarakat Minang yang kaya akan nilai-nilai tradisional.'
      },
      { 
        id: 2, 
        title: 'Surau Tua', 
        image: 'https://placehold.co/400x300',
        description: 'Surau tua merupakan tempat ibadah dan pusat pembelajaran agama Islam yang telah berdiri sejak lama. Bangunan ini menjadi saksi sejarah perkembangan Islam di Nagari Lima Koto.'
      },
      { 
        id: 3, 
        title: 'Balai Adat', 
        image: 'https://placehold.co/400x300',
        description: 'Balai Adat adalah tempat berkumpul dan bermusyawarah masyarakat untuk membahas berbagai urusan adat dan kemasyarakatan. Bangunan ini memiliki nilai historis dan budaya yang tinggi.'
      },
      { 
        id: 4, 
        title: 'Rangkiang', 
        image: 'https://placehold.co/400x300',
        description: 'Rangkiang adalah lumbung padi tradisional Minang yang dibangun di atas tiang kayu. Struktur ini dirancang untuk melindungi padi dari hama dan kelembaban.'
      },
      { 
        id: 5, 
        title: 'Rumah Bagonjong', 
        image: 'https://placehold.co/400x300',
        description: 'Rumah Bagonjong memiliki atap yang menjulang tinggi dengan bentuk yang khas. Rumah ini adalah variasi dari Rumah Gadang dengan fungsi dan makna yang berbeda.'
      },
      { 
        id: 6, 
        title: 'Jembatan Kayu', 
        image: 'https://placehold.co/400x300',
        description: 'Jembatan kayu tradisional yang menghubungkan dua sisi sungai. Konstruksi sederhana namun kuat, menunjukkan kearifan lokal dalam arsitektur.'
      },
      { 
        id: 7, 
        title: 'Gapura Nagari', 
        image: 'https://placehold.co/400x300',
        description: 'Gapura sebagai pintu masuk nagari dengan ornamen khas Minang. Desainnya mencerminkan identitas dan kebanggaan masyarakat setempat.'
      },
      { 
        id: 8, 
        title: 'Masjid Tradisional', 
        image: 'https://placehold.co/400x300',
        description: 'Masjid dengan arsitektur Minang yang khas, memadukan elemen Islam dengan budaya lokal. Bangunan ini menjadi pusat kegiatan keagamaan masyarakat.'
      }
    ]
  };

  // Reset selected image when category changes
  useEffect(() => {
    setSelectedImage(null);
    // Reset scroll position
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);

  // Get current gallery
  const currentGallery = galleries[activeCategory as keyof typeof galleries];
  const selectedItem = selectedImage !== null ? currentGallery[selectedImage] : null;

  // Handle image click with animation
  const handleImageClick = (index: number) => {
    if (selectedImage === index) return;
    
    setImageTransition(true);
    setTimeout(() => {
      setSelectedImage(index);
      setTimeout(() => {
        setImageTransition(false);
      }, 50);
    }, 200);
  };

  // Handle scroll navigation with smooth transition - one column at a time
  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const itemWidth = 320; // One column width including gap
      
      scrollContainerRef.current.scrollTo({
        left: currentScroll - itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const itemWidth = 320; // One column width including gap
      
      scrollContainerRef.current.scrollTo({
        left: currentScroll + itemWidth,
        behavior: 'smooth'
      });
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImageClick(index);
    }
  };

  // Handle image loading
  const handleImageLoad = (imageId: number) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  const handleImageLoadStart = (imageId: number) => {
    setLoadingImages(prev => new Set(prev).add(imageId));
  };

  // Touch/Mouse drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Galeri <span className="text-yellow-400">Nagari</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Koleksi foto yang menampilkan kekayaan budaya, kuliner, dan keindahan alam Nagari Lima Koto
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
                activeCategory === category.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Main Gallery Layout */}
        <div className={`grid gap-8 lg:gap-12 transition-all duration-500 ${
          selectedImage !== null 
            ? 'grid-cols-1 lg:grid-cols-12' 
            : 'grid-cols-1'
        }`}>
          {/* Left Sidebar - Description - Only show when image is selected */}
          {selectedImage !== null && (
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/10 sticky top-8">
                <div className={`image-transition ${imageTransition ? 'transitioning' : ''} ${selectedImage !== null ? 'content-enter' : ''}`}>
                  {/* Image Preview */}
                  <div className="mb-10">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 relative shadow-lg">
                      <img
                        src={selectedItem?.image}
                        alt={selectedItem?.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="mb-8">
                    <span className="text-4xl lg:text-5xl font-bold text-yellow-400">
                      {String(selectedImage + 1).padStart(2, '0')}
                    </span>
                    <span className="text-gray-400 ml-4 text-lg">
                      {categories.find(cat => cat.id === activeCategory)?.name}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                    {selectedItem?.title}
                  </h3>
                  
                  <div className="w-24 h-1 bg-yellow-400 mb-10"></div>
                  
                  <p className="text-gray-300 leading-relaxed text-xl lg:text-2xl">
                    {selectedItem?.description}
                  </p>
                  
                  {/* Navigation Info */}
                  <div className="mt-12 pt-10 border-t border-white/10">
                    <div className="flex items-center justify-between text-lg text-gray-400">
                      <span className="font-medium">{selectedImage + 1} dari {currentGallery.length}</span>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                          disabled={selectedImage === 0}
                          className="p-4 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setSelectedImage(Math.min(currentGallery.length - 1, selectedImage + 1))}
                          disabled={selectedImage === currentGallery.length - 1}
                          className="p-4 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Image Gallery */}
          <div className={`order-1 lg:order-2 ${
            selectedImage !== null ? 'lg:col-span-6' : 'col-span-1'
          }`}>
            {/* Album Section Title */}
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Album Kegiatan {categories.find(cat => cat.id === activeCategory)?.name}
              </h3>
              <div className="w-20 h-1 bg-yellow-400 mb-4"></div>
            </div>

            {/* Gallery Horizontal Scroll Layout - 2 rows */}
            <div className="relative">
              {/* Scrollable Gallery Container */}
              <div 
                ref={scrollContainerRef}
                className="gallery-container"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {currentGallery.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => handleImageClick(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${item.title}`}
                    className={`gallery-item cursor-pointer transition-all duration-300 group ${
                      selectedImage === index 
                        ? 'ring-2 ring-yellow-400 scale-[1.05] ring-offset-4 ring-offset-transparent active' 
                        : 'hover:scale-[1.03] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 relative shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {/* Loading skeleton */}
                      {loadingImages.has(item.id) && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-gray-300 border-t-yellow-400 rounded-full animate-spin"></div>
                        </div>
                      )}
                      
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onLoadStart={() => handleImageLoadStart(item.id)}
                        onLoad={() => handleImageLoad(item.id)}
                        onError={() => handleImageLoad(item.id)}
                      />
                      
                      {/* Overlay with title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-3 w-full">
                          <h4 className="text-white text-sm font-medium">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      {/* Active indicator */}
                      {selectedImage === index && (
                        <div className="absolute top-3 right-3 w-3 h-3 bg-yellow-400 rounded-full active-indicator"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls - Below the grid */}
              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  onClick={scrollToPrev}
                  className="nav-btn w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                  aria-label="Previous images"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={scrollToNext}
                  className="nav-btn w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                  aria-label="Next images"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation hint */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-base">
                {selectedImage !== null 
                  ? `Gambar ${selectedImage + 1} dari ${currentGallery.length} dipilih` 
                  : 'Klik gambar untuk melihat detail dan deskripsi lengkap'
                } • Total {currentGallery.length} gambar
              </p>
              <p className="text-gray-500 text-sm mt-2">
                🎯 Gunakan tombol navigasi atau drag untuk melihat gambar lainnya
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Album Kegiatan <span className="text-yellow-400">Nagari Lima Koto</span>
            </h3>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Dokumentasi lengkap berbagai kegiatan dan kekayaan yang dimiliki oleh Nagari Lima Koto
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">Pemerintahan</div>
                <div className="text-white text-sm mt-1">Album Kegiatan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">Sosial & Budaya</div>
                <div className="text-white text-sm mt-1">Album Kegiatan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">Pembangunan</div>
                <div className="text-white text-sm mt-1">Infrastruktur</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">Wisata</div>
                <div className="text-white text-sm mt-1">& Kuliner</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Gallery grid flow styling with smooth scrolling */
        .gallery-container {
          display: grid;
          grid-template-rows: repeat(2, 1fr);
          grid-auto-flow: column;
          grid-auto-columns: 18rem; /* Fixed width for consistent spacing */
          gap: 2rem; /* Increased gap for more breathing room */
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 1rem 0;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
        }
        
        .gallery-container::-webkit-scrollbar {
          display: none;
        }
        
        /* Ensure proper spacing and prevent overlap */
        .gallery-item {
          width: 18rem; /* Match grid-auto-columns */
          flex-shrink: 0;
          scroll-snap-align: start;
        }
        
        /* Enhanced navigation button styling */
        .nav-btn {
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .nav-btn:active {
          transform: scale(0.95);
        }
        
        /* Enhanced slide transition animations */
        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes slideOutToLeft {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-30px) scale(0.95);
          }
        }
        
        /* Smooth content transition */
        .content-enter {
          animation: slideInFromRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .content-exit {
          animation: slideOutToLeft 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Image transition effects */
        .image-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .image-transition.transitioning {
          opacity: 0;
          transform: translateX(20px) scale(0.98);
        }
        
        /* Gallery item active state enhancement */
        .gallery-item.active {
          box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.6);
          transform: scale(1.05);
        }
        
        /* Pulse animation for active indicator */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        .active-indicator {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}
