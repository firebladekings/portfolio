import Eyebrow from './Eyebrow'

export default function Section({ id, eyebrow, title, className = '', children }) {
  return (
    <section id={id} className={`py-24 md:py-32 px-6 md:px-16 lg:px-24 ${className}`}>
      <div className="max-w-6xl mx-auto w-full">
        {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
        {title && <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-12 md:mb-16">{title}</h2>}
        {children}
      </div>
    </section>
  )
}
