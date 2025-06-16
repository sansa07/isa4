import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ThemeSelector } from '../ui/theme-selector';
import { motion } from 'framer-motion';
import { Moon, Star, Bell, Search, Menu } from 'lucide-react';

interface MobileHeaderProps {
  onMenuClick?: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const { user } = useAuth();

  return (
    <div className="lg:hidden">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex h-16 items-center justify-between bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 px-4"
      >
        {/* Left side */}
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-5 w-5" />
          </motion.button>

          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Moon className="h-5 w-5 text-white" />
              </div>
              <Star className="h-3 w-3 text-amber-500 absolute -top-0.5 -right-0.5" />
            </div>
            <div>
              <h1 className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                İslami Paylaşım
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          <motion.button 
            className="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-lg"
            whileTap={{ scale: 0.95 }}
          >
            <Search className="h-5 w-5" />
          </motion.button>
          
          <motion.button 
            className="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors relative rounded-lg"
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-5 w-5" />
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"
            />
          </motion.button>

          <ThemeSelector />
          
          {user && (
            <motion.div 
              className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} className="h-full w-full rounded-full object-cover" />
              ) : (
                <span className="text-sm font-medium text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}