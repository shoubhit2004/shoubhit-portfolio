"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap, Award, Briefcase } from "lucide-react";

const timeline = [
  { year: "2019", title: "Gold Medal – Indian Robotics Championship", icon: <Award size={16} /> },
  { year: "2023", title: "Completed Senior Secondary", icon: <GraduationCap size={16} /> },
  { year: "2024", title: "Started BCA at St. Xavier’s College Jaipur", icon: <GraduationCap size={16} /> },
  { year: "2024", title: "Committee Manager – Technoid", icon: <Briefcase size={16} /> },
  { year: "2025", title: "Technical Secretary – TechX", icon: <Briefcase size={16} /> },
  { year: "2025", title: "Java & PHP Internship at Volyo Solutions Pvt Ltd", icon: <Briefcase size={16} /> },
  { year: "2026", title: "Future Full Stack Developer", icon: <Calendar size={16} />, highlight: true },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">My Journey</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full shadow-[0_0_10px_#00F5FF]" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

        <div className="flex flex-col gap-12">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center md:justify-between w-full ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              } pl-12 md:pl-0`}
            >
              <div className="hidden md:block w-5/12" />
              
              {/* Timeline Dot */}
              <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center -ml-4 md:ml-0 ${item.highlight ? 'bg-primary text-background shadow-[0_0_15px_#00F5FF]' : 'bg-secondary text-white'}`}>
                {item.icon}
              </div>

              {/* Content Card */}
              <div className="w-full md:w-5/12">
                <div className={`glass p-6 rounded-2xl border ${item.highlight ? 'border-primary/50 bg-primary/5' : 'border-white/5'} hover:border-primary/30 transition-colors group relative overflow-hidden`}>
                  {item.highlight && <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 blur-2xl rounded-full" />}
                  <span className="text-sm font-bold text-primary mb-2 block">{item.year}</span>
                  <h3 className={`text-lg font-medium ${item.highlight ? 'text-white' : 'text-zinc-200'} group-hover:text-white transition-colors relative z-10`}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
