"use client";
import React, { useState, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import { ModalState } from "@/types/layanan";
import { layananList, kontakInfo } from "@/data/layanan";

// Lazy load components for better performance
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/components/layanan/Modal"), { ssr: false });
const LayananCard = dynamic(() => import("@/components/layanan/LayananCard"));
const ContactCard = dynamic(() => import("@/components/layanan/ContactCard"));
const PageHeader = dynamic(() => import("@/components/layanan/PageHeader"));
const BackgroundLayer = dynamic(() => import("@/components/layanan/BackgroundLayer"));
const OperationalHours = dynamic(() => import("@/components/layanan/OperationalHours"));
const ReviewSection = dynamic(() => import("@/components/layanan/ReviewSection"));
const DomisiliForm = dynamic(() => import("@/components/layanan/DomisiliForm"), { ssr: false });
const SKTMForm = dynamic(() => import("@/components/layanan/SKTMForm"), { ssr: false });
const SKUForm = dynamic(() => import("@/components/layanan/SKUForm"), { ssr: false });
const StepsForm = dynamic(() => import("@/components/layanan/StepsForm"), { ssr: false });

// Constants
const LAYOUT_CONSTANTS = {
  CONTAINER_PADDING: "px-4 md:px-6",
  SECTION_SPACING: "mb-8 md:mb-12",
  GRID_GAPS: "gap-6 md:gap-8",
} as const;

export default function LayananPage() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: '',
    title: ''
  });

  const openModal = useCallback((layanan: typeof layananList[0]) => {
    setModalState({
      isOpen: true,
      type: layanan.id,
      title: `Pengajuan ${layanan.title}`
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      type: '',
      title: ''
    });
  }, []);

  const renderModalContent = useCallback(() => {
    switch (modalState.type) {
      case 'domisili':
        return <DomisiliForm onClose={closeModal} />;
      case 'sktm':
        return <SKTMForm onClose={closeModal} />;
      case 'usaha':
        return <SKUForm onClose={closeModal} />;
      case 'pengantar_nikah':
      case 'surat_kematian':
      case 'surat_cerai':
        return <StepsForm serviceTitle={layananList.find(l => l.id === modalState.type)?.title || ''} onClose={closeModal} />;
      default:
        return null;
    }
  }, [modalState.type, closeModal]);

  // Memoize expensive computations
  const gridClasses = useMemo(() => 
    `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${LAYOUT_CONSTANTS.GRID_GAPS}`,
    []
  );

  const contactGridClasses = useMemo(() => 
    `grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ${LAYOUT_CONSTANTS.GRID_GAPS}`,
    []
  );

  return (
    <div className="relative min-h-screen">
      <BackgroundLayer />
      <Header />
      
      <div className="min-h-screen">
        <div className={`container mx-auto ${LAYOUT_CONSTANTS.CONTAINER_PADDING} py-16 md:py-20 text-white`}>
          <PageHeader />

          {/* Services Section */}
          <section className={LAYOUT_CONSTANTS.SECTION_SPACING}>
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
                  onClick={() => openModal(layanan)} 
                />
              ))}
            </div>
          </section>

          {/* Contact & Information Section */}
          <section className={LAYOUT_CONSTANTS.SECTION_SPACING}>
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
          <section className={LAYOUT_CONSTANTS.SECTION_SPACING}>
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

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}
