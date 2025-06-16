import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Plus,
  Search,
  Filter,
  Star,
  Share2,
  Bookmark,
  ExternalLink,
  User,
  Phone,
  Mail
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'conference' | 'seminar' | 'workshop' | 'social' | 'charity' | 'religious';
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
  };
  organizer: {
    name: string;
    contact?: string;
  };
  capacity: number;
  attendees: number;
  price: number;
  isOnline: boolean;
  isAttending: boolean;
  isBookmarked: boolean;
  image?: string;
  tags: string[];
  requirements?: string[];
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'İslam\'da Aile Hayatı Semineri',
    description: 'İslami değerler çerçevesinde aile kurumu, eş seçimi, çocuk eğitimi ve aile içi iletişim konularında uzman görüşleri.',
    type: 'seminar',
    date: '2024-02-15',
    time: '14:00',
    location: {
      name: 'Fatih Camii Konferans Salonu',
      address: 'Fevzi Paşa Cad. No:1',
      city: 'İstanbul'
    },
    organizer: {
      name: 'İstanbul İslami Araştırmalar Merkezi',
      contact: '+90 212 555 0123'
    },
    capacity: 200,
    attendees: 156,
    price: 0,
    isOnline: false,
    isAttending: true,
    isBookmarked: true,
    image: 'https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['aile', 'evlilik', 'eğitim'],
    requirements: ['Ön kayıt gerekli', 'Kimlik ibrazı']
  },
  {
    id: '2',
    title: 'Kur\'an-ı Kerim Tecvid Kursu',
    description: 'Başlangıç seviyesinden ileri seviyeye Kur\'an-ı Kerim\'i güzel okuma sanatı. 8 haftalık yoğun program.',
    type: 'workshop',
    date: '2024-02-20',
    time: '19:00',
    location: {
      name: 'Online Platform',
      address: 'Zoom Üzerinden',
      city: 'Online'
    },
    organizer: {
      name: 'Hafız Mehmet Yılmaz',
      contact: 'mehmet@tecvid.com'
    },
    capacity: 50,
    attendees: 23,
    price: 150,
    isOnline: true,
    isAttending: false,
    isBookmarked: true,
    tags: ['kur\'an', 'tecvid', 'online'],
    requirements: ['Mikrofon ve kamera', 'Mushaf']
  },
  {
    id: '3',
    title: 'Gençlik Buluşması - İslam ve Modern Hayat',
    description: 'Genç Müslümanların modern hayatta karşılaştığı zorluklar ve çözüm önerileri üzerine interaktif sohbet.',
    type: 'social',
    date: '2024-02-25',
    time: '15:30',
    location: {
      name: 'Beyazıt Gençlik Merkezi',
      address: 'Beyazıt Meydanı',
      city: 'İstanbul'
    },
    organizer: {
      name: 'Genç Müslümanlar Derneği',
      contact: '+90 212 555 0456'
    },
    capacity: 100,
    attendees: 67,
    price: 0,
    isOnline: false,
    isAttending: false,
    isBookmarked: false,
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['gençlik', 'sohbet', 'modern hayat']
  },
  {
    id: '4',
    title: 'Hayır Kermesi - Yetim Çocuklar İçin',
    description: 'Yetim çocukların eğitim masrafları için düzenlenen hayır kermesi. Çeşitli aktiviteler ve satış standları.',
    type: 'charity',
    date: '2024-03-01',
    time: '10:00',
    location: {
      name: 'Sultanahmet Meydanı',
      address: 'Sultanahmet',
      city: 'İstanbul'
    },
    organizer: {
      name: 'Yardımlaşma Derneği',
      contact: '+90 212 555 0789'
    },
    capacity: 500,
    attendees: 234,
    price: 0,
    isOnline: false,
    isAttending: true,
    isBookmarked: true,
    tags: ['hayır', 'yetim', 'kermes'],
    requirements: ['Gönüllü yardım memnuniyetle karşılanır']
  },
  {
    id: '5',
    title: 'Hac ve Umre Hazırlık Semineri',
    description: 'Hac ve umre ibadetlerinin fıkhi boyutu, pratik bilgiler ve manevi hazırlık süreci hakkında kapsamlı seminer.',
    type: 'religious',
    date: '2024-03-10',
    time: '13:00',
    location: {
      name: 'Süleymaniye Camii',
      address: 'Prof. Sıddık Sami Onar Cd.',
      city: 'İstanbul'
    },
    organizer: {
      name: 'Hac ve Umre Rehberleri Derneği',
      contact: '+90 212 555 0321'
    },
    capacity: 300,
    attendees: 189,
    price: 25,
    isOnline: false,
    isAttending: false,
    isBookmarked: false,
    image: 'https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['hac', 'umre', 'ibadet']
  }
];

