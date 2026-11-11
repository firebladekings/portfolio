export default function Section({ id, eyebrow, title, className = '', children }) {
  return (
    <section id={id} className={`scroll-mt-20 py-24 md:py-32 px-6 md:px-24 ${className}`}>
      <div className="max-w-7xl mx-auto w-full">
        {eyebrow && (
          <span className="text-xs text-neon font-bold tracking-widest block mb-4">// {eyebrow}</span>
        )}
        {title && <h2 className="text-2xl md:text-3xl font-black uppercase mb-12 text-white">{title}</h2>}
        {children}
      </div>
    </section>
  )
}
