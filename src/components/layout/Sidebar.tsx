import React from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../../hooks/useAuth';
import { ThemeSelector } from '../ui/theme-selector';
import { motion } from 'framer-motion';
import { 
  Home, 
  Compass, 
  Users, 
  BookOpen, 
  Heart, 
  Calendar,
  Clock,
  User,
  Settings,
  Shield,
  Moon,
  Star,
  LogOut,
  Bell,
  Bookmark
} from 'lucide-react';

const navigation = [
  { name: 'Ana Sayfa', href: '/', icon: Home },
  { name: 'Keşfet', href: '/explore', icon: Compass },
  { name: 'Topluluklar', href: '/communities', icon: Users },
  { name: 'Kur\'an & Hadis', href: '/quran-hadith', icon: BookOpen },
  { name: 'Dua İstekleri', href: '/dua-requests', icon: Heart },
  { name: 'Etkinlikler', href: '/events', icon: Calendar },
  { name: 'Namaz Vakitleri', href: '/prayer-times', icon: Clock },
  { name: 'Günlük Hikmet', href: '/daily-wisdom', icon: Star },
];

export default function Sidebar() {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 px-6 pb-4"
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Moon className="h-6 w-6 text-white" />
              </div>
              <Star className="h-4 w-4 text-amber-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                İslami Paylaşım
              </h1>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Sosyal Platform</p>
            </div>
          </motion.div>
        </div>

        {/* User Info */}
        {user && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold shadow-lg">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} className="h-full w-full rounded-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate">
                  @{user.username}
                </p>
              </div>
              {user.verified && (
                <div className="h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="space-y-2">
                {navigation.map((item, index) => {
                  const isActive = location === item.href;
                  return (
                    <motion.li 
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <motion.button
                        onClick={() => setLocation(item.href)}
                        className={`group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold w-full text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                            : 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                        }`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 transition-colors ${
                            isActive ? 'text-white' : 'text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                          }`}
                        />
                        {item.name}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto h-2 w-2 bg-white rounded-full"
                          />
                        )}
                      </motion.button>
                    </motion.li>
                  );
                })}
              </ul>
            </li>

            {/* User Section */}
            <li className="mt-auto">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                {/* Notifications */}
                <motion.button
                  className="group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold w-full text-left text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Bell className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                  Bildirimler
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </motion.button>

                {/* Bookmarks */}
                <motion.button
                  className="group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold w-full text-left text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Bookmark className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                  Kaydedilenler
                </motion.button>

                {/* Profile */}
                <motion.button
                  onClick={() => setLocation('/profile')}
                  className="group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold w-full text-left text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                  Profilim
                </motion.button>

                {/* Admin Panel */}
                {user?.role === 'admin' && (
                  <motion.button
                    onClick={() => setLocation('/admin')}
                    className="group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold w-full text-left text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Shield className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                    Admin Panel
                  </motion.button>
                )}

                {/* Settings */}
                <motion.button 
                  className="group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold w-full text-left text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Settings className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                  Ayarlar
                </motion.button>

                {/* Theme Selector */}
                <div className="flex justify-center pt-2">
                  <ThemeSelector />
                </div>

                {/* Logout */}
                <motion.button
                  onClick={logout}
                  className="group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold w-full text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="h-6 w-6 shrink-0 text-red-500" />
                  Çıkış Yap
                </motion.button>
              </div>
            </li>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
}