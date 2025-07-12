import React from "react";
import { aktaList, layananList } from "@/data/layanan";

interface StepsFormProps {
  serviceTitle: string;
  onClose: () => void;
}

export default function StepsForm({ serviceTitle, onClose }: StepsFormProps) {
  // Check if this is an administrative document (akta, KK, e-KTP, or surat pindah)
  const isAdministrativeDoc = aktaList.some(
    (akta) => akta.title === serviceTitle
  );

  // Find service in appropriate list
  const service = isAdministrativeDoc
    ? aktaList.find((akta) => akta.title === serviceTitle)
    : layananList.find((layanan) => layanan.title === serviceTitle);

  if (!service) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Layanan tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {isAdministrativeDoc ? "Persyaratan" : "Langkah-langkah"}
        </h3>
        <p className="text-gray-600 text-sm">
          {isAdministrativeDoc
            ? `Berikut adalah persyaratan untuk pengurusan ${serviceTitle}:`
            : `Ikuti langkah-langkah berikut untuk mengajukan ${serviceTitle}:`}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {service.items.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-blue-800">
            Informasi Tambahan
          </span>
        </div>
        <div className="text-sm text-blue-700 space-y-1">
          <p>
            <strong>Estimasi:</strong> {service.estimasi}
          </p>
          <p>
            <strong>Biaya:</strong> {service.biaya}
          </p>
        </div>
      </div>

      {/* Only show submit button for non-administrative documents */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Tutup
        </button>

        {!isAdministrativeDoc && (
          <button
            onClick={() => {
              // Handle form submission logic here
              alert(
                "Permohonan akan diproses. Silakan datang ke kantor dengan membawa persyaratan yang diperlukan."
              );
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ajukan Permohonan
          </button>
        )}
      </div>
    </div>
  );
}
