import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Bell, 
  Settings, 
  Sunrise, 
  Sun, 
  Sunset, 
  Moon,
  Star,
  Volume2,
  VolumeX,
  Smartphone
} from 'lucide-react';

interface PrayerTime {
  name: string;
  time: string;
  icon: React.ComponentType<any>;
  isNext: boolean;
  isPassed: boolean;
}

interface PrayerSettings {
  notifications: boolean;
  sound: boolean;
  reminderMinutes: number;
  method: string;
}

const cities = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Diyarbakır'
];

const calculationMethods = [
  { id: 'turkey', name: 'Türkiye Diyanet İşleri' },
  { id: 'mwl', name: 'Müslüman Dünya Birliği' },
  { id: 'isna', name: 'İslam Toplumu Kuzey Amerika' },
  { id: 'egypt', name: 'Mısır Genel Araştırma Kurumu' }
];

export default function PrayerTimes() {
  const [selectedCity, setSelectedCity] = useState('İstanbul');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [settings, setSettings] = useState<PrayerSettings>({
    notifications: true,
    sound: true,
    reminderMinutes: 10,
    method: 'turkey'
  });
  const [showSettings, setShowSettings] = useState(false);

  // Mock prayer times - in a real app, this would come from an API
  const prayerTimes: PrayerTime[] = [
    {
      name: 'İmsak',
      time: '05:42',
      icon: Star,
      isNext: false,
      isPassed: true
    },
    {
      name: 'Güneş',
      time: '07:18',
      icon: Sunrise,
      isNext: false,
      isPassed: true
    },
    {
      name: 'Öğle',
      time: '12:45',
      icon: Sun,
      isNext: true,
      isPassed: false
    },
    {
      name: 'İkindi',
      time: '15:23',
      icon: Sun,
      isNext: false,
      isPassed: false
    },
    {
      name: 'Akşam',
      time: '17:56',
      icon: Sunset,
      isNext: false,
      isPassed: false
    },
    {
      name: 'Yatsı',
      time: '19:34',
      icon: Moon,
      isNext: false,
      isPassed: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatCurrentDate = () => {
    return currentTime.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getNextPrayer = () => {
    return prayerTimes.find(prayer => prayer.isNext);
  };

  const getTimeUntilNext = () => {
    const nextPrayer = getNextPrayer();
    if (!nextPrayer) return '';

    const [hours, minutes] = nextPrayer.time.split(':').map(Number);
    const nextPrayerTime = new Date();
    nextPrayerTime.setHours(hours, minutes, 0, 0);

    const diff = nextPrayerTime.getTime() - currentTime.getTime();
    if (diff < 0) return '';

    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hoursLeft}s ${minutesLeft}d`;
  };

  const handleSettingsChange = (key: keyof PrayerSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Namaz Vakitleri</h1>
        <p className="text-gray-600">Günlük namaz vakitlerini takip edin ve hatırlatma alın</p>
      </div>

      {/* Current Time & Location */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-5 w-5" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city} className="text-gray-900">{city}</option>
                ))}
              </select>
            </div>
            <div className="text-3xl font-bold mb-1">{formatCurrentTime()}</div>
            <div className="text-emerald-100">{formatCurrentDate()}</div>
          </div>
          
          <div className="text-right">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Ayarlar</span>
            </button>
          </div>
        </div>

        {/* Next Prayer Countdown */}
        {getNextPrayer() && (
          <div className="mt-6 p-4 bg-white/10 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Sonraki Namaz</p>
                <p className="text-xl font-semibold">{getNextPrayer()?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-100 text-sm">Kalan Süre</p>
                <p className="text-xl font-semibold">{getTimeUntilNext()}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Namaz Vakti Ayarları</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Bildirimler</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingsChange('notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Ses</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.sound}
                    onChange={(e) => handleSettingsChange('sound', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hatırlatma Süresi
                </label>
                <select
                  value={settings.reminderMinutes}
                  onChange={(e) => handleSettingsChange('reminderMinutes', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value={5}>5 dakika önce</option>
                  <option value={10}>10 dakika önce</option>
                  <option value={15}>15 dakika önce</option>
                  <option value={30}>30 dakika önce</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hesaplama Yöntemi
                </label>
                <select
                  value={settings.method}
                  onChange={(e) => handleSettingsChange('method', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {calculationMethods.map(method => (
                    <option key={method.id} value={method.id}>{method.name}</option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Smartphone className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">Mobil Uygulama</span>
                </div>
                <p className="text-xs text-emerald-700">
                  Daha iyi deneyim için mobil uygulamamızı indirin ve push bildirimleri alın.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {prayerTimes.map((prayer, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl p-6 shadow-sm border transition-all ${
              prayer.isNext
                ? 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50'
                : prayer.isPassed
                ? 'border-gray-200 opacity-60'
                : 'border-gray-100 hover:shadow-md'
            }`}
          >
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                prayer.isNext
                  ? 'bg-emerald-600 text-white'
                  : prayer.isPassed
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-emerald-100 text-emerald-600'
              }`}>
                <prayer.icon className="h-6 w-6" />
              </div>
              <h3 className={`font-semibold mb-1 ${
                prayer.isNext ? 'text-emerald-900' : 'text-gray-900'
              }`}>
                {prayer.name}
              </h3>
              <p className={`text-lg font-bold ${
                prayer.isNext ? 'text-emerald-700' : 'text-gray-700'
              }`}>
                {prayer.time}
              </p>
              {prayer.isNext && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-600 text-white">
                    Sonraki
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <Bell className="h-6 w-6 text-emerald-600" />
            <h3 className="font-semibold text-gray-900">Hatırlatmalar</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Namaz vakitlerinde otomatik hatırlatma alın
          </p>
          <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Hatırlatmaları Aç
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Aylık Takvim</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Tüm ay için namaz vakitlerini görüntüleyin
          </p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Takvimi Görüntüle
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <MapPin className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Yakın Camiler</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Konumunuza yakın camileri bulun
          </p>
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Camileri Bul
          </button>
        </div>
      </div>

      {/* Islamic Calendar Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hicri Takvim Bilgisi</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Hicri Tarih</p>
            <p className="text-lg font-semibold text-gray-900">15 Rajab 1445</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Ay Evresi</p>
            <p className="text-lg font-semibold text-gray-900">🌒 Hilal</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Özel Günler</p>
            <p className="text-lg font-semibold text-gray-900">-</p>
          </div>
        </div>
      </div>

      {/* Prayer Statistics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bu Hafta İstatistiklerim</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {prayerTimes.slice(1, 6).map((prayer, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-2">
                <prayer.icon className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">{prayer.name}</p>
              <p className="text-xs text-gray-600">6/7 gün</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}