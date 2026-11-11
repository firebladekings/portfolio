import Section from './components/Section'
import Contact from './components/Contact'
import About from './components/About'
import Hero from './hero/Hero'
import { SCROLL } from './hero/config'
import { profile, software, tracks, experience } from './data'

export default function App() {
  return (
    <>
      <main id="top">
        <Hero />

        {/* Slides up over the end of the pinned hero; the soft edge above it
            blends into the fading starfield instead of a hard line. */}
        <div className="relative z-10" style={{ marginTop: `-${SCROLL.overlapVh}svh` }}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-full bg-linear-to-b from-transparent to-panel"
            style={{ height: `${SCROLL.edgeVh}svh` }}
          />
          <About />
        </div>

        <Section id="arsenal" eyebrow="Studio" title="Tools of the trade">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {software.map((s) => (
              <div
                key={s}
                className="px-5 py-6 border border-zinc-800 rounded-2xl text-center text-sm text-zinc-300 hover:text-white hover:border-accent/60 transition-colors"
              >
                {s}
              </div>
            ))}
          </div>
        </Section>

        <Section id="music" eyebrow="Music" title="Selected work" className="bg-panel border-t border-zinc-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((t) => (
              <article key={t.title} className="glow-card p-6 md:p-8 bg-black border border-zinc-800 rounded-2xl transition-all duration-300 flex flex-col justify-between gap-6 min-h-44">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-normal text-white">{t.title}</h3>
                    {t.badge && (
                      <span className="border border-accent/50 text-accent text-xs px-3 py-1 rounded-full shrink-0">{t.badge}</span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-sm mt-2">{t.note}</p>
                </div>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  className="self-start rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-200 hover:bg-accent hover:border-accent hover:text-black transition-colors"
                >
                  Listen on SoundCloud ↗
                </a>
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" eyebrow="Experience" title="Studio & history">
          <div className="space-y-6">
            {experience.map((e) => (
              <div
                key={e.org}
                className={`py-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2`}
              >
                <div>
                  <h3 className="text-xl text-white">{e.org}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{e.role}</p>
                </div>
                <span className="text-sm text-zinc-500">{e.when}</span>
              </div>
            ))}
          </div>
        </Section>

        <Contact />
      </main>

      <footer className="border-t border-zinc-900 py-10 px-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} {profile.name} · Oxy
      </footer>
    </>
  )
}
