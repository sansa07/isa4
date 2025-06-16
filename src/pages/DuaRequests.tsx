import React, { useState } from 'react';
import { 
  Heart, 
  Plus, 
  MessageCircle, 
  Clock, 
  Users, 
  Filter,
  Search,
  Send,
  X,
  Bookmark,
  Share2,
  Flag
} from 'lucide-react';

interface DuaRequest {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isAnonymous: boolean;
  };
  title: string;
  content: string;
  category: string;
  isUrgent: boolean;
  timestamp: string;
  prayers: number;
  comments: number;
  isPrayed: boolean;
  isBookmarked: boolean;
  tags: string[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isPrayer: boolean;
}

const sampleDuaRequests: DuaRequest[] = [
  {
    id: '1',
    author: {
      name: 'Ayşe K.',
      isAnonymous: true
    },
    title: 'Annem için şifa duası',
    content: 'Sevgili kardeşlerim, annem geçirdiği ameliyat sonrası iyileşme sürecinde. Kendisi için dua etmenizi rica ediyorum. Allah şifa versin inşallah.',
    category: 'Sağlık',
    isUrgent: true,
    timestamp: '2 saat önce',
    prayers: 156,
    comments: 23,
    isPrayed: false,
    isBookmarked: true,
    tags: ['şifa', 'aile', 'ameliyat']
  },
  {
    id: '2',
    author: {
      name: 'Mehmet Yılmaz',
      isAnonymous: false
    },
    title: 'İş bulabilmek için',
    content: 'Uzun süredir iş arıyorum. Ailemi geçindirmekte zorlanıyorum. Bana uygun bir iş bulabilmem için dualarınızı bekliyorum.',
    category: 'İş & Kariyer',
    isUrgent: false,
    timestamp: '5 saat önce',
    prayers: 89,
    comments: 12,
    isPrayed: true,
    isBookmarked: false,
    tags: ['iş', 'aile', 'geçim']
  },
  {
    id: '3',
    author: {
      name: 'Fatma S.',
      isAnonymous: true
    },
    title: 'Evlilik için dua',
    content: 'Hayırlı bir eş bulabilmem ve mutlu bir yuva kurabilmem için dualarınızı istiyorum. Allah nasip etsin.',
    category: 'Aile',
    isUrgent: false,
    timestamp: '1 gün önce',
    prayers: 234,
    comments: 45,
    isPrayed: false,
    isBookmarked: true,
    tags: ['evlilik', 'hayırlı eş', 'yuva']
  },
  {
    id: '4',
    author: {
      name: 'Ali Demir',
      isAnonymous: false
    },
    title: 'Sınav başarısı için',
    content: 'Yaklaşan üniversite sınavım için çok çalışıyorum. Başarılı olabilmem ve hedeflediğim bölümü kazanabilmem için dua edin lütfen.',
    category: 'Eğitim',
    isUrgent: true,
    timestamp: '3 saat önce',
    prayers: 67,
    comments: 8,
    isPrayed: true,
    isBookmarked: false,
    tags: ['sınav', 'üniversite', 'başarı']
  }
];

const categories = ['Tümü', 'Sağlık', 'Aile', 'İş & Kariyer', 'Eğitim', 'Manevi', 'Diğer'];

const sampleComments: { [key: string]: Comment[] } = {
  '1': [
    {
      id: '1',
      author: 'Zeynep Kaya',
      content: 'Anneniz için dua ediyorum. Allah şifa versin inşallah. 🤲',
      timestamp: '1 saat önce',
      isPrayer: true
    },
    {
      id: '2',
      author: 'Ahmet Özkan',
      content: 'Rabbim şifa versin, sabır versin. Dualarımdasınız.',
      timestamp: '30 dakika önce',
      isPrayer: true
    }
  ]
};

