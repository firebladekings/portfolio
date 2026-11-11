import Reveal from './Reveal'
import Eyebrow from './Eyebrow'
import { about, aboutFacts, aboutHighlight, aboutPhoto } from '../data'

/** Renders text with one phrase picked out in white. */
function withHighlight(text, phrase) {
  const i = text.toLowerCase().indexOf(phrase.toLowerCase())
  if (i === -1) return text
  return (
    <>
      {text.slice(0, i)}
      <span className="text-white">{text.slice(i, i + phrase.length)}</span>
      {text.slice(i + phrase.length)}
    </>
  )
}

export default function About() {
  const [lead, ...rest] = about

  return (
    <section id="about" className="bg-panel px-6 md:px-16 lg:px-24 pt-24 md:pt-36 pb-28 md:pb-40 font-outfit">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-x-12 gap-y-10">
        {/* Label + portrait. */}
        <div className="md:col-span-4">
          <div>
            <Reveal>
              <Eyebrow className="md:pt-4">About</Eyebrow>
            </Reveal>
            <Reveal as="figure" delay={150} className="mt-8 max-w-sm md:max-w-none">
              <div className="group overflow-hidden rounded-2xl border border-zinc-800/80">
                <img
                  src={aboutPhoto.src}
                  alt={aboutPhoto.alt}
                  width={aboutPhoto.width}
                  height={aboutPhoto.height}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto transition-transform duration-1600 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-8">
          <Reveal as="h2" className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight leading-[1.02] text-white">
            The work <span className="text-zinc-500">speaks for itself.</span>
          </Reveal>

          <Reveal as="p" delay={120} className="mt-10 md:mt-14 max-w-3xl text-xl md:text-2xl font-light leading-relaxed text-zinc-300">
            {lead}
          </Reveal>

          <div className="mt-10 md:mt-12 grid md:grid-cols-2 gap-x-12 gap-y-6 text-base leading-relaxed font-light text-zinc-400">
            {rest.map((p, i) => (
              <Reveal as="p" key={i} delay={200 + i * 100}>
                {withHighlight(p, aboutHighlight)}
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 md:mt-28 grid md:grid-cols-3 border-t border-zinc-800/80">
        {aboutFacts.map((f, i) => (
          <Reveal
            key={f.label}
            delay={i * 100}
            className={`pt-6 pb-2 md:pt-8 md:pr-8 ${i > 0 ? 'max-md:border-t max-md:border-zinc-800/60 max-md:mt-6 md:pl-8 md:border-l md:border-zinc-800/80' : ''}`}
          >
            <div className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">{f.label}</div>
            <div className="mt-3 text-lg font-light text-zinc-100 leading-snug">{f.value}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
