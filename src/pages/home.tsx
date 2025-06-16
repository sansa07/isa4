import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Plus, 
  Image, 
  Video, 
  FileText, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Clock,
  Globe,
  Users
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  content: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  category: string;
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Ahmet Yılmaz',
      verified: true
    },
    content: 'Bugün sabah namazından sonra okuduğum bu ayet çok etkiledi: "Ve O, her şeye gücü yeten, her şeyi bilendir." (Bakara 2:109) Allah\'ın kudretini düşünmek insanı ne kadar da huzurlu kılıyor.',
    type: 'text',
    timestamp: '2 saat önce',
    likes: 47,
    comments: 12,
    shares: 8,
    isLiked: false,
    category: 'Ayetler'
  },
  {
    id: '2',
    author: {
      name: 'Fatma Özkan',
      verified: false
    },
    content: 'Cuma namazı sonrası cemaatle birlikte okuduğumuz dualar... Maşallah ne güzel bir atmosfer vardı. Allah kabul etsin.',
    type: 'image',
    mediaUrl: 'https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=800',
    timestamp: '4 saat önce',
    likes: 89,
    comments: 23,
    shares: 15,
    isLiked: true,
    category: 'İbadet'
  },
  {
    id: '3',
    author: {
      name: 'Mehmet Demir',
      verified: true
    },
    content: 'Hz. Peygamber (s.a.v) buyurdu: "Mümin, insanların kendisinden emin olduğu kişidir." Bu hadis günümüzde ne kadar da önemli...',
    type: 'text',
    timestamp: '6 saat önce',
    likes: 156,
    comments: 34,
    shares: 28,
    isLiked: false,
    category: 'Hadisler'
  }
];

export default function HomePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(samplePosts);
  const [newPost, setNewPost] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

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

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: {
          name: user?.name || 'Anonim',
          verified: false
        },
        content: newPost,
        type: 'text',
        timestamp: 'Şimdi',
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        category: 'Genel'
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowCreatePost(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Hoş geldin, {user?.name}!
        </h1>
        <p className="text-emerald-100">
          İslami değerleri paylaşmaya ve toplulukla bağ kurmaya hazır mısın?
        </p>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-sm font-medium text-emerald-600">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="flex-1 text-left px-4 py-3 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Bugün ne paylaşmak istiyorsun?
          </button>
        </div>

        {showCreatePost && (
          <div className="space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="İslami bir düşünce, ayet, hadis veya tecrübeni paylaş..."
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              rows={4}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                  <Image className="h-5 w-5" />
                  <span className="text-sm">Fotoğraf</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                  <Video className="h-5 w-5" />
                  <span className="text-sm">Video</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm">Makale</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Paylaş
                </button>
              </div>
            </div>
          </div>
        )}

        {!showCreatePost && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
              <Image className="h-5 w-5" />
              <span className="text-sm">Fotoğraf</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
              <Video className="h-5 w-5" />
              <span className="text-sm">Video</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Makale</span>
            </button>
          </div>
        )}
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
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
                      <Globe className="h-3 w-3" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
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
            </div>

            {/* Post Actions */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="text-sm font-medium">{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-8">
        <button className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium">
          Daha Fazla Göster
        </button>
      </div>
    </div>
  );
}