import Nav from './components/Nav'
import Section from './components/Section'
import Contact from './components/Contact'
import { profile, about, software, tracks, experience } from './data'

export default function App() {
  return (
    <>
      <Nav />

      <main id="top">
        {/* Hero */}
        <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.06)_0%,transparent_60%)]" />
          <h1 className="relative text-4xl md:text-7xl font-black tracking-tighter text-white uppercase text-center">
            {profile.name}
          </h1>
          <p className="relative text-xs tracking-[0.4em] text-neon font-bold uppercase mt-4 text-center">
            [ {profile.tagline} ]
          </p>
          <a
            href="#music"
            className="relative mt-12 border border-zinc-800 px-6 py-3 text-xs tracking-widest text-zinc-300 hover:border-neon hover:text-neon transition-colors"
          >
            LISTEN ↓
          </a>
        </section>

        <Section id="about" eyebrow="BACKGROUND" title="The work speaks for itself." className="bg-panel border-y border-zinc-900">
          <div className="max-w-4xl space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
            {about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Section>

        <Section id="arsenal" eyebrow="WORKSTATIONS" title="The digital arsenal">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {software.map((s) => (
              <div
                key={s}
                className="p-6 bg-zinc-900 border border-zinc-800 text-center font-bold text-xs tracking-wider uppercase text-zinc-300 hover:text-neon hover:border-neon transition-colors"
              >
                {s}
              </div>
            ))}
          </div>
        </Section>

        <Section id="music" eyebrow="DISCOGRAPHY" title="Featured audio work" className="bg-panel border-t border-zinc-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((t) => (
              <article key={t.title} className="glow-card p-6 bg-black border border-zinc-800 transition-all duration-300 flex flex-col justify-between gap-6 min-h-44">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-bold uppercase tracking-wide text-white">{t.title}</h3>
                    {t.badge && (
                      <span className="bg-neon text-black text-[10px] font-bold uppercase px-2 py-0.5 shrink-0">{t.badge}</span>
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs uppercase mt-2">{t.note}</p>
                </div>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center bg-zinc-900 text-zinc-300 hover:bg-neon hover:text-black border border-zinc-800 text-xs font-bold py-3 transition-colors tracking-widest"
                >
                  STREAM ON SOUNDCLOUD
                </a>
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" eyebrow="TIMELINE" title="Studio & history">
          <div className="space-y-6">
            {experience.map((e) => (
              <div
                key={e.org}
                className={`p-6 bg-zinc-900/40 border-l-4 ${e.current ? 'border-neon' : 'border-zinc-800'} flex flex-col md:flex-row justify-between items-start md:items-center`}
              >
                <div>
                  <h3 className="font-bold text-sm text-white uppercase">{e.org}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{e.role}</p>
                </div>
                <span className="text-xs text-zinc-500 uppercase mt-2 md:mt-0">[ {e.when} ]</span>
              </div>
            ))}
          </div>
        </Section>

        <Contact />
      </main>

      <footer className="border-t border-zinc-900 py-8 px-6 text-center text-[10px] tracking-widest text-zinc-600">
        © {new Date().getFullYear()} {profile.name.toUpperCase()} // OXY
      </footer>
    </>
  )
}
