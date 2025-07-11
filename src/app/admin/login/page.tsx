'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import { loginWithEmail, resetPassword } from '@/lib/auth';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth === 'true') {
        router.push('/admin');
      }
    };
    
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Use Firebase authentication
      await loginWithEmail(credentials.email, credentials.password);
      
      // Set admin session
      localStorage.setItem('adminAuth', 'true');
      
      // Redirect to admin dashboard
      router.push('/admin');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan saat login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email) {
      setError('Masukkan email Anda untuk reset password');
      return;
    }
    
    setIsLoading(true);
    try {
      // Call the reset password function (you'll need to implement this)
      await resetPassword(credentials.email);
      setError('');
      alert('Link reset password telah dikirim ke email Anda');
      setForgotPassword(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan saat mengirim reset password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative">
      {/* Tombol Kembali ke Beranda - Positioned at top left */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          <FaArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </div>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/images/icon_sijunjung.png"
            alt="Logo"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-gray-400">
            Masuk ke panel admin Nagari Lima Koto
          </p>
        </div>

        {!forgotPassword ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-yellow-500 hover:text-yellow-400"
                onClick={() => setForgotPassword(true)}
              >
                Lupa password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
            <div>
              <h3 className="text-white text-lg font-medium">Reset Password</h3>
              <p className="text-gray-400 text-sm mt-1">
                Masukkan email Anda untuk menerima link reset password.
              </p>
            </div>
            
            <div>
              <label htmlFor="reset-email" className="sr-only">Email</label>
              <input
                id="reset-email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                className="group relative flex-1 flex justify-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => setForgotPassword(false)}
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
              >
                {isLoading ? 'Memproses...' : 'Kirim'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}