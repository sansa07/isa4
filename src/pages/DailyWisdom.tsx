import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Heart, 
  Share2, 
  Bookmark, 
  RefreshCw,
  Star,
  Quote,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface WisdomContent {
  id: string;
  type: 'verse' | 'hadith' | 'quote';
  title: string;
  content: string;
  source: string;
  translation?: string;
  explanation?: string;
  date: string;
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  category: string;
}

const wisdomData: WisdomContent[] = [
  {
    id: '1',
    type: 'verse',
    title: 'Sabır ve Namaz',
    content: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ',
    source: 'Bakara Suresi, 45. Ayet',
    translation: 'Sabır ve namazla (Allah\'tan) yardım dileyin. Şüphesiz o (namaz), huşu sahibi olanlar dışında herkese ağır gelir.',
    explanation: 'Bu ayet, hayatın zorluklarıyla karşılaştığımızda sabır ve namaz ile Allah\'tan yardım istememizi öğütler. Namaz, kalbi temizler ve ruhu huzura kavuşturur.',
    date: '2024-01-20',
    likes: 234,
    isLiked: false,
    isBookmarked: true,
    category: 'Kur\'an'
  },
  {
    id: '2',
    type: 'hadith',
    title: 'Güzel Ahlak',
    content: 'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ',
    source: 'Muvatta, Hüsnü\'l-Huluk 8',
    translation: 'Ben ancak güzel ahlakı tamamlamak için gönderildim.',
    explanation: 'Hz. Peygamber (s.a.v), İslam\'ın temel amacının insanları güzel ahlaka ulaştırmak olduğunu belirtir. Güzel ahlak, İslam\'ın özüdür.',
    date: '2024-01-19',
    likes: 189,
    isLiked: true,
    isBookmarked: false,
    category: 'Hadis'
  },
  {
    id: '3',
    type: 'quote',
    title: 'İlim Öğrenme',
    content: 'اطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ إِلَى اللَّحْدِ',
    source: 'İslami Özdeyiş',
    translation: 'İlmi beşikten mezara kadar öğrenin.',
    explanation: 'İslam, hayat boyu öğrenmeyi teşvik eder. Her yaşta yeni şeyler öğrenmek, insanın gelişimi için gereklidir.',
    date: '2024-01-18',
    likes: 156,
    isLiked: false,
    isBookmarked: true,
    category: 'Hikmet'
  }
];

const categories = ['Tümü', 'Kur\'an', 'Hadis', 'Hikmet', 'Dua'];

