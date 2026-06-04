"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Trophy, BadgeCheck } from "lucide-react";

const certifications = [
  {
    title: "Google Cloud Prompt Engineering Guide",
    issuer: "Google Cloud",
    date: "2024",
    skills: ["Prompt Engineering", "Generative AI"],
  },
  {
    title: "Forage Tech Simulation",
    issuer: "Forage",
    date: "2023",
    skills: ["Software Engineering"],
  },
  {
    title: "Be10x AI Workshop",
    issuer: "Be10x",
    date: "2023",
    skills: ["AI Tools", "Productivity"],
  },
  {
    title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    issuer: "Microsoft & LinkedIn Learning",
    date: "May 2026",
    skills: ["Generative AI", "Microsoft Copilot", "Responsible AI"],
  },
];

const achievements = [
  { title: "Gold Medal – Indian Robotics Championship", icon: <Trophy className="text-yellow-400" size={24} /> },
  { title: "National Level Qualification", icon: <Award className="text-secondary" size={24} /> },
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
                className="glass p-5 rounded-xl border border-white/5 flex items-start gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                  <Award size={20} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-lg font-medium text-zinc-200 leading-snug">{cert.title}</span>
                  <span className="text-sm text-zinc-400 font-medium">
                    {cert.issuer} • {cert.date}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
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
