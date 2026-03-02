import { motion } from 'motion/react';
import { Book, Code, Terminal, Cpu, Globe, Database } from 'lucide-react';

export default function Resources() {
  const categories = [
    { icon: Terminal, name: "AI_SECURITY", count: 124, color: "#00FF41" },
    { icon: Code, name: "EXPLOIT_DEV", count: 86, color: "#BC13FE" },
    { icon: Cpu, name: "NEURAL_ARCH", count: 42, color: "#00FF41" },
    { icon: Globe, name: "WEB3_SEC", count: 67, color: "#BC13FE" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-7xl font-bold tracking-tighter mb-6 uppercase leading-none">
            KNOWLEDGE<br /><span className="text-[#00FF41]">MATRIX</span>
          </h2>
          <p className="font-mono text-sm text-white/50">
            Curated intelligence for the elite developer. From zero-day research to advanced neural network optimization.
          </p>
        </div>
        <div className="glass p-6 border-l-4 border-[#00FF41] w-full md:w-64">
          <div className="text-3xl font-bold font-mono">1.2TB</div>
          <div className="text-[10px] font-mono text-white/40 uppercase">TOTAL_DATA_INDEXED</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
          >
            <cat.icon className="mb-6 group-hover:text-[#00FF41] transition-colors" size={32} />
            <h3 className="text-xl font-bold font-mono mb-2">{cat.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/30">{cat.count} FILES</span>
              <div className="w-8 h-0.5 bg-white/10 group-hover:w-12 group-hover:bg-[#00FF41] transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-mono text-xs text-white/40 uppercase tracking-[0.3em] mb-8">LATEST_RELEASES</h3>
        {[
          { title: "LLM_JAILBREAK_DEFENSE_V4.PDF", type: "PDF", size: "2.4MB", date: "2H_AGO" },
          { title: "AUTONOMOUS_HONEYPOT_SRC.ZIP", type: "SRC", size: "142MB", date: "5H_AGO" },
          { title: "NEURAL_NETWORK_VISUALIZER.EXE", type: "BIN", size: "12MB", date: "1D_AGO" },
        ].map((file, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass p-4 flex items-center justify-between border-l-2 border-transparent hover:border-[#00FF41] transition-all group"
          >
            <div className="flex items-center gap-4">
              <Database size={16} className="text-white/20 group-hover:text-[#00FF41]" />
              <span className="font-mono text-xs">{file.title}</span>
            </div>
            <div className="flex items-center gap-8">
              <span className="font-mono text-[10px] text-white/20 hidden md:block">{file.type}</span>
              <span className="font-mono text-[10px] text-white/20 hidden md:block">{file.size}</span>
              <span className="font-mono text-[10px] text-[#00FF41]">{file.date}</span>
              <button className="text-white/20 hover:text-white transition-colors">
                <Book size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
