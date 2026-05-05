"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 lg:px-12 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience</h2>
        <div className="w-20 h-1 bg-secondary mx-auto rounded-full shadow-[0_0_10px_#7B61FF]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass rounded-xl overflow-hidden border border-white/10 shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="bg-[#1a1b26] px-4 py-3 border-b border-white/5 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
            <Terminal size={14} /> shoubhit@portfolio:~
          </div>
        </div>
        
        {/* Terminal Body */}
        <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed bg-[#0f111a]/80">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-400">shoubhit@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span>
            <span className="text-zinc-300 ml-2">cat experience.json</span>
          </div>
          
          <div className="text-zinc-300 ml-4 md:ml-8">
            <span className="text-yellow-300">&#123;</span>
            <div className="ml-4">
              <span className="text-primary">&quot;role&quot;</span>: <span className="text-green-300">&quot;Java & PHP Intern&quot;</span>,<br/>
              <span className="text-primary">&quot;company&quot;</span>: <span className="text-green-300">&quot;Volyo Solutions Pvt Ltd&quot;</span>,<br/>
              <span className="text-primary">&quot;duration&quot;</span>: <span className="text-green-300">&quot;45 days&quot;</span>,<br/>
              <span className="text-primary">&quot;focus&quot;</span>: <span className="text-yellow-300">[</span>
              <div className="ml-4">
                <span className="text-green-300">&quot;Java problem solving&quot;</span>,<br/>
                <span className="text-green-300">&quot;Backend development concepts&quot;</span>
              </div>
              <span className="text-yellow-300">]</span>
            </div>
            <span className="text-yellow-300">&#125;</span>
          </div>

          <div className="flex items-center gap-2 mt-4 animate-pulse">
            <span className="text-green-400">shoubhit@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span>
            <span className="w-2 h-5 bg-zinc-300 inline-block ml-2" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
