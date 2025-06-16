import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Star, 
  Heart, 
  Share2, 
  Bookmark, 
  Volume2,
  VolumeX,
  Copy,
  Filter,
  ChevronDown,
  ChevronUp,
  Play,
  Pause
} from 'lucide-react';

interface Verse {
  id: string;
  surah: {
    number: number;
    name: string;
    nameArabic: string;
  };
  verseNumber: number;
  textArabic: string;
  textTurkish: string;
  textTransliteration?: string;
  category: string;
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  audioUrl?: string;
}

interface Hadith {
  id: string;
  source: {
    name: string;
    book: string;
    number: string;
  };
  textArabic: string;
  textTurkish: string;
  narrator: string;
  category: string;
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  authenticity: 'sahih' | 'hasan' | 'daif';
}

const sampleVerses: Verse[] = [
  {
    id: '1',
    surah: {
      number: 2,
      name: 'Bakara',
      nameArabic: 'البقرة'
    },
    verseNumber: 45,
    textArabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ',
    textTurkish: 'Sabır ve namazla (Allah\'tan) yardım dileyin. Şüphesiz o (namaz), huşu sahibi olanlar dışında herkese ağır gelir.',
    textTransliteration: 'Wastaʿīnū biṣ-ṣabri waṣ-ṣalāti wa innahā lakabīratun illā ʿalā l-khāshiʿīn',
    category: 'İbadet',
    likes: 234,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '2',
    surah: {
      number: 17,
      name: 'İsra',
      nameArabic: 'الإسراء'
    },
    verseNumber: 23,
    textArabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',
    textTurkish: 'Rabbin, yalnız kendisine kulluk etmenizi ve anne-babanıza iyilik yapmanızı emretti.',
    textTransliteration: 'Wa qaḍā rabbuka allā taʿbudū illā iyyāhu wa bil-wālidayni iḥsānan',
    category: 'Ahlak',
    likes: 189,
    isLiked: true,
    isBookmarked: false
  }
];

const sampleHadiths: Hadith[] = [
  {
    id: '1',
    source: {
      name: 'Buhari',
      book: 'Sahih-i Buhari',
      number: '6018'
    },
    textArabic: 'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ',
    textTurkish: 'Ben ancak güzel ahlakı tamamlamak için gönderildim.',
    narrator: 'Ebu Hureyre (r.a.)',
    category: 'Ahlak',
    likes: 156,
    isLiked: false,
    isBookmarked: true,
    authenticity: 'sahih'
  },
  {
    id: '2',
    source: {
      name: 'Müslim',
      book: 'Sahih-i Müslim',
      number: '2564'
    },
    textArabic: 'الْمُؤْمِنُ الَّذِي يُخَالِطُ النَّاسَ وَيَصْبِرُ عَلَى أَذَاهُمْ خَيْرٌ مِنَ الْمُؤْمِنِ الَّذِي لَا يُخَالِطُ النَّاسَ وَلَا يَصْبِرُ عَلَى أَذَاهُمْ',
    textTurkish: 'İnsanlarla kaynaşan ve onların eziyetlerine sabreden mümin, insanlarla kaynaşmayan ve onların eziyetlerine sabremeyen müminden daha hayırlıdır.',
    narrator: 'İbn Ömer (r.a.)',
    category: 'Sosyal İlişkiler',
    likes: 98,
    isLiked: true,
    isBookmarked: false,
    authenticity: 'sahih'
  }
];

const categories = ['Tümü', 'İbadet', 'Ahlak', 'Sosyal İlişkiler', 'Aile', 'İlim', 'Sabır', 'Tevbe'];

