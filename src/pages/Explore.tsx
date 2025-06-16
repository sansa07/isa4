import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  Hash, 
  Users, 
  BookOpen, 
  Heart, 
  MessageCircle,
  Share2,
  Filter,
  Clock,
  Star,
  Eye,
  Bookmark
} from 'lucide-react';

interface TrendingTopic {
  id: string;
  hashtag: string;
  posts: number;
  growth: number;
}

interface PopularUser {
  id: string;
  name: string;
  followers: number;
  posts: number;
  verified: boolean;
  category: string;
}

interface FeaturedPost {
  id: string;
  author: {
    name: string;
    verified: boolean;
  };
  content: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  category: string;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
}

const trendingTopics: TrendingTopic[] = [
  { id: '1', hashtag: 'SabahDuası', posts: 1247, growth: 23 },
  { id: '2', hashtag: 'CumaHutbesi', posts: 856, growth: 18 },
  { id: '3', hashtag: 'İslamisanat', posts: 634, growth: 15 },
  { id: '4', hashtag: 'HadisiŞerif', posts: 523, growth: 12 },
  { id: '5', hashtag: 'NamazVakti', posts: 445, growth: 8 },
  { id: '6', hashtag: 'KuranıKerim', posts: 389, growth: 6 },
  { id: '7', hashtag: 'İslamisohbet', posts: 267, growth: 4 },
  { id: '8', hashtag: 'Hayırseverlik', posts: 198, growth: 2 }
];

const popularUsers: PopularUser[] = [
  {
    id: '1',
    name: 'Dr. Ahmet Yılmaz',
    followers: 15420,
    posts: 234,
    verified: true,
    category: 'İlahiyatçı'
  },
  {
    id: '2',
    name: 'Fatma Özkan',
    followers: 8930,
    posts: 156,
    verified: true,
    category: 'İslami Sanat'
  },
  {
    id: '3',
    name: 'Hafız Mehmet Demir',
    followers: 12340,
    posts: 89,
    verified: true,
    category: 'Hafız'
  },
  {
    id: '4',
    name: 'Ayşe Kaya',
    followers: 6780,
    posts: 178,
    verified: false,
    category: 'Aile Danışmanı'
  }
];

const featuredPosts: FeaturedPost[] = [
  {
    id: '1',
    author: {
      name: 'Dr. Ahmet Yılmaz',
      verified: true
    },
    content: 'Sabah namazının ruha verdiği huzur tarif edilemez. Her gün yeni bir başlangıç, her secde bir tevekkül... "Ve sabah namazını kıl, çünkü sabah namazı şahitlidir." (İsra, 78)',
    type: 'text',
    timestamp: '3 saat önce',
    likes: 1247,
    comments: 89,
    shares: 156,
    views: 5420,
    category: 'İbadet',
    tags: ['sabah namazı', 'ibadet', 'huzur'],
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '2',
    author: {
      name: 'Fatma Özkan',
      verified: true
    },
    content: 'Bugün Süleymaniye Camii\'nde çektiğim bu fotoğraf... İslam mimarisinin zarafeti ve ihtişamı. Her detayında Allah\'ın güzelliğinin yansıması var.',
    type: 'image',
    mediaUrl: 'https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=800',
    timestamp: '5 saat önce',
    likes: 2156,
    comments: 134,
    shares: 267,
    views: 8930,
    category: 'Sanat',
    tags: ['mimari', 'cami', 'sanat'],
    isLiked: true,
    isBookmarked: false
  },
  {
    id: '3',
    author: {
      name: 'Hafız Mehmet Demir',
      verified: true
    },
    content: 'Hz. Peygamber (s.a.v) buyurdu: "Mümin kardeşinin yüzüne gülümsemen sadakadır." Bu hadis, günlük hayatımızda ne kadar basit iyiliklerle sevap kazanabileceğimizi gösteriyor.',
    type: 'text',
    timestamp: '1 gün önce',
    likes: 1834,
    comments: 156,
    shares: 234,
    views: 6780,
    category: 'Hadis',
    tags: ['hadis', 'gülümseme', 'sadaka'],
    isLiked: false,
    isBookmarked: true
  }
];

const categories = ['Tümü', 'İbadet', 'Sanat', 'Hadis', 'Kur\'an', 'Aile', 'Gençlik', 'Sosyal'];

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [posts, setPosts] = useState(featuredPosts);
  const [activeTab, setActiveTab] = useState('posts');

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory;
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Keşfet</h1>
        <p className="text-gray-600">Popüler içerikleri, trend konuları ve öne çıkan kullanıcıları keşfedin</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="İçerik, kullanıcı veya hashtag ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
              activeTab === 'posts'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span>Popüler İçerikler</span>
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
              activeTab === 'trending'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            <span>Trend Konular</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
              activeTab === 'users'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Popüler Kullanıcılar</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-emerald-600">
                          {post.author.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                          {post.author.verified && (
                            <div className="h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{post.timestamp}</span>
                          <span>•</span>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Eye className="h-4 w-4" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-900 leading-relaxed">{post.content}</p>
                  </div>

                  {/* Post Media */}
                  {post.type === 'image' && post.mediaUrl && (
                    <div className="mb-4 -mx-6">
                      <img
                        src={post.mediaUrl}
                        alt="Post content"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-emerald-100 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="font-medium">{post.likes.toLocaleString()}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-medium">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                        <Share2 className="h-5 w-5" />
                        <span className="font-medium">{post.shares}</span>
                      </button>
                    </div>
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        post.isBookmarked ? 'text-amber-500 bg-amber-50' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
                      }`}
                    >
                      <Bookmark className={`h-5 w-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'trending' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingTopics.map((topic, index) => (
            <div key={topic.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Hash className="h-5 w-5 text-emerald-600" />
                  <span className="text-lg font-semibold text-gray-900">#{topic.hashtag}</span>
                </div>
                <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Paylaşım sayısı</span>
                  <span className="font-medium text-gray-900">{topic.posts.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Büyüme</span>
                  <span className="flex items-center space-x-1 text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span className="font-medium">+{topic.growth}%</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-medium text-emerald-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  {user.verified && (
                    <div className="h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-emerald-600 mb-4">{user.category}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{user.followers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Takipçi</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{user.posts}</div>
                    <div className="text-sm text-gray-600">Paylaşım</div>
                  </div>
                </div>
                
                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Takip Et
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="text-center py-8">
        <button className="px-8 py-3 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium">
          Daha Fazla Göster
        </button>
      </div>
    </div>
  );
}