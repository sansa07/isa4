import React from 'react';
import { useLocation } from 'wouter';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

export default function VerifyEmail() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100 p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">E-posta Doğrulama</h1>
            <p className="text-gray-600">
              E-posta adresinize doğrulama bağlantısı gönderildi. 
              Lütfen e-postanızı kontrol edin ve bağlantıya tıklayın.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-emerald-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">E-posta gönderildi</span>
            </div>

            <button
              onClick={() => setLocation('/auth')}
              className="flex items-center justify-center space-x-2 w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Giriş Sayfasına Dön</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}