export default function DuaRequests() {
  const [duaRequests, setDuaRequests] = useState(sampleDuaRequests);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    content: '',
    category: 'Sağlık',
    isUrgent: false,
    isAnonymous: false,
    tags: ''
  });

  const filteredRequests = duaRequests.filter(request => {
    const matchesCategory = selectedCategory === 'Tümü' || request.category === selectedCategory;
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesUrgent = !showUrgentOnly || request.isUrgent;
    return matchesCategory && matchesSearch && matchesUrgent;
  });

  const handlePray = (requestId: string) => {
    setDuaRequests(duaRequests.map(request =>
      request.id === requestId
        ? {
            ...request,
            isPrayed: !request.isPrayed,
            prayers: request.isPrayed ? request.prayers - 1 : request.prayers + 1
          }
        : request
    ));
  };

  const handleBookmark = (requestId: string) => {
    setDuaRequests(duaRequests.map(request =>
      request.id === requestId
        ? { ...request, isBookmarked: !request.isBookmarked }
        : request
    ));
  };

  const handleCreateRequest = () => {
    if (newRequest.title && newRequest.content) {
      const request: DuaRequest = {
        id: Date.now().toString(),
        author: {
          name: newRequest.isAnonymous ? 'Anonim' : 'Siz',
          isAnonymous: newRequest.isAnonymous
        },
        title: newRequest.title,
        content: newRequest.content,
        category: newRequest.category,
        isUrgent: newRequest.isUrgent,
        timestamp: 'Şimdi',
        prayers: 0,
        comments: 0,
        isPrayed: false,
        isBookmarked: false,
        tags: newRequest.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setDuaRequests([request, ...duaRequests]);
      setNewRequest({
        title: '',
        content: '',
        category: 'Sağlık',
        isUrgent: false,
        isAnonymous: false,
        tags: ''
      });
      setShowCreateModal(false);
    }
  };

  const handleAddComment = (requestId: string) => {
    if (newComment.trim()) {
      // In a real app, this would be handled by the backend
      setNewComment('');
      setDuaRequests(duaRequests.map(request =>
        request.id === requestId
          ? { ...request, comments: request.comments + 1 }
          : request
      ));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dua İstekleri</h1>
          <p className="text-gray-600 mt-1">Kardeşlerinizin dua isteklerini görün ve dua edin</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Dua İsteği</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Dua isteği ara..."
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
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showUrgentOnly}
                onChange={(e) => setShowUrgentOnly(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Sadece acil</span>
            </label>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Toplam Dua</h3>
          <p className="text-2xl font-bold text-red-500">
            {duaRequests.reduce((sum, req) => sum + req.prayers, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Aktif İstek</h3>
          <p className="text-2xl font-bold text-emerald-600">{duaRequests.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Toplam Yorum</h3>
          <p className="text-2xl font-bold text-blue-600">
            {duaRequests.reduce((sum, req) => sum + req.comments, 0)}
          </p>
        </div>
      </div>

      {/* Dua Requests */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-emerald-600">
                      {request.author.isAnonymous ? '?' : request.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">
                        {request.author.isAnonymous ? 'Anonim' : request.author.name}
                      </h3>
                      {request.isUrgent && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                          Acil
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{request.timestamp}</span>
                      <span>•</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {request.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Flag className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h4>
                <p className="text-gray-700 leading-relaxed">{request.content}</p>
              </div>

              {/* Tags */}
              {request.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {request.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handlePray(request.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      request.isPrayed ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${request.isPrayed ? 'fill-current' : ''}`} />
                    <span className="font-medium">{request.prayers}</span>
                    <span className="text-sm">Dua</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{request.comments}</span>
                    <span className="text-sm">Yorum</span>
                  </button>
                  
                  <button
                    onClick={() => handleBookmark(request.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      request.isBookmarked ? 'text-amber-500' : 'text-gray-500 hover:text-amber-500'
                    }`}
                  >
                    <Bookmark className={`h-5 w-5 ${request.isBookmarked ? 'fill-current' : ''}`} />
                    <span className="text-sm">Kaydet</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="text-sm">Paylaş</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            {selectedRequest === request.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-6">
                <h5 className="font-medium text-gray-900 mb-4">Dualar ve Yorumlar</h5>
                
                {/* Add Comment */}
                <div className="flex space-x-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-emerald-600">S</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Dua edin veya destek mesajı yazın..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => handleAddComment(request.id)}
                        disabled={!newComment.trim()}
                        className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-4 w-4" />
                        <span>Gönder</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-3">
                  {(sampleComments[request.id] || []).map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {comment.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-white rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900 text-sm">{comment.author}</span>
                            {comment.isPrayer && (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                                🤲 Dua
                              </span>
                            )}
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Dua İsteği Oluştur</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlık
                </label>
                <input
                  type="text"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Dua isteğinizin başlığı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={newRequest.content}
                  onChange={(e) => setNewRequest({...newRequest, content: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Dua isteğinizi detaylı olarak açıklayın"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={newRequest.category}
                  onChange={(e) => setNewRequest({...newRequest, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Etiketler (virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={newRequest.tags}
                  onChange={(e) => setNewRequest({...newRequest, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="şifa, aile, iş"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newRequest.isUrgent}
                    onChange={(e) => setNewRequest({...newRequest, isUrgent: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Acil dua isteği</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newRequest.isAnonymous}
                    onChange={(e) => setNewRequest({...newRequest, isAnonymous: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Anonim olarak paylaş</span>
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
                onClick={handleCreateRequest}
                disabled={!newRequest.title || !newRequest.content}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Paylaş
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Dua isteği bulunamadı</h3>
          <p className="text-gray-600 mb-4">
            Aradığınız kriterlere uygun dua isteği bulunamadı.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            İlk Dua İsteğini Oluştur
          </button>
        </div>
      )}
    </div>
  );
}