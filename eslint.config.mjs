import js from '@eslint/js';
import next from 'eslint-config-next';

export default [
  js,
  next,
  {
    rules: {
      // Contoh: nonaktifkan rule yang error di Vercel
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-useless-escape': 'off',
      // Aktifkan plugin react-hooks jika perlu
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
