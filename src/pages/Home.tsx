import { motion } from 'motion/react';
import Hero3D from '../components/Hero3D';
import ScrambleText from '../components/ScrambleText';
import { ArrowRight, Shield, Cpu, Network } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Hero3D />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-mono text-[10px] tracking-[0.5em] text-[#00FF41] opacity-60 uppercase">
            EST. 2026 // GLOBAL DEVELOPER ELITE
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 leading-none">
          <ScrambleText text="NEXORA-GDE" className="glitch-text" />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white/60 font-mono text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The digital nexus where artificial intelligence meets elite cybersecurity. 
          Forging the next generation of autonomous security systems and neural defense protocols.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="px-8 py-4 bg-[#00FF41] text-black font-bold text-xs tracking-widest hover:bg-white transition-all flex items-center gap-2 group"
          >
            INITIALIZE_PROTOCOL
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('manifesto');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 border border-white/20 text-white font-bold text-xs tracking-widest hover:bg-white/5 transition-all"
          >
            VIEW_MANIFESTO
          </button>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 glass-green p-4 border border-[#00FF41]/20 max-w-md mx-auto"
        >
          <div className="flex items-center justify-between mb-4 border-b border-[#00FF41]/10 pb-2">
            <span className="font-mono text-[10px] text-[#00FF41] flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              LIVE_GRID_ACTIVITY
            </span>
            <span className="font-mono text-[10px] text-white/30">NODES: 4.2K</span>
          </div>
          <div className="space-y-2 text-left">
            {[
              "X-Cyber_01 breached Level 4 firewall",
              "Neural_Ghost uploaded new defense protocol",
              "Void_Walker joined CYBER-STRIKE 2026"
            ].map((log, i) => (
              <div key={i} className="font-mono text-[10px] text-white/60 flex gap-2">
                <span className="text-[#00FF41] opacity-50">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                {log}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Manifesto Section */}
      <section id="manifesto" className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32 mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl font-bold tracking-tighter mb-8 uppercase">
              THE_NEXORA<br /><span className="text-[#00FF41]">MANIFESTO</span>
            </h2>
            <div className="space-y-6 font-mono text-sm text-white/60 leading-relaxed">
              <p>
                In an era of algorithmic dominance, we are the architects of autonomy. Nexora-GDE is not just a community; it is a decentralized intelligence network.
              </p>
              <p>
                Our mission is to bridge the gap between artificial intelligence and cybersecurity, creating self-healing systems that anticipate threats before they manifest.
              </p>
              <p>
                We believe in open-source security, neural transparency, and the absolute protection of digital sovereignty.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "DECENTRALIZATION", val: "100%" },
              { label: "NEURAL_SYNC", val: "ACTIVE" },
              { label: "GRID_UPTIME", val: "99.99%" },
              { label: "ENCRYPTION", val: "AES_4096" }
            ].map((item, i) => (
              <div key={i} className="glass p-8 border border-white/5 flex flex-col justify-between">
                <div className="text-[10px] text-white/30 font-mono">{item.label}</div>
                <div className="text-2xl font-bold font-mono text-[#00FF41]">{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Features Grid */}
      <div className="absolute bottom-24 left-0 right-0 z-10 px-8 hidden lg:block">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
          {[
            { icon: Shield, label: "SEC_PROTOCOLS", value: "4096_BIT" },
            { icon: Cpu, label: "NEURAL_NODES", value: "12.4K_ACTIVE" },
            { icon: Network, label: "GRID_LATENCY", value: "0.002_MS" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.2 }}
              className="glass p-6 border-l-2 border-l-[#00FF41]"
            >
              <div className="flex items-center gap-4">
                <stat.icon className="text-[#00FF41]" size={24} />
                <div>
                  <div className="text-[10px] font-mono text-white/40 mb-1">{stat.label}</div>
                  <div className="text-xl font-bold font-mono">{stat.value}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="fixed bottom-0 left-0 right-0 h-12 glass border-t border-white/10 flex items-center overflow-hidden z-50">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 font-mono text-[10px] tracking-widest text-[#00FF41]">
              LIVE_EVENT: CYBER-STRIKE 2026 // PRIZE_POOL: 50.0K_USDT // STATUS: REGISTRATION_OPEN // 
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </main>
  );
}
