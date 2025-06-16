import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  User, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Edit, 
  Settings,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Grid,
  List,
  Camera,
  Mail,
  Phone,
  Globe,
  Award,
  Star,
  Users,
  BookOpen
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  avatar?: string;
  coverImage?: string;
  stats: {
    totalLikes: number;
    totalComments: number;
    totalShares: number;
  };
}

interface Post {
  id: string;
  content: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  category: string;
}

const sampleProfile: UserProfile = {
  id: '1',
  name: 'Ahmet Yılmaz',
  username: 'ahmetyilmaz',
  bio: 'İslami değerleri yaşamaya ve paylaşmaya çalışan bir kardeşiniz. "İlim öğrenin, beşikten mezara kadar." 📚🤲',
  location: 'İstanbul, Türkiye',
  website: 'https://ahmetyilmaz.com',
  joinDate: '2023-06-15',
  followers: 1247,
  following: 456,
  posts: 89,
  verified: true,
  stats: {
    totalLikes: 5420,
    totalComments: 1230,
    totalShares: 890
  }
};

const samplePosts: Post[] = [
  {
    id: '1',
    content: 'Bugün sabah namazından sonra okuduğum bu ayet çok etkiledi: "Ve O, her şeye gücü yeten, her şeyi bilendir." (Bakara 2:109) Allah\'ın kudretini düşünmek insanı ne kadar da huzurlu kılıyor.',
    type: 'text',
    timestamp: '2 saat önce',
    likes: 47,
    comments: 12,
    shares: 8,
    isLiked: false,
    isBookmarked: true,
    category: 'Ayetler'
  },
  {
    id: '2',
    content: 'Cuma namazı sonrası cemaatle birlikte okuduğumuz dualar... Maşallah ne güzel bir atmosfer vardı. Allah kabul etsin.',
    type: 'image',
    mediaUrl: 'https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=800',
    timestamp: '1 gün önce',
    likes: 89,
    comments: 23,
    shares: 15,
    isLiked: true,
    isBookmarked: false,
    category: 'İbadet'
  },
  {
    id: '3',
    content: 'Hz. Peygamber (s.a.v) buyurdu: "Mümin, insanların kendisinden emin olduğu kişidir." Bu hadis günümüzde ne kadar da önemli...',
    type: 'text',
    timestamp: '3 gün önce',
    likes: 156,
    comments: 34,
    shares: 28,
    isLiked: false,
    isBookmarked: true,
    category: 'Hadisler'
  }
];

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(sampleProfile);
  const [posts, setPosts] = useState(samplePosts);
  const [activeTab, setActiveTab] = useState('posts');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    bio: profile.bio,
    location: profile.location,
    website: profile.website
  });

  const isOwnProfile = true; // In a real app, this would be determined by comparing user IDs

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

  const handleSaveProfile = () => {
    setProfile({ ...profile, ...editForm });
    setIsEditing(false);
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      month: 'long',
      year: 'numeric'
    });
  };

  const tabs = [
    { id: 'posts', name: 'Paylaşımlar', icon: BookOpen, count: profile.posts },
    { id: 'liked', name: 'Beğenilenler', icon: Heart, count: posts.filter(p => p.isLiked).length },
    { id: 'saved', name: 'Kaydedilenler', icon: Bookmark, count: posts.filter(p => p.isBookmarked).length },
    { id: 'about', name: 'Hakkında', icon: User, count: null }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cover Image */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl h-48 relative overflow-hidden">
        {profile.coverImage ? (
          <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-emerald-600 to-emerald-700"></div>
        )}
        {isOwnProfile && (
          <button className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors">
            <Camera className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-emerald-100 border-4 border-white flex items-center justify-center">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="h-full w-full rounded-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-emerald-600">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {isOwnProfile && (
                <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1.5 rounded-full hover:bg-emerald-700 transition-colors">
                  <Camera className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                {profile.verified && (
                  <div className="h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-2">@{profile.username}</p>
              
              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm">
                <div>
                  <span className="font-bold text-gray-900">{profile.posts}</span>
                  <span className="text-gray-600 ml-1">paylaşım</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900">{profile.followers.toLocaleString()}</span>
                  <span className="text-gray-600 ml-1">takipçi</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900">{profile.following}</span>
                  <span className="text-gray-600 ml-1">takip</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            {isOwnProfile ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Profili Düzenle</span>
                </button>
                <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Takip Et
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Mesaj
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bio and Details */}
        <div className="mt-6 space-y-3">
          <p className="text-gray-900 leading-relaxed">{profile.bio}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {profile.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center space-x-1">
                <LinkIcon className="h-4 w-4" />
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                  {profile.website.replace('https://', '')}
                </a>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatJoinDate(profile.joinDate)} tarihinde katıldı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Toplam Beğeni</h3>
          <p className="text-2xl font-bold text-red-500">{profile.stats.totalLikes.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Toplam Yorum</h3>
          <p className="text-2xl font-bold text-blue-500">{profile.stats.totalComments.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <Share2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Toplam Paylaşım</h3>
          <p className="text-2xl font-bold text-emerald-500">{profile.stats.totalShares.toLocaleString()}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
              {tab.count !== null && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {/* View Mode Toggle */}
              <div className="flex justify-end">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Posts */}
              {viewMode === 'list' ? (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="mb-4">
                        <p className="text-gray-900 leading-relaxed">{post.content}</p>
                      </div>
                      
                      {post.type === 'image' && post.mediaUrl && (
                        <div className="mb-4">
                          <img
                            src={post.mediaUrl}
                            alt="Post content"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{post.timestamp}</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {post.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center space-x-2 transition-colors ${
                              post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                            }`}
                          >
                            <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                            <span className="font-medium">{post.likes}</span>
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
                          className={`transition-colors ${
                            post.isBookmarked ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'
                          }`}
                        >
                          <Bookmark className={`h-5 w-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      {post.type === 'image' && post.mediaUrl ? (
                        <img
                          src={post.mediaUrl}
                          alt="Post content"
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <p className="text-sm text-gray-900 line-clamp-3 mb-2">{post.content}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.timestamp}</span>
                        <div className="flex items-center space-x-2">
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="space-y-4">
              {posts.filter(p => p.isLiked).map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-900 mb-2">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.timestamp}</span>
                    <span className="text-red-500">❤️ Beğenildi</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-4">
              {posts.filter(p => p.isBookmarked).map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-900 mb-2">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.timestamp}</span>
                    <span className="text-amber-500">🔖 Kaydedildi</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Hakkında</h3>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">İletişim Bilgileri</h3>
                <div className="space-y-2">
                  {profile.location && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Globe className="h-4 w-4" />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                        {profile.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatJoinDate(profile.joinDate)} tarihinde katıldı</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Başarılar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                    <Award className="h-6 w-6 text-emerald-600" />
                    <div>
                      <p className="font-medium text-emerald-900">Aktif Üye</p>
                      <p className="text-sm text-emerald-700">100+ paylaşım</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Star className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Popüler İçerik</p>
                      <p className="text-sm text-blue-700">1000+ beğeni</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profili Düzenle</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biyografi
                </label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konum
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={editForm.website}
                  onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}