const eventTypes = [
  { id: 'all', name: 'Tümü', icon: Calendar },
  { id: 'conference', name: 'Konferans', icon: Users },
  { id: 'seminar', name: 'Seminer', icon: Star },
  { id: 'workshop', name: 'Atölye', icon: User },
  { id: 'social', name: 'Sosyal', icon: Users },
  { id: 'charity', name: 'Hayır', icon: Star },
  { id: 'religious', name: 'Dini', icon: Calendar }
];

export default function Events() {
  const [events, setEvents] = useState(sampleEvents);
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesOnline = !showOnlineOnly || event.isOnline;
    const matchesFree = !showFreeOnly || event.price === 0;
    return matchesType && matchesSearch && matchesOnline && matchesFree;
  });

  const handleAttend = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? {
            ...event,
            isAttending: !event.isAttending,
            attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1
          }
        : event
    ));
  };

  const handleBookmark = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, isBookmarked: !event.isBookmarked }
        : event
    ));
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      conference: 'bg-blue-100 text-blue-800',
      seminar: 'bg-emerald-100 text-emerald-800',
      workshop: 'bg-purple-100 text-purple-800',
      social: 'bg-pink-100 text-pink-800',
      charity: 'bg-amber-100 text-amber-800',
      religious: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Etkinlikler</h1>
          <p className="text-gray-600 mt-1">İslami etkinlikleri keşfedin ve katılın</p>
        </div>
        <button className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Etkinlik Oluştur</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Etkinlik ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === type.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <type.icon className="h-4 w-4" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Sadece online</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={(e) => setShowFreeOnly(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Sadece ücretsiz</span>
            </label>
          </div>
        </div>
      </div>

      {/* My Events */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Katıldığım Etkinlikler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.filter(e => e.isAttending).slice(0, 3).map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                  {eventTypes.find(t => t.id === event.type)?.name}
                </span>
                {event.isOnline && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    Online
                  </span>
                )}
              </div>
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{event.location.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Event Image */}
            {event.image && (
              <div className="h-48 bg-gradient-to-r from-emerald-500 to-emerald-600 relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {eventTypes.find(t => t.id === event.type)?.name}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  {event.isOnline && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Online
                    </span>
                  )}
                  {event.price === 0 && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      Ücretsiz
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{event.description}</p>
              </div>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  <span>{formatDate(event.date)}</span>
                  <Clock className="h-4 w-4 text-emerald-600 ml-2" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <div>
                    <div>{event.location.name}</div>
                    <div className="text-xs text-gray-500">{event.location.city}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4 text-emerald-600" />
                  <span>{event.organizer.name}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4 text-emerald-600" />
                  <span>{event.attendees}/{event.capacity} katılımcı</span>
                </div>
              </div>

              {/* Tags */}
              {event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Price */}
              <div className="mb-4">
                <span className="text-lg font-bold text-gray-900">
                  {event.price === 0 ? 'Ücretsiz' : `₺${event.price}`}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleBookmark(event.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      event.isBookmarked ? 'text-amber-500 bg-amber-50' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${event.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => handleAttend(event.id)}
                  disabled={event.attendees >= event.capacity && !event.isAttending}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    event.isAttending
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : event.attendees >= event.capacity
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {event.isAttending 
                    ? 'Katılımı İptal Et' 
                    : event.attendees >= event.capacity 
                    ? 'Dolu' 
                    : 'Katıl'
                  }
                </button>
              </div>
            </div>

            {/* Event Details Modal */}
            {selectedEvent === event.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-6">
                <h4 className="font-medium text-gray-900 mb-3">Etkinlik Detayları</h4>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Tam Adres:</span>
                    <p className="text-gray-600">{event.location.address}, {event.location.city}</p>
                  </div>
                  
                  {event.organizer.contact && (
                    <div>
                      <span className="font-medium text-gray-700">İletişim:</span>
                      <p className="text-gray-600">{event.organizer.contact}</p>
                    </div>
                  )}
                  
                  {event.requirements && (
                    <div>
                      <span className="font-medium text-gray-700">Gereksinimler:</span>
                      <ul className="text-gray-600 list-disc list-inside">
                        {event.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Etkinlik bulunamadı</h3>
          <p className="text-gray-600 mb-4">
            Aradığınız kriterlere uygun etkinlik bulunamadı. Filtreleri değiştirmeyi deneyin.
          </p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Tüm Etkinlikleri Göster
          </button>
        </div>
      )}
    </div>
  );
}