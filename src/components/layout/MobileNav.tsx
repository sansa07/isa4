import React from 'react';
import { useLocation } from 'wouter';
import { Home, Compass, Users, Heart, User } from 'lucide-react';

const navigation = [
  { name: 'Ana Sayfa', href: '/', icon: Home },
  { name: 'Keşfet', href: '/explore', icon: Compass },
  { name: 'Topluluk', href: '/communities', icon: Users },
  { name: 'Dualar', href: '/dua-requests', icon: Heart },
  { name: 'Profil', href: '/profile', icon: User },
];

export default function MobileNav() {
  const [location, setLocation] = useLocation();

  return (
    <div className="lg:hidden">
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-emerald-100 z-50">
        <div className="grid grid-cols-5 py-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <button
                key={item.name}
                onClick={() => setLocation(item.href)}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-all ${
                  isActive ? 'text-emerald-600' : 'text-gray-400'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}