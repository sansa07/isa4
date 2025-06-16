import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Heart,
  Settings,
  Crown,
  Shield,
  Star
} from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  isPrivate: boolean;
  coverImage?: string;
  location?: string;
  createdAt: string;
  isJoined: boolean;
  isAdmin: boolean;
  recentActivity: string;
}

const sampleCommunities: Community[] = [
  {
    id: '1',
    name: 'İstanbul Cami Cemaati',
    description: 'İstanbul\'daki camilerimizde bir araya gelen kardeşlerimizin buluşma noktası. Namaz vakitleri, hutbe özetleri ve dini sohbetler.',
    memberCount: 1247,
    category: 'Yerel Cemaat',
    isPrivate: false,
    coverImage: 'https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'İstanbul',
    createdAt: '2024-01-10',
    isJoined: true,
    isAdmin: false,
    recentActivity: '2 saat önce'
  },
  {
    id: '2',
    name: 'Kur\'an Okuma Grubu',
    description: 'Kur\'an-ı Kerim\'i güzel okumayı öğrenmek ve tecvid kurallarını pekiştirmek isteyenler için. Haftalık online dersler ve pratik seansları.',
    memberCount: 856,
    category: 'Eğitim',
    isPrivate: false,
    location: 'Online',
    createdAt: '2024-01-05',
    isJoined: true,
    isAdmin: true,
    recentActivity: '1 saat önce'
  },
  {
    id: '3',
    name: 'Genç Müslümanlar',
    description: 'Gençlerin İslami değerler çerçevesinde bir araya geldiği, deneyim paylaştığı ve birbirini desteklediği topluluk.',
    memberCount: 2341,
    category: 'Gençlik',
    isPrivate: false,
    createdAt: '2023-12-20',
    isJoined: false,
    isAdmin: false,
    recentActivity: '30 dakika önce'
  },
  {
    id: '4',
    name: 'Hadis Çalışma Grubu',
    description: 'Hz. Peygamber\'in (s.a.v) hadislerini inceleyip, günlük hayatımıza nasıl uygulayabileceğimizi tartıştığımız özel grup.',
    memberCount: 423,
    category: 'Eğitim',
    isPrivate: true,
    createdAt: '2024-01-15',
    isJoined: false,
    isAdmin: false,
    recentActivity: '4 saat önce'
  },
  {
    id: '5',
    name: 'Aile Danışmanlığı',
    description: 'İslami değerler çerçevesinde aile hayatı, evlilik öncesi hazırlık ve aile içi iletişim konularında destek grubu.',
    memberCount: 678,
    category: 'Aile',
    isPrivate: false,
    createdAt: '2024-01-08',
    isJoined: true,
    isAdmin: false,
    recentActivity: '6 saat önce'
  },
  {
    id: '6',
    name: 'Hac ve Umre Deneyimleri',
    description: 'Hac ve umre yolculuğuna çıkmış veya çıkmayı planlayan kardeşlerimizin deneyim paylaştığı topluluk.',
    memberCount: 934,
    category: 'Hac & Umre',
    isPrivate: false,
    createdAt: '2023-11-25',
    isJoined: false,
    isAdmin: false,
    recentActivity: '1 gün önce'
  }
];

const categories = [
  'Tümü',
  'Yerel Cemaat',
  'Eğitim',
  'Gençlik',
  'Aile',
  'Hac & Umre',
  'Sosyal Yardım',
  'Kültür & Sanat'
];

export default function Communities() {
  const [communities, setCommunities] = useState(sampleCommunities);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    category: 'Yerel Cemaat',
    isPrivate: false,
    location: ''
  });

  const filteredCommunities = communities.filter(community => {
    const matchesCategory = selectedCategory === 'Tümü' || community.category === selectedCategory;
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoinCommunity = (communityId: string) => {
    setCommunities(communities.map(community =>
      community.id === communityId
        ? { 
            ...community, 
            isJoined: !community.isJoined,
            memberCount: community.isJoined ? community.memberCount - 1 : community.memberCount + 1
          }
        : community
    ));
  };

  const handleCreateCommunity = () => {
    if (newCommunity.name && newCommunity.description) {
      const community: Community = {
        id: Date.now().toString(),
        ...newCommunity,
        memberCount: 1,
        createdAt: new Date().toISOString().split('T')[0],
        isJoined: true,
        isAdmin: true,
        recentActivity: 'Şimdi'
      };
      setCommunities([community, ...communities]);
      setNewCommunity({
        name: '',
        description: '',
        category: 'Yerel Cemaat',
        isPrivate: false,
        location: ''
      });
      setShowCreateModal(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Topluluklar</h1>
          <p className="text-gray-600 mt-1">İslami değerleri paylaşan toplulukları keşfedin ve katılın</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Topluluk Oluştur</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Topluluk ara..."
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
      </div>

      {/* My Communities */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Katıldığım Topluluklar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.filter(c => c.isJoined).slice(0, 3).map((community) => (
            <div key={community.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 truncate">{community.name}</h3>
                {community.isAdmin && <Crown className="h-4 w-4 text-amber-500" />}
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{community.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{community.memberCount}</span>
                </div>
                <span>{community.recentActivity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Communities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCommunities.map((community) => (
          <div key={community.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Cover Image */}
            {community.coverImage && (
              <div className="h-32 bg-gradient-to-r from-emerald-500 to-emerald-600 relative">
                <img
                  src={community.coverImage}
                  alt={community.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            )}

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{community.name}</h3>
                    {community.isPrivate && <Shield className="h-4 w-4 text-gray-400" />}
                    {community.isAdmin && <Crown className="h-4 w-4 text-amber-500" />}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                      {community.category}
                    </span>
                    {community.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{community.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{community.description}</p>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{community.memberCount.toLocaleString()} üye</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{community.createdAt}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{community.recentActivity}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">Mesajlar</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Beğen</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  {community.isAdmin && (
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Settings className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleJoinCommunity(community.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      community.isJoined
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : community.isPrivate
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {community.isJoined 
                      ? 'Ayrıl' 
                      : community.isPrivate 
                      ? 'Başvur' 
                      : 'Katıl'
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Yeni Topluluk Oluştur</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topluluk Adı
                </label>
                <input
                  type="text"
                  value={newCommunity.name}
                  onChange={(e) => setNewCommunity({...newCommunity, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Topluluk adını girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={newCommunity.description}
                  onChange={(e) => setNewCommunity({...newCommunity, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Topluluk açıklamasını girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={newCommunity.category}
                  onChange={(e) => setNewCommunity({...newCommunity, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konum (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={newCommunity.location}
                  onChange={(e) => setNewCommunity({...newCommunity, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Şehir veya bölge"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={newCommunity.isPrivate}
                  onChange={(e) => setNewCommunity({...newCommunity, isPrivate: e.target.checked})}
                  className="rounded"
                />
                <label htmlFor="isPrivate" className="text-sm text-gray-700">
                  Özel topluluk (Onay gerektir)
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleCreateCommunity}
                disabled={!newCommunity.name || !newCommunity.description}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCommunities.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Topluluk bulunamadı</h3>
          <p className="text-gray-600 mb-4">
            Aradığınız kriterlere uygun topluluk bulunamadı. Yeni bir topluluk oluşturmayı deneyin.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Topluluk Oluştur
          </button>
        </div>
      )}
    </div>
  );
}