export default function QuranHadith() {
  const [activeTab, setActiveTab] = useState<'quran' | 'hadith'>('quran');
  const [verses, setVerses] = useState(sampleVerses);
  const [hadiths, setHadiths] = useState(sampleHadiths);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const handleLikeVerse = (verseId: string) => {
    setVerses(verses.map(verse =>
      verse.id === verseId
        ? {
            ...verse,
            isLiked: !verse.isLiked,
            likes: verse.isLiked ? verse.likes - 1 : verse.likes + 1
          }
        : verse
    ));
  };

  const handleBookmarkVerse = (verseId: string) => {
    setVerses(verses.map(verse =>
      verse.id === verseId
        ? { ...verse, isBookmarked: !verse.isBookmarked }
        : verse
    ));
  };

  const handleLikeHadith = (hadithId: string) => {
    setHadiths(hadiths.map(hadith =>
      hadith.id === hadithId
        ? {
            ...hadith,
            isLiked: !hadith.isLiked,
            likes: hadith.isLiked ? hadith.likes - 1 : hadith.likes + 1
          }
        : hadith
    ));
  };

  const handleBookmarkHadith = (hadithId: string) => {
    setHadiths(hadiths.map(hadith =>
      hadith.id === hadithId
        ? { ...hadith, isBookmarked: !hadith.isBookmarked }
        : hadith
    ));
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd show a toast notification here
  };

  const filteredVerses = verses.filter(verse => {
    const matchesCategory = selectedCategory === 'Tümü' || verse.category === selectedCategory;
    const matchesSearch = verse.textTurkish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verse.surah.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredHadiths = hadiths.filter(hadith => {
    const matchesCategory = selectedCategory === 'Tümü' || hadith.category === selectedCategory;
    const matchesSearch = hadith.textTurkish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hadith.source.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getAuthenticityColor = (authenticity: string) => {
    switch (authenticity) {
      case 'sahih':
        return 'bg-green-100 text-green-800';
      case 'hasan':
        return 'bg-yellow-100 text-yellow-800';
      case 'daif':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAuthenticityText = (authenticity: string) => {
    switch (authenticity) {
      case 'sahih':
        return 'Sahih';
      case 'hasan':
        return 'Hasen';
      case 'daif':
        return 'Zayıf';
      default:
        return 'Bilinmiyor';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kur'an & Hadis</h1>
        <p className="text-gray-600">Kur'an ayetleri ve hadis-i şerifleri okuyun, öğrenin ve paylaşın</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('quran')}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
              activeTab === 'quran'
                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span>Kur'an Ayetleri</span>
          </button>
          <button
            onClick={() => setActiveTab('hadith')}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
              activeTab === 'hadith'
                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Star className="h-5 w-5" />
            <span>Hadis-i Şerifler</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={`${activeTab === 'quran' ? 'Ayet' : 'Hadis'} ara...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            {activeTab === 'quran' && (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showTransliteration}
                  onChange={(e) => setShowTransliteration(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Okunuş göster</span>
              </label>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span>
              {activeTab === 'quran' 
                ? `${filteredVerses.length} ayet` 
                : `${filteredHadiths.length} hadis`
              } bulundu
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'quran' && (
        <div className="space-y-6">
          {filteredVerses.map((verse) => (
            <div key={verse.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      {verse.surah.name} {verse.verseNumber}
                    </div>
                    <span className="text-sm text-gray-600">{verse.surah.nameArabic}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {verse.category}
                    </span>
                    <button
                      onClick={() => toggleExpanded(verse.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {expandedItems.has(verse.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="text-center mb-6">
                  <div className="text-2xl leading-relaxed text-gray-900 font-arabic mb-4 p-6 bg-gray-50 rounded-xl">
                    {verse.textArabic}
                  </div>
                </div>

                {/* Transliteration */}
                {showTransliteration && verse.textTransliteration && (
                  <div className="mb-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <p className="text-blue-800 italic text-center">
                        {verse.textTransliteration}
                      </p>
                    </div>
                  </div>
                )}

                {/* Turkish Translation */}
                <div className="mb-6">
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                    <p className="text-gray-800 leading-relaxed">
                      "{verse.textTurkish}"
                    </p>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedItems.has(verse.id) && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Ayet Bilgileri</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Sure:</span> {verse.surah.name} ({verse.surah.nameArabic})
                      </div>
                      <div>
                        <span className="font-medium">Ayet Numarası:</span> {verse.verseNumber}
                      </div>
                      <div>
                        <span className="font-medium">Kategori:</span> {verse.category}
                      </div>
                      <div>
                        <span className="font-medium">Sure Numarası:</span> {verse.surah.number}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLikeVerse(verse.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        verse.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${verse.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">{verse.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => handleBookmarkVerse(verse.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        verse.isBookmarked ? 'text-amber-500' : 'text-gray-500 hover:text-amber-500'
                      }`}
                    >
                      <Bookmark className={`h-5 w-5 ${verse.isBookmarked ? 'fill-current' : ''}`} />
                      <span className="text-sm">Kaydet</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm">Paylaş</span>
                    </button>
                    
                    <button
                      onClick={() => handleCopy(`${verse.textArabic}\n\n"${verse.textTurkish}"\n\n${verse.surah.name} Suresi, ${verse.verseNumber}. Ayet`)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Copy className="h-5 w-5" />
                      <span className="text-sm">Kopyala</span>
                    </button>
                  </div>

                  {verse.audioUrl && (
                    <button
                      onClick={() => setPlayingAudio(playingAudio === verse.id ? null : verse.id)}
                      className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      {playingAudio === verse.id ? (
                        <>
                          <Pause className="h-4 w-4" />
                          <span>Durdur</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          <span>Dinle</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'hadith' && (
        <div className="space-y-6">
          {filteredHadiths.map((hadith) => (
            <div key={hadith.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                      {hadith.source.name}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAuthenticityColor(hadith.authenticity)}`}>
                      {getAuthenticityText(hadith.authenticity)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {hadith.category}
                    </span>
                    <button
                      onClick={() => toggleExpanded(hadith.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {expandedItems.has(hadith.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="text-center mb-6">
                  <div className="text-xl leading-relaxed text-gray-900 font-arabic mb-4 p-6 bg-gray-50 rounded-xl">
                    {hadith.textArabic}
                  </div>
                </div>

                {/* Turkish Translation */}
                <div className="mb-6">
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                    <p className="text-gray-800 leading-relaxed">
                      "{hadith.textTurkish}"
                    </p>
                  </div>
                </div>

                {/* Narrator */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Rivayet eden:</span> {hadith.narrator}
                  </p>
                </div>

                {/* Expanded Content */}
                {expandedItems.has(hadith.id) && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Hadis Bilgileri</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Kaynak:</span> {hadith.source.book}
                      </div>
                      <div>
                        <span className="font-medium">Hadis No:</span> {hadith.source.number}
                      </div>
                      <div>
                        <span className="font-medium">Sıhhat Derecesi:</span> {getAuthenticityText(hadith.authenticity)}
                      </div>
                      <div>
                        <span className="font-medium">Kategori:</span> {hadith.category}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLikeHadith(hadith.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        hadith.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${hadith.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">{hadith.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => handleBookmarkHadith(hadith.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        hadith.isBookmarked ? 'text-amber-500' : 'text-gray-500 hover:text-amber-500'
                      }`}
                    >
                      <Bookmark className={`h-5 w-5 ${hadith.isBookmarked ? 'fill-current' : ''}`} />
                      <span className="text-sm">Kaydet</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm">Paylaş</span>
                    </button>
                    
                    <button
                      onClick={() => handleCopy(`${hadith.textArabic}\n\n"${hadith.textTurkish}"\n\nRivayet: ${hadith.narrator}\nKaynak: ${hadith.source.book} ${hadith.source.number}`)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Copy className="h-5 w-5" />
                      <span className="text-sm">Kopyala</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === 'quran' && filteredVerses.length === 0) || 
        (activeTab === 'hadith' && filteredHadiths.length === 0)) && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activeTab === 'quran' ? 'Ayet bulunamadı' : 'Hadis bulunamadı'}
          </h3>
          <p className="text-gray-600 mb-4">
            Aradığınız kriterlere uygun {activeTab === 'quran' ? 'ayet' : 'hadis'} bulunamadı. 
            Arama terimlerinizi değiştirmeyi deneyin.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Tümü');
            }}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

      {/* Load More */}
      <div className="text-center py-8">
        <button className="px-8 py-3 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium">
          Daha Fazla {activeTab === 'quran' ? 'Ayet' : 'Hadis'} Göster
        </button>
      </div>
    </div>
  );
}