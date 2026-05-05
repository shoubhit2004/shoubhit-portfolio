"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Loader2, CheckCircle, XCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill out all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // Configuration via Environment Variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (!serviceId || !templateId || !publicKey) {
         throw new Error("EmailJS is not fully configured. Please add your Service ID, Template ID, and Public Key to .env.local.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Shoubhit",
          to_email: "shoubhit004@gmail.com",
        },
        publicKey
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error?.message || "Something went wrong. Please try again later.");
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 max-w-4xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Let&apos;s Connect</h2>
        <div className="w-20 h-1 bg-secondary mx-auto rounded-full shadow-[0_0_10px_#7B61FF]" />
        <p className="text-muted mt-6 max-w-xl mx-auto">
          Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 flex flex-col justify-center gap-8"
        >
          <div className="flex flex-col gap-6 w-full overflow-hidden">
            <a href="mailto:shoubhit004@gmail.com" className="flex items-center gap-4 text-muted hover:text-white transition-colors group">
              <div className="w-12 h-12 shrink-0 rounded-full glass flex items-center justify-center group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all">
                <Mail size={20} />
              </div>
              <span className="font-medium truncate">shoubhit004@gmail.com</span>
            </a>
            <a href="https://linkedin.com/in/shoubhitbanerjee" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted hover:text-white transition-colors group">
              <div className="w-12 h-12 shrink-0 rounded-full glass flex items-center justify-center group-hover:bg-[#0a66c2] group-hover:border-[#0a66c2] group-hover:text-white transition-all">
                <LinkedinIcon size={20} />
              </div>
              <span className="font-medium truncate">linkedin.com/in/shoubhitbanerjee</span>
            </a>
            <a href="https://github.com/shoubhit2004" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted hover:text-white transition-colors group">
              <div className="w-12 h-12 shrink-0 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:text-black transition-all">
                <GithubIcon size={20} />
              </div>
              <span className="font-medium truncate">github.com/shoubhit2004</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-3"
        >
          <form className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading"}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading"}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                placeholder="john@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                disabled={status === "loading"}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none disabled:opacity-50"
                placeholder="Hello Shoubhit..."
              ></textarea>
            </div>

            {status === "error" && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 text-red-400 text-sm font-medium">
                <XCircle size={16} className="shrink-0 mt-0.5" /> <span>{errorMsg}</span>
              </motion.div>
            )}
            
            {status === "success" && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <CheckCircle size={16} className="shrink-0" /> Message sent successfully!
              </motion.div>
            )}

            <button 
              disabled={status === "loading"}
              className="bg-primary text-background font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>Sending... <Loader2 size={18} className="animate-spin" /></>
              ) : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
