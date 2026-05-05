"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Programming",
    items: ["Python", "Java", "C++", "PHP"],
  },
  {
    category: "Frameworks",
    items: ["FastAPI", "Scrapy", "OpenCV"],
  },
  {
    category: "Web",
    items: ["HTML", "CSS"],
  },
  {
    category: "Database",
    items: ["SQL", "MySQL"],
  },
  {
    category: "Tools",
    items: ["GitHub", "XAMPP"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Arsenal</h2>
        <div className="w-20 h-1 bg-secondary mx-auto rounded-full shadow-[0_0_10px_#7B61FF]" />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors" />
            
            <h3 className="text-xl font-semibold mb-6 text-white group-hover:text-primary transition-colors">
              {skillGroup.category}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {skillGroup.items.map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-muted hover:text-white hover:border-primary/50 transition-all cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
