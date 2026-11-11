import { useState } from 'react'
import { navLinks } from '../data'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-md">
      <div className="flex justify-between items-center p-6">
        <a href="#top" className="text-xl font-bold tracking-widest text-neon">OXY // ARCHIVE</a>

        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-zinc-400">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-neon transition-colors">// {l.label}</a>
          ))}
        </div>

        <button
          className="md:hidden text-xs tracking-widest text-zinc-400 hover:text-neon"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '[ CLOSE ]' : '[ MENU ]'}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden flex flex-col border-t border-zinc-900 px-6 pb-4 text-xs uppercase tracking-widest text-zinc-400">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 hover:text-neon">
              // {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
