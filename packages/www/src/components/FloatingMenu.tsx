import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Home,
  Activity,
  Wallet,
  Rocket,
  ShoppingCart,
  Menu,
  X,
  Zap,
  Gamepad2,
  Settings,
  User,
  Bell,
  Compass
} from 'lucide-react';

interface FloatingMenuProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function FloatingMenu({ activeSection, setActiveSection }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const menuItems = [
    {
      id: 'home',
      name: 'Home',
      icon: Home,
      color: 'from-blue-400 to-cyan-500',
      description: 'Dashboard Overview'
    },
    {
      id: 'control-room',
      name: 'Control Room',
      icon: Activity,
      color: 'from-green-400 to-emerald-500',
      description: 'Live Monitoring'
    },
    {
      id: 'wallet',
      name: 'Wallet',
      icon: Wallet,
      color: 'from-purple-400 to-pink-500',
      description: 'Digital Assets'
    },
    {
      id: 'launchpad',
      name: 'Launchpad',
      icon: Rocket,
      color: 'from-orange-400 to-red-500',
      description: 'New Projects'
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      icon: ShoppingCart,
      color: 'from-yellow-400 to-orange-500',
      description: 'NFT Trading'
    }
  ];

  const handleMenuItemClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Main Floating Button */}
      <motion.div
        className={`fixed ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'} z-50 p-1`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={toggleMenu}
          className="relative w-14 h-14 bg-gradient-to-br from-primary via-accent to-purple-500 rounded-full shadow-2xl backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(0, 212, 255, 0.5)',
              '0 0 30px rgba(0, 255, 136, 0.5)',
              '0 0 20px rgba(0, 212, 255, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"></div>
          
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Menu Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Gamepad2 className="w-6 h-6 text-white" />
            )}
          </motion.div>



          {/* Scanning Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400/50 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>

        {/* Notification Badge - Outside button but positioned over it */}
        {notifications > 0 && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="text-xs text-white font-bold">{notifications}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          >
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            
            {/* Menu Items Container */}
            <div className={`absolute ${isMobile ? 'bottom-24 right-6' : 'bottom-24 right-8'}`}>
              <motion.div
                className="flex flex-col space-y-3"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              >
                {/* Menu Items */}
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 100, opacity: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-center"
                    >
                      {/* Label */}
                      <motion.div
                        className={`${isMobile ? 'mr-3' : 'mr-4'} px-3 py-2 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 shadow-lg`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-right">
                          <p className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-white`}>
                            {item.name}
                          </p>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300`}>
                            {item.description}
                          </p>
                        </div>
                      </motion.div>

                      {/* Menu Button */}
                      <motion.button
                        onClick={() => handleMenuItemClick(item.id)}
                        className={`relative w-12 h-12 rounded-full backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center group overflow-hidden ${
                          isActive 
                            ? `bg-gradient-to-br ${item.color}` 
                            : 'bg-black/60 hover:bg-black/80'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={isActive ? {
                          boxShadow: [
                            '0 0 15px rgba(0, 212, 255, 0.5)',
                            '0 0 25px rgba(0, 255, 136, 0.5)',
                            '0 0 15px rgba(0, 212, 255, 0.5)'
                          ]
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {/* Glass overlay */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"></div>
                        
                        {/* Icon */}
                        <Icon className={`w-6 h-6 relative z-10 ${
                          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`} />

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 border-2 border-white/50 rounded-full"
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.8, 0.4, 0.8],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                      </motion.button>
                    </motion.div>
                  );
                })}

                {/* Additional Controls */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ delay: menuItems.length * 0.1, duration: 0.3 }}
                  className="pt-2 border-t border-white/20 flex items-center justify-end space-x-2"
                >
                  {/* Settings */}
                  <motion.button
                    className="w-8 h-8 bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Settings className="w-4 h-4 text-gray-300" />
                  </motion.button>

                  {/* Notifications */}
                  <motion.button
                    className="relative w-8 h-8 bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bell className="w-4 h-4 text-gray-300" />
                    {notifications > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border border-white shadow-sm"></div>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
}