export default function DailyWisdom() {
  const [currentWisdom, setCurrentWisdom] = useState(wisdomData[0]);
  const [allWisdom, setAllWisdom] = useState(wisdomData);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  const filteredWisdom = allWisdom.filter(wisdom => 
    selectedCategory === 'Tümü' || wisdom.category === selectedCategory
  );

  useEffect(() => {
    setCurrentWisdom(filteredWisdom[currentIndex] || filteredWisdom[0]);
  }, [currentIndex, filteredWisdom]);

  const handleLike = (id: string) => {
    setAllWisdom(allWisdom.map(wisdom =>
      wisdom.id === id
        ? {
            ...wisdom,
            isLiked: !wisdom.isLiked,
            likes: wisdom.isLiked ? wisdom.likes - 1 : wisdom.likes + 1
          }
        : wisdom
    ));
  };

  const handleBookmark = (id: string) => {
    setAllWisdom(allWisdom.map(wisdom =>
      wisdom.id === id
        ? { ...wisdom, isBookmarked: !wisdom.isBookmarked }
        : wisdom
    ));
  };

  const nextWisdom = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredWisdom.length);
  };

  const prevWisdom = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredWisdom.length) % filteredWisdom.length);
  };

  const getRandomWisdom = () => {
    const randomIndex = Math.floor(Math.random() * filteredWisdom.length);
    setCurrentIndex(randomIndex);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'verse':
        return <BookOpen className="h-5 w-5 text-emerald-600" />;
      case 'hadith':
        return <Star className="h-5 w-5 text-amber-600" />;
      case 'quote':
        return <Quote className="h-5 w-5 text-blue-600" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'verse':
        return 'bg-emerald-100 text-emerald-800';
      case 'hadith':
        return 'bg-amber-100 text-amber-800';
      case 'quote':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Günlük Hikmet</h1>
        <p className="text-gray-600">Her gün yeni bir hikmet, ayet veya hadis ile ruhunuzu besleyin</p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-sm border border-gray-100">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Wisdom Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getTypeIcon(currentWisdom.type)}
              <div>
                <h2 className="text-xl font-semibold">{currentWisdom.title}</h2>
                <p className="text-emerald-100 text-sm">{currentWisdom.source}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(currentWisdom.type)} bg-white/20 text-white`}>
                {currentWisdom.category}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-100">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{currentWisdom.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevWisdom}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm px-3 py-1 bg-white/20 rounded-lg">
                {currentIndex + 1} / {filteredWisdom.length}
              </span>
              <button
                onClick={nextWisdom}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Arabic/Original Text */}
          <div className="text-center mb-6">
            <div className="text-2xl leading-relaxed text-gray-900 font-arabic mb-4 p-6 bg-gray-50 rounded-xl">
              {currentWisdom.content}
            </div>
          </div>

          {/* Translation Toggle */}
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <span className="text-sm font-medium">
                {showTranslation ? 'Çeviriyi Gizle' : 'Çeviriyi Göster'}
              </span>
            </button>
          </div>

          {/* Translation */}
          {showTranslation && currentWisdom.translation && (
            <div className="mb-6">
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                <p className="text-gray-800 leading-relaxed italic">
                  "{currentWisdom.translation}"
                </p>
              </div>
            </div>
          )}

          {/* Explanation Toggle */}
          {currentWisdom.explanation && (
            <div className="mb-6">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-3"
              >
                <span className="text-sm font-medium">
                  {showExplanation ? 'Açıklamayı Gizle' : 'Açıklamayı Göster'}
                </span>
              </button>
              
              {showExplanation && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {currentWisdom.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLike(currentWisdom.id)}
                className={`flex items-center space-x-2 transition-colors ${
                  currentWisdom.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${currentWisdom.isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{currentWisdom.likes}</span>
              </button>
              
              <button
                onClick={() => handleBookmark(currentWisdom.id)}
                className={`flex items-center space-x-2 transition-colors ${
                  currentWisdom.isBookmarked ? 'text-amber-500' : 'text-gray-500 hover:text-amber-500'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${currentWisdom.isBookmarked ? 'fill-current' : ''}`} />
                <span className="text-sm">Kaydet</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                <Share2 className="h-5 w-5" />
                <span className="text-sm">Paylaş</span>
              </button>
            </div>

            <button
              onClick={getRandomWisdom}
              className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Rastgele</span>
            </button>
          </div>
        </div>
      </div>

      {/* Daily Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Günlük Okuma</h3>
          <p className="text-2xl font-bold text-emerald-600">5</p>
          <p className="text-sm text-gray-600">hikmet okundu</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="flex items-center justify-center mb-2">
            <Bookmark className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Kaydedilenler</h3>
          <p className="text-2xl font-bold text-amber-600">
            {allWisdom.filter(w => w.isBookmarked).length}
          </p>
          <p className="text-sm text-gray-600">hikmet kaydedildi</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="flex items-center justify-center mb-2">
            <Heart className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Beğenilenler</h3>
          <p className="text-2xl font-bold text-red-500">
            {allWisdom.filter(w => w.isLiked).length}
          </p>
          <p className="text-sm text-gray-600">hikmet beğenildi</p>
        </div>
      </div>

      {/* Recent Wisdom */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Okuduklarınız</h3>
        <div className="space-y-3">
          {allWisdom.slice(0, 3).map((wisdom) => (
            <div
              key={wisdom.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => {
                const index = filteredWisdom.findIndex(w => w.id === wisdom.id);
                if (index !== -1) setCurrentIndex(index);
              }}
            >
              <div className="flex items-center space-x-3">
                {getTypeIcon(wisdom.type)}
                <div>
                  <h4 className="font-medium text-gray-900">{wisdom.title}</h4>
                  <p className="text-sm text-gray-600">{wisdom.source}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {wisdom.isBookmarked && <Bookmark className="h-4 w-4 text-amber-500 fill-current" />}
                {wisdom.isLiked && <Heart className="h-4 w-4 text-red-500 fill-current" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}