import Image from "next/image";
import WaitlistButton from "./waitlist-button";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-[#030712]/90 shadow-sm fixed top-0 left-0 z-40 backdrop-blur-2xl h-20 border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Logo */}
      <span className="relative h-14 w-44 flex items-center justify-center shrink-0">
        <Image
          src="/canarybox_light.png"
          alt="CanaryBox"
          width={576}
          height={240}
          priority
          className="object-contain block dark:hidden"
        />
        <Image
          src="/canarybox_dark.png"
          alt="CanaryBox"
          width={576}
          height={240}
          priority
          className="object-contain hidden dark:block"
        />
      </span>

      {/* Nav actions */}
      <div className="flex items-center gap-2">
        <WaitlistButton
          label="Join the Waitlist"
          className="px-5 py-2 rounded-full bg-amber-500 text-white font-bold tracking-wide shadow-lg shadow-amber-500/30 hover:bg-amber-400 hover:shadow-amber-400/40 active:scale-95 transition-all duration-150 text-sm"
        />
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
        <ThemeToggle />
      </div>
    </nav>
  );
}
