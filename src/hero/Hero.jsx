import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { HeadphoneModel, PlaceholderHeadphones } from './Headphones'
import { MODEL, SCROLL, TIMELINE } from './config'
import { ramp, span } from './math'
import { profile } from '../data'

/** True once we know a real model file is being served (not the SPA fallback). */
function useModelAvailable(url) {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    let alive = true
    fetch(url, { method: 'HEAD' })
      .then((r) => alive && setOk(r.ok && !(r.headers.get('content-type') || '').includes('text/html')))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [url])
  return ok
}

/** If the model fails to load or parse, keep showing the stand-in. */
class ModelBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    console.warn('[hero] headphone model failed to load, using placeholder:', err)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export default function Hero() {
  const track = useRef()
  const caption = useRef()
  const cue = useRef()
  const stage = useRef()
  const backdrop = useRef()
  const [onScreen, setOnScreen] = useState(true)
  const hasModel = useModelAvailable(MODEL.url)
  const reducedMotion = usePrefersReducedMotion()

  // Stop rendering the WebGL scene once the hero has scrolled away.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    io.observe(track.current)
    return () => io.disconnect()
  }, [])

  // DOM layers follow the same smoothed progress as the 3D scene.
  const onProgress = (p) => {
    const set = (ref, v) => ref.current && (ref.current.style.opacity = String(v))
    set(caption, 1 - span(TIMELINE.caption, p))
    set(cue, 1 - span(TIMELINE.cue, p))
    // Stars + backdrop fade to the next section's colour as it rises in.
    const fade = 1 - ramp(...TIMELINE.fade, p)
    set(stage, fade)
    set(backdrop, fade)
  }

  const placeholder = <PlaceholderHeadphones />

  return (
    <section ref={track} className="relative" style={{ height: `${SCROLL.trackVh}svh` }} aria-label="Intro">
      {/* Base colour matches the next section, so fading the layers above
          it hands off without a seam. */}
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-panel">
        <div ref={backdrop} className="absolute inset-0 space-bg" />
        <Canvas
          ref={stage}
          style={{ position: 'absolute', inset: 0 }}
          frameloop={onScreen ? 'always' : 'never'}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: 35, near: 0.05, far: 200, position: [0, 0, 7] }}
        >
          <Suspense fallback={null}>
            <Scene trackRef={track} onProgress={onProgress} reducedMotion={reducedMotion}>
              {hasModel ? (
                <ModelBoundary fallback={placeholder}>
                  <Suspense fallback={placeholder}>
                    <HeadphoneModel />
                  </Suspense>
                </ModelBoundary>
              ) : (
                placeholder
              )}
            </Scene>
          </Suspense>
        </Canvas>

        <h1 className="sr-only">OXY — {profile.name}</h1>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-10 flex items-end justify-between gap-6 font-outfit uppercase">
          <div ref={caption}>
            <div className="text-white font-medium text-sm md:text-base tracking-[0.28em]">{profile.name}</div>
            <div className="mt-2 text-zinc-400 font-light text-[11px] md:text-xs tracking-[0.32em]">
              Sound engineer · Producer · Composer
            </div>
          </div>
          <div ref={cue} className="text-accent font-light text-[11px] md:text-xs tracking-[0.32em] leading-loose text-right shrink-0">
            <span className="md:hidden">Scroll ↓</span>
            <span className="hidden md:inline">
              Scroll to
              <br />
              put them on ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
