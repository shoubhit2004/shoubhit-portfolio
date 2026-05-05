export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-8 mt-20 text-center">
      {/* Animated glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <p className="text-muted text-sm">
        Built by <span className="text-white font-medium">Shoubhit Banerjee</span> &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
