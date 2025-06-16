import React from 'react';
import { useLocation } from 'wouter';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-emerald-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sayfa Bulunamadı</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </button>
          <button
            onClick={() => setLocation('/explore')}
            className="flex items-center space-x-2 border border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>İçerikleri Keşfet</span>
          </button>
        </div>
      </div>
    </div>
  );
}