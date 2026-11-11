/** Small section label: a short accent rule followed by a word. */
export default function Eyebrow({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-zinc-500 ${className}`}>
      <span className="h-px w-8 bg-accent" />
      {children}
    </div>
  )
}
