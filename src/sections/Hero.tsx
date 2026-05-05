"use client";

import { motion, Variants } from "framer-motion";
import { Mail, ArrowRight, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="glass px-4 py-2 rounded-full text-sm font-medium text-primary inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for work
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Shoubhit</span>
            <br />
            Banerjee
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-xl md:text-2xl text-muted font-medium">
            Aspiring Software Developer | AI Enthusiast | Full Stack Learner
          </motion.h2>

          <motion.p variants={itemVariants} className="text-muted leading-relaxed max-w-xl">
            Motivated BCA student with hands-on experience in software development, backend systems, automation, web scraping, and AI experimentation. Building digital experiences with clean code and modern aesthetics.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
            <a href="#projects" className="bg-primary text-background px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="/resume.pdf" download className="glass text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
              Download Resume <Download size={18} />
            </a>
            <a href="#contact" className="border border-white/10 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:border-white/30 transition-all hover:scale-105 active:scale-95">
              Contact Me
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-6 mt-6">
            <a href="https://github.com/shoubhit2004" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors hover:scale-110">
              <GithubIcon size={24} />
            </a>
            <a href="https://linkedin.com/in/shoubhitbanerjee" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-[#0a66c2] transition-colors hover:scale-110">
              <LinkedinIcon size={24} />
            </a>
            <a href="mailto:shoubhit004@gmail.com" className="text-muted hover:text-primary transition-colors hover:scale-110">
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>

        {/* Doodle Artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-md aspect-square rounded-full border border-primary/30 p-4 shadow-[0_0_50px_rgba(0,245,255,0.15)] hover:shadow-[0_0_80px_rgba(0,245,255,0.3)] hover:border-primary/50 transition-all duration-500 group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-500" />
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0a0f25]/50 backdrop-blur-sm z-10 border border-white/5">
              <Image
                src="/assets/hero-doodle.png"
                alt="Shoubhit Banerjee Doodle"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
