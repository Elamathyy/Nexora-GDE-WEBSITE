import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Globe, Award, Zap, Shield } from 'lucide-react';

export default function Profile() {
  const user = {
    name: "ELITE_HACKER_01",
    bio: "AI Security Researcher & Full-Stack Architect. Specializing in neural network defense systems and autonomous threat detection.",
    skills: ["AI_RESEARCH", "PEN_TESTING", "REACT_THREE_FIBER", "RUST", "LLM_SECURITY"],
    points: 2450,
    rank: 1,
    events: 12,
    github: "github.com/nexora",
    linkedin: "linkedin.com/in/nexora"
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Info */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-8 text-center border-t-4 border-t-[#00FF41]"
          >
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-2 border-[#00FF41] rounded-full animate-spin-slow border-dashed" />
              <img 
                src="https://picsum.photos/seed/hacker/200/200" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full grayscale p-2"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-2xl font-bold font-mono mb-2">{user.name}</h2>
            <p className="text-[10px] font-mono text-[#00FF41] mb-6 uppercase tracking-[0.3em]">LEVEL_99_ARCHITECT</p>
            
            <div className="flex justify-center gap-4">
              <button className="p-2 glass hover:text-[#00FF41] transition-all"><Github size={18} /></button>
              <button className="p-2 glass hover:text-[#00FF41] transition-all"><Linkedin size={18} /></button>
              <button className="p-2 glass hover:text-[#00FF41] transition-all"><Mail size={18} /></button>
              <button className="p-2 glass hover:text-[#00FF41] transition-all"><Globe size={18} /></button>
            </div>
          </motion.div>

          <div className="glass p-6 space-y-4">
            <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest">SYSTEM_SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-[#00FF41]/10 border border-[#00FF41]/30 text-[9px] font-mono text-[#00FF41]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Award, label: "GLOBAL_RANK", value: `#${user.rank}` },
              { icon: Zap, label: "EXP_POINTS", value: user.points },
              { icon: Shield, label: "EVENTS_SYNCED", value: user.events }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 border-b-2 border-b-[#00FF41]/50"
              >
                <stat.icon className="text-[#00FF41] mb-4" size={20} />
                <div className="text-[10px] font-mono text-white/40 mb-1">{stat.label}</div>
                <div className="text-3xl font-bold font-mono">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="glass p-8">
            <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-8">BIOMETRIC_DATA</h3>
            <p className="text-white/70 font-mono text-sm leading-relaxed mb-12">
              {user.bio}
            </p>

            <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-8">RECENT_ACTIVITY</h3>
            <div className="space-y-4">
              {[
                { action: "NODE_CONNECTED", target: "CYBER-STRIKE_2026", time: "2H_AGO" },
                { action: "SKILL_UPGRADED", target: "NEURAL_DEFENSE_V2", time: "1D_AGO" },
                { action: "RANK_ACHIEVED", target: "TOP_10_GLOBAL", time: "3D_AGO" }
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 bg-[#00FF41] rounded-full" />
                    <span className="font-mono text-xs text-white/80">{activity.action}</span>
                    <span className="font-mono text-[10px] text-white/30">{activity.target}</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/30">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
