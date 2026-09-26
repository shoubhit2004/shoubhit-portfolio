"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Trophy, BadgeCheck } from "lucide-react";

interface Certification {
  title: string;
  organization?: string;
}

const certifications: Certification[] = [
  {
    title: "5-Day AI Agents: Intensive Vibe Coding Course",
    organization: "Google × Kaggle",
  },
  {
    title: "Participated in Vibe2Ship — India's Biggest Vibe Coding Hackathon",
    organization: "Coding Ninjas",
  },
  {
    title: "Google Cloud Prompt Engineering Guide",
  },
  {
    title: "Forage Tech Simulation",
  },
  {
    title: "Be10x AI Workshop",
  },
  {
    title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
  },
];

const achievements = [
  { title: "Gold Medal – Indian Robotics Championship", icon: <Trophy className="text-yellow-400" size={24} /> },
  { title: "Excellence for Technical Creativity", icon: <Award className="text-secondary" size={24} /> },
  { title: "Committee Manager – Technoid", icon: <ShieldCheck className="text-primary" size={24} /> },
  { title: "Technical Secretary – TechX", icon: <ShieldCheck className="text-primary" size={24} /> },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Certifications & Achievements</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full shadow-[0_0_10px_#00F5FF]" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
            <BadgeCheck className="text-primary" /> Certifications
          </h3>
          <div className="flex flex-col gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-5 rounded-xl border border-white/5 flex items-center gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <Award size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-medium text-zinc-200">{cert.title}</span>
                  {cert.organization && (
                    <span className="text-xs md:text-sm text-primary font-medium mt-0.5">{cert.organization}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership & Achievements */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
            <Trophy className="text-secondary" /> Leadership & Awards
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((achieve, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-6 rounded-2xl border border-white/5 hover:border-secondary/30 transition-colors flex flex-col items-center text-center gap-4 group"
              >
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  {achieve.icon}
                </div>
                <span className="font-medium text-zinc-200">{achieve.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
