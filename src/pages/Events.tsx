import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  status: string;
  description: string;
  image: string;
  location: string;
  participants: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState('UPCOMING');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const filteredEvents = events.filter(e => e.status === activeTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const el = document.getElementById('events-grid');
    el?.scrollIntoView({ behavior: 'smooth' });
    
    // Trigger a global event for 3D background
    window.dispatchEvent(new CustomEvent('3d-burst'));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-5xl font-bold tracking-tighter">SYSTEM_EVENTS</h2>
          {events.some(e => e.status === 'LIVE') && (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/50 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-red-500 font-bold">LIVE_NOW</span>
            </div>
          )}
        </div>
        <div className="flex gap-4 border-b border-white/10 pb-4">
          {['LIVE', 'UPCOMING', 'PAST'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`font-mono text-xs tracking-widest px-4 py-2 transition-all ${activeTab === tab ? 'text-[#00FF41] border-b-2 border-[#00FF41]' : 'text-white/40 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div id="events-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass group overflow-hidden border border-white/10 hover:border-[#00FF41]/50 transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full">
                <span className={`font-mono text-[10px] ${event.status === 'LIVE' ? 'text-red-500 animate-pulse' : 'text-[#00FF41]'}`}>
                  {event.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 font-mono tracking-tight">{event.title}</h3>
              <p className="text-white/50 text-xs mb-6 font-mono leading-relaxed">
                {event.description}
              </p>
              
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                  <Calendar size={12} className="text-[#00FF41]" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                  <MapPin size={12} className="text-[#00FF41]" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                  <Users size={12} className="text-[#00FF41]" />
                  {event.participants}_PARTICIPANTS
                </div>
              </div>

              <button className="w-full py-3 bg-white/5 border border-white/10 text-[10px] font-mono tracking-[0.2em] hover:bg-[#00FF41] hover:text-black transition-all flex items-center justify-center gap-2">
                REGISTER_NODE <ExternalLink size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
