import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { MathUtils } from 'three'
import { sections } from '../data'
import { BUBBLES } from './config'

/**
 * Hover (or tap) "OXY" and section links float out of it as soap bubbles.
 * Rendered inside the title group, so it follows the title's float.
 */
export default function SectionBubbles({ progress, onOpenChange, reducedMotion }) {
  const [open, setOpen] = useState(false)
  const [popping, setPopping] = useState(null)
  const closeTimer = useRef()
  const width = useThree((s) => s.size.width)

  const set = (v) => {
    setOpen(v)
    onOpenChange?.(v)
  }
  const cancelClose = () => clearTimeout(closeTimer.current)
  const openNow = (force = false) => {
    cancelClose()
    if (force || progress.current < BUBBLES.maxProgress) set(true)
  }
  const closeSoon = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => set(false), BUBBLES.closeDelay)
  }
  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Once the visitor starts scrolling, the menu gets out of the way.
  useFrame(() => {
    if (open && !popping && progress.current > BUBBLES.maxProgress) set(false)
  })

  const go = (id) => {
    setPopping(id)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
      setPopping(null)
      set(false)
    }, 320)
  }

  // Fan the bubbles along an arc above the title, sized to the viewport.
  const radius = MathUtils.clamp(width * BUBBLES.radiusVw, ...BUBBLES.radiusPx)
  const size = width < 640 ? BUBBLES.sizePx[0] : BUBBLES.sizePx[1]
  const [from, to] = BUBBLES.arcDeg
  const items = sections.map((s, i) => {
    const a = MathUtils.degToRad(from + ((to - from) * i) / (sections.length - 1))
    return { ...s, x: Math.cos(a) * radius, y: -Math.sin(a) * radius }
  })

  // Touch fires pointer-out right after a tap; only mice should close on leave.
  const isMouse = (e) => e.pointerType === 'mouse'

  return (
    <>
      {/* Invisible hit area over the title. */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
          openNow()
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = ''
          if (isMouse(e)) closeSoon()
        }}
        onClick={(e) => {
          e.stopPropagation()
          openNow()
        }}
        onPointerMissed={() => open && !popping && set(false)}
      >
        <planeGeometry args={BUBBLES.hitArea} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <Html center zIndexRange={[30, 0]} style={{ pointerEvents: 'none' }}>
        <nav aria-label="Sections" className="bubbles" data-open={open || undefined} style={{ '--size': `${size}px` }}>
          {items.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`bubble-slot ${popping === s.id ? 'is-popping' : ''}`}
              style={{ '--x': `${s.x}px`, '--y': `${s.y}px`, '--delay': `${i * 55}ms` }}
              onPointerEnter={cancelClose}
              onPointerLeave={(e) => isMouse(e) && closeSoon()}
              onFocus={() => openNow(true)}
              onBlur={closeSoon}
              onClick={() => go(s.id)}
            >
              <span className="bubble-float" style={{ animationDuration: `${3 + i * 0.45}s`, animationDelay: `${-i * 0.7}s` }}>
                <span className="bubble">{s.label}</span>
              </span>
            </button>
          ))}
        </nav>
      </Html>
    </>
  )
}
