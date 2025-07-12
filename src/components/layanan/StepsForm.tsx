import React, { memo, useCallback } from 'react';
import { layananList } from '@/data/layanan';

interface StepsFormProps {
  serviceTitle: string;
  onClose: () => void;
}

const StepsForm = memo<StepsFormProps>(({ serviceTitle, onClose }) => {
  const service = layananList.find(s => s.title === serviceTitle);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert(`Pengajuan ${serviceTitle} berhasil dikirim!`);
    onClose();
  }, [serviceTitle, onClose]);

  if (!service) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">{service.icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
        <p className="text-gray-600">{service.description}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Persyaratan:</h4>
        <ul className="space-y-1">
          {service.items.map((item, idx) => (
            <li key={idx} className="text-blue-800 text-sm flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <span className="font-semibold text-green-900">Estimasi:</span>
          <p className="text-green-800">{service.estimasi}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <span className="font-semibold text-purple-900">Biaya:</span>
          <p className="text-purple-800">{service.biaya}</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-2">Langkah Pengajuan:</h4>
        <ol className="space-y-2 text-yellow-800 text-sm">
          <li className="flex gap-2">
            <span className="font-bold">1.</span>
            <span>Siapkan semua berkas persyaratan</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">2.</span>
            <span>Datang ke kantor Wali Nagari pada jam kerja</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">3.</span>
            <span>Isi formulir pengajuan</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">4.</span>
            <span>Serahkan berkas kepada petugas</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">5.</span>
            <span>Tunggu proses verifikasi dan penerbitan surat</span>
          </li>
        </ol>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          Tutup
        </button>
      </div>
    </div>
  );
});

StepsForm.displayName = 'StepsForm';

export default StepsForm;
