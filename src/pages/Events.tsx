import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Eye, Zap, Calendar, MapPin, Clock, Trophy, Users, Search, ChevronRight, ShieldCheck } from 'lucide-react';
import ScrambleText from '../components/ScrambleText';
import { useEffect, useState } from 'react';
import { TiltCard } from '../components/TiltCard';

interface Event {
  id: number;
  title: string;
  type: string;
  category: string;
  date: string;
  status: 'Live' | 'Upcoming' | 'Past';
  description: string;
  image: string;
  location: string;
  participants: string;
  participantsCount: number;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Live' | 'Upcoming' | 'Past'>('All');
  const [search, setSearch] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  const handleRegister = (eventId: number) => {
    if (registeredEvents.includes(eventId)) return;
    
    setRegisteredEvents([...registeredEvents, eventId]);
    const event = events.find(e => e.id === eventId);
    if (event) {
      setShowSuccess(event.title);
      setTimeout(() => setShowSuccess(null), 3000);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'All' || event.status === filter;
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                          event.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-[#00FF41] text-black px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 border border-white/20"
          >
            <ShieldCheck className="h-5 w-5" />
            <span className="font-mono font-bold text-xs">SUCCESSFULLY REGISTERED FOR {showSuccess.toUpperCase()}!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div className="border-l-4 border-[#00FF41] pl-8">
          <h2 className="text-6xl font-bold tracking-tighter mb-4 uppercase">
            <ScrambleText text="COMMUNITY_EVENTS" />
          </h2>
          <p className="font-mono text-sm text-white/40 max-w-xl">
            Discover Nexora-GDE hackathons, workshops, and challenges. Authorization level: ELITE_GDE.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input 
              type="text" 
              placeholder="SEARCH_GRID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-white focus:border-[#00FF41] outline-none w-full sm:w-64 transition-all"
            />
          </div>
          <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
            {['All', 'Live', 'Upcoming', 'Past'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-1.5 rounded-md text-[10px] font-mono font-bold transition-all uppercase ${
                  filter === f 
                    ? 'bg-[#00FF41] text-black shadow-lg' 
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#00FF41] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <TiltCard intensity={10} className="h-full">
                  <div className="glass border border-white/5 hover:border-[#00FF41]/30 transition-all group flex flex-col h-full overflow-hidden preserve-3d">
                    <div className="relative h-48 overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono ${
                          event.status === 'Live' ? 'bg-red-500 text-white animate-pulse' :
                          event.status === 'Upcoming' ? 'bg-[#00FF41] text-black' :
                          'bg-white/20 text-white'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[9px] font-bold text-white uppercase tracking-wider border border-white/10 font-mono">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col" style={{ transform: 'translateZ(40px)' }}>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00FF41] transition-colors uppercase tracking-tight font-mono">
                        {event.title}
                      </h3>
                      <p className="text-white/50 font-mono text-xs line-clamp-2 mb-6 leading-relaxed">
                        {event.description}
                      </p>
                      
                      <div className="space-y-3 mb-8 flex-grow">
                        <div className="flex items-center text-[10px] font-mono text-white/40">
                          <Calendar className="h-3.5 w-3.5 mr-2 text-[#00FF41]" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-[10px] font-mono text-white/40">
                          <MapPin className="h-3.5 w-3.5 mr-2 text-[#00FF41]" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-[10px] font-mono text-white/40">
                          <Users className="h-3.5 w-3.5 mr-2 text-[#00FF41]" />
                          {(event.participantsCount + (registeredEvents.includes(event.id) ? 1 : 0)).toLocaleString()}+ REGISTERED
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleRegister(event.id)}
                        disabled={event.status === 'Past' || registeredEvents.includes(event.id)}
                        className={`w-full py-3 text-[10px] font-mono flex items-center justify-center rounded font-bold transition-all border uppercase tracking-widest ${
                          registeredEvents.includes(event.id)
                            ? 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]/30 cursor-default'
                            : event.status === 'Past'
                            ? 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed'
                            : 'bg-transparent text-[#00FF41] border-[#00FF41]/30 hover:bg-[#00FF41] hover:text-black shadow-lg'
                        }`}
                      >
                        {registeredEvents.includes(event.id) ? (
                          <>
                            <ShieldCheck className="mr-2 h-4 w-4" /> REGISTERED
                          </>
                        ) : event.status === 'Past' ? (
                          'EVENT_TERMINATED'
                        ) : (
                          <>
                            REGISTER_NOW <ChevronRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20 glass border border-white/5 rounded-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                <Search className="h-8 w-8 text-white/20" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase font-mono">NO_EVENTS_FOUND</h3>
              <p className="text-white/40 font-mono text-xs mt-2">Adjust your grid filters or search query.</p>
            </div>
          )}
        </>
      )}

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-12 border-t-2 border-[#00FF41]">
          <Zap className="text-[#00FF41] mb-6" size={32} />
          <h4 className="text-2xl font-bold mb-4 font-mono">NEURAL_SYNC_STATUS</h4>
          <div className="space-y-4">
            {[85, 42, 91].map((val, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-white/40">
                  <span>HOME_NODE_0{i+1}</span>
                  <span>{val}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${val}%` }}
                    className="h-full bg-[#00FF41]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-12 border-t-2 border-white/10">
          <Shield className="text-white/40 mb-6" size={32} />
          <h4 className="text-2xl font-bold mb-4 font-mono">GRID_INTEGRITY</h4>
          <p className="text-white/40 font-mono text-xs leading-relaxed">
            Nexora-GDE grid is currently operating at 99.98% efficiency. No unauthorized breaches detected in the last 72 cycles.
          </p>
          <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#00FF41]">SYS_OK</span>
            <span className="font-mono text-[10px] text-white/20">LAST_SCAN: 0.2MS_AGO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
