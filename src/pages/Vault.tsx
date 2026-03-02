import { motion } from 'motion/react';
import { Shield, Lock, Eye, Zap } from 'lucide-react';
import ScrambleText from '../components/ScrambleText';

export default function Vault() {
  const missions = [
    { title: "PROJECT_NEURAL_SHIELD", status: "ENCRYPTED", level: "O5", desc: "Autonomous defense layer for distributed LLM architectures." },
    { title: "OPERATION_VOID_WALKER", status: "ACTIVE", level: "ALPHA", desc: "Stealth penetration testing protocols for Web3 infrastructure." },
    { title: "GHOST_PROTOCOL_V2", status: "DECRYPTING", level: "BETA", desc: "Zero-knowledge proof implementation for identity obfuscation." },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto">
      <div className="mb-16 border-l-4 border-[#00FF41] pl-8">
        <h2 className="text-6xl font-bold tracking-tighter mb-4 uppercase">
          <ScrambleText text="MISSION_VAULT" />
        </h2>
        <p className="font-mono text-sm text-white/40 max-w-xl">
          Accessing classified Nexora-GDE operational data. Authorization level: ELITE_GDE.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {missions.map((mission, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 hover:border-[#00FF41]/30 transition-all group"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 glass flex items-center justify-center text-[#00FF41] group-hover:scale-110 transition-transform">
                {mission.status === 'ENCRYPTED' ? <Lock size={24} /> : <Eye size={24} />}
              </div>
              <div>
                <h3 className="text-2xl font-bold font-mono mb-1">{mission.title}</h3>
                <div className="flex gap-4">
                  <span className="text-[10px] font-mono text-[#00FF41]">{mission.status}</span>
                  <span className="text-[10px] font-mono text-white/30">LEVEL: {mission.level}</span>
                </div>
              </div>
            </div>

            <p className="text-white/50 font-mono text-xs max-w-md md:text-right">
              {mission.desc}
            </p>

            <button className="px-6 py-3 border border-[#00FF41]/20 text-[#00FF41] font-mono text-[10px] tracking-widest hover:bg-[#00FF41] hover:text-black transition-all">
              ACCESS_DATA
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-12 border-t-2 border-[#00FF41]">
          <Zap className="text-[#00FF41] mb-6" size={32} />
          <h4 className="text-2xl font-bold mb-4 font-mono">NEURAL_SYNC_STATUS</h4>
          <div className="space-y-4">
            {[85, 42, 91].map((val, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-white/40">
                  <span>CORE_NODE_0{i+1}</span>
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
