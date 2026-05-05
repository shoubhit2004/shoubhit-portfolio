"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

const projects = [
  {
    title: "Flipkart Mobile Data Scraper & Product Filtering Platform",
    description: "A comprehensive web scraping and filtering platform to extract and analyze mobile product data from Flipkart.",
    tech: ["Scrapy", "Python", "Database Integration", "Frontend Filtering"],
    github: "https://github.com/shoubhit2004/flipkart-scraper",
    live: "https://jocular-gelato-f8087e.netlify.app",
    featured: true,
  },
  {
    title: "Line Crossing Detection System",
    description: "An intelligent computer vision system utilizing motion detection, contour tracking, and centroid tracking to trigger alerts upon line crossing.",
    tech: ["OpenCV", "Python", "Computer Vision", "Alert System"],
  },
  {
    title: "PHP To-Do List Application",
    description: "A robust task management application implementing full CRUD operations and secure PHP session management.",
    tech: ["PHP", "HTML/CSS", "CRUD", "Session Management"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
        <div className="w-20 h-1 bg-primary rounded-full shadow-[0_0_10px_#00F5FF]" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`glass p-8 rounded-3xl border border-white/5 relative group overflow-hidden ${
              project.featured ? "lg:col-span-2" : ""
            }`}
          >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500" />
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted mb-6 flex-1 text-lg">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono px-3 py-1 bg-secondary/10 text-secondary rounded-full border border-secondary/20">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                  >
                    <GithubIcon size={18} /> View Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
