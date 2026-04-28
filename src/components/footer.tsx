export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/60 bg-white/80 dark:bg-[#030712]/90 py-6 px-6 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>&copy; {new Date().getFullYear()} Canary in a Box. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a
            href="mailto:admin@canary-box.com"
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            Contact
          </a>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span className="text-xs">
            Built with ♥ for teams who ship fast.
          </span>
        </div>
      </div>
    </footer>
  );
}
