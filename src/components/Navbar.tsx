import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Shield, Trophy, User, Menu, Network } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'CORE', path: '/', icon: Terminal },
  { name: 'VAULT', path: '/vault', icon: Shield },
  { name: 'EVENTS', path: '/events', icon: Shield },
  { name: 'RANK', path: '/leaderboard', icon: Trophy },
  { name: 'RESOURCES', path: '/resources', icon: Network },
  { name: 'PROFILE', path: '/profile/me', icon: User },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-fit">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-full px-6 py-3 flex items-center gap-8 border border-white/10"
      >
        <div className="flex items-center gap-2 mr-4 border-r border-white/10 pr-6">
          <div className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse" />
          <span className="font-mono text-xs tracking-widest font-bold">NEXORA_GDE</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center gap-2 text-[10px] font-mono tracking-tighter transition-all hover:text-[#00FF41] ${isActive ? 'text-[#00FF41]' : 'text-white/50'}`}
              >
                <item.icon size={12} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <button 
          className="md:hidden text-white/50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={16} />
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-full mt-4 left-0 right-0 glass rounded-2xl p-4 flex flex-col gap-4 md:hidden"
        >
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-xs font-mono p-2 hover:bg-white/5 rounded-lg"
            >
              <item.icon size={14} />
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
