import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Shield, Zap, Target } from 'lucide-react';
import ScrambleText from '../components/ScrambleText';

interface LeaderboardUser {
  id: number;
  name: string;
  points: number;
  skills: string[];
  rank: number;
  country: string;
  accuracy: string;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 max-w-5xl mx-auto">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF41]/5 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-5xl font-bold tracking-tighter mb-2 uppercase">
              <ScrambleText text="GLOBAL_RANK" />
            </h2>
            <p className="font-mono text-xs text-white/40">TOP_NODES_IN_THE_NEXORA_GRID</p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-3xl font-bold text-[#00FF41] font-mono">12,482</div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">TOTAL_ACTIVE_MEMBERS</div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "AVG_ACCURACY", val: "94.2%" },
            { label: "GRID_UPTIME", val: "99.9%" },
            { label: "TOTAL_EXP", val: "1.2M" },
            { label: "ACTIVE_NODES", val: "4.2K" }
          ].map((s, i) => (
            <div key={i} className="glass p-4 border border-white/5">
              <div className="text-[8px] font-mono text-white/30 mb-1">{s.label}</div>
              <div className="text-lg font-bold font-mono text-[#00FF41]">{s.val}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {users.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass p-6 flex items-center gap-8 border ${user.rank <= 3 ? 'border-[#00FF41]/30 bg-[#00FF41]/5' : 'border-white/5'}`}
            >
              <div className="w-12 h-12 flex items-center justify-center font-mono text-2xl font-bold">
                {user.rank === 1 ? <Trophy className="text-yellow-500" /> : 
                 user.rank === 2 ? <Shield className="text-gray-400" /> :
                 user.rank === 3 ? <Zap className="text-orange-500" /> : 
                 `#${user.rank}`}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-xl font-bold font-mono tracking-tight">{user.name}</h3>
                  <span className="text-[10px] font-mono text-white/20">[{user.country}]</span>
                  <div className="flex gap-2">
                    {user.skills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-white/5 text-[8px] font-mono text-white/40 border border-white/10 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[10px] font-mono text-[#00FF41]">ACCURACY: {user.accuracy}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(user.points / 3000) * 100}%` }}
                    className="h-full bg-[#00FF41]"
                  />
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold font-mono text-[#00FF41]">{user.points}</div>
                <div className="text-[10px] font-mono text-white/40">EXP_POINTS</div>
              </div>

              <button className="p-3 hover:bg-white/5 rounded-full transition-all text-white/20 hover:text-[#00FF41]">
                <Target size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 glass border border-dashed border-white/10 text-center">
          <p className="font-mono text-xs text-white/40 mb-4">WANT_TO_CLIMB_THE_LADDER?</p>
          <button className="px-8 py-3 bg-white text-black font-bold text-xs tracking-widest hover:bg-[#00FF41] transition-all">
            PARTICIPATE_IN_NEXT_EVENT
          </button>
        </div>
      </div>
    </div>
  );
}
