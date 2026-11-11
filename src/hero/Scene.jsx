import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Sparkles, Stars, Text } from '@react-three/drei'
import { Color, MathUtils } from 'three'
import { CAMERA, MODEL, POINTER, SCROLL, THEME, TIMELINE, TITLE } from './config'
import { easeInOutSine, ramp, span } from './math'
import SectionBubbles from './SectionBubbles'

const { clamp, lerp, damp, degToRad, radToDeg } = MathUtils

/** Camera distance that fits CAMERA.startFrame on screen at the start fov. */
function startDistance(aspect) {
  const tanV = Math.tan(degToRad(CAMERA.startFov / 2))
  const [w, h] = CAMERA.startFrame
  return Math.max(h / 2 / tanV, w / 2 / (tanV * aspect))
}

/** End fov + distance that put the ear cups just inside the screen edges. */
function endPose(aspect) {
  const [lo, hi] = CAMERA.endFovRange
  const wanted = Math.tan(degToRad(CAMERA.endHalfAngle))
  const fov = clamp(radToDeg(2 * Math.atan(wanted / aspect)), lo, hi)
  const tanH = Math.tan(degToRad(fov / 2)) * aspect
  return { fov, z: MODEL.cupInnerX / (tanH * CAMERA.endEdge) }
}

// Dev-only: ?p=0.5 pins the scroll progress, for screenshots and tuning.
const forced = (() => {
  if (!import.meta.env.DEV) return null
  const p = new URLSearchParams(window.location.search).get('p')
  return p === null ? null : clamp(parseFloat(p) || 0, 0, 1)
})()

export default function Scene({ trackRef, onProgress, reducedMotion, children }) {
  const smoothed = useRef(forced ?? 0)
  const mouse = useRef({ x: 0, y: 0 }) // eased copy of the pointer
  const rig = useRef()
  const title = useRef() // group holding every layer of the title
  const face = useRef()
  const layers = useRef([])
  const menuOpen = useRef(false)

  useFrame((state, dt) => {
    // Scroll progress through the hero track, 0 → 1.
    let target = 0
    const track = trackRef.current
    if (track) {
      const rect = track.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      target = span > 0 ? clamp(-rect.top / span, 0, 1) : 0
    }
    if (forced !== null) target = forced
    smoothed.current = forced !== null ? forced : damp(smoothed.current, target, SCROLL.damping, Math.min(dt, 0.1))
    const p = smoothed.current
    onProgress?.(p)

    const e = easeInOutSine(span(TIMELINE.zoom, p)) // fly-in
    const x = span(TIMELINE.exit, p) // slide past and out of view (linear)
    const idle = reducedMotion ? 0 : 1 - e
    const t = state.clock.elapsedTime
    const { camera, size } = state
    const aspect = size.width / size.height
    const step = Math.min(dt, 0.1)
    mouse.current.x = damp(mouse.current.x, state.pointer.x, POINTER.damping, step)
    mouse.current.y = damp(mouse.current.y, state.pointer.y, POINTER.damping, step)
    const pointer = mouse.current

    // Camera: far & narrow → between the cups & wide. Distance moves in log
    // space so the apparent growth is steady; the fov only opens up in the
    // last stretch (widening earlier cancels out the dolly and stalls the zoom).
    const end = endPose(aspect)
    const z0 = startDistance(aspect)
    camera.fov = lerp(CAMERA.startFov, end.fov, ramp(0.45, 1, e))
    const z = lerp(z0 * Math.pow(end.z / z0, e), CAMERA.exitZ, x)
    const [shiftX, shiftY] = POINTER.cameraShift
    camera.position.set(pointer.x * shiftX * idle, lerp(pointer.y * shiftY * idle, CAMERA.endY, e), z)
    camera.lookAt(0, lerp(CAMERA.lookY[0], CAMERA.lookY[1], e), z - 3)
    camera.updateProjectionMatrix()

    // Headphones: a three-quarter turn and a gentle float, settling square-on.
    const settle = ramp(...TIMELINE.settle, p)
    if (rig.current) {
      rig.current.visible = x < 0.999
      rig.current.rotation.set(
        lerp(0.16, 0, settle) - pointer.y * POINTER.tilt[0] * idle,
        lerp(-0.5, 0, settle) + pointer.x * POINTER.tilt[1] * idle + Math.sin(t * 0.35) * 0.06 * idle,
        Math.sin(t * 0.6) * 0.035 * idle,
      )
      rig.current.position.y = Math.sin(t * 0.9) * 0.07 * idle
    }

    // Title fades as the camera passes the cups.
    const o = 1 - ramp(...TIMELINE.title, p)
    if (title.current) {
      title.current.visible = o > 0.001
      title.current.position.y = Math.sin(t * 0.9 + 0.6) * 0.035 * idle
      // Lift slightly while the section bubbles are out.
      const s = damp(title.current.scale.x, menuOpen.current ? 1.06 : 1, 8, step)
      title.current.scale.setScalar(s)
    }
    if (face.current) {
      face.current.fillOpacity = o
      face.current.strokeOpacity = o
    }
    for (const layer of layers.current) {
      if (!layer) continue
      layer.fillOpacity = o
      layer.outlineOpacity = TITLE.glow.opacity * o
    }
  })

  // Letter spacing is also added after the last glyph; shift back to centre.
  const titleX = (TITLE.letterSpacing * TITLE.size) / 2
  const [front, back] = TITLE.depthColors.map((c) => new Color(c))
  const depthColors = Array.from({ length: TITLE.depthLayers }, (_, i) =>
    front.clone().lerp(back, i / Math.max(1, TITLE.depthLayers - 1)).getStyle(),
  )
  const textProps = {
    font: TITLE.font,
    fontSize: TITLE.size,
    letterSpacing: TITLE.letterSpacing,
    anchorX: 'center',
    anchorY: 'middle',
    'material-toneMapped': false,
  }

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[-3, 4, 5]} intensity={1.1} />
      <pointLight position={[0, 0.6, -2.4]} color={THEME.accent} intensity={18} distance={9} />
      <pointLight position={[3.5, -1, 2]} color="#7c5cff" intensity={10} distance={10} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 3]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2.2} color={THEME.accent} position={[-6, 0.5, -2]} scale={[3, 7, 1]} />
        <Lightformer form="ring" intensity={2} color="#8f7bff" position={[6, 1, -1]} scale={3} />
        <Lightformer form="rect" intensity={0.8} position={[0, -4, 4]} scale={[8, 1, 1]} />
      </Environment>

      <Stars radius={50} depth={60} count={5000} factor={4} saturation={0} fade speed={0.6} />
      <Sparkles count={160} scale={[14, 9, 16]} position={[0, 0, -2]} size={2.4} speed={0.25} opacity={0.55} color="#e4e4e7" noise={0.6} />

      <group ref={rig}>{children}</group>

      <group ref={title} position={[titleX, 0, TITLE.z]}>
        <SectionBubbles progress={smoothed} reducedMotion={reducedMotion} onOpenChange={(v) => (menuOpen.current = v)} />
        {/* Extruded body: copies stepping back and darkening; the deepest one
            carries the glow so it radiates from behind the block. */}
        {depthColors.map((color, i) => {
          const last = i === depthColors.length - 1
          return (
            <Text
              key={i}
              ref={(el) => (layers.current[i] = el)}
              {...textProps}
              position={[0, 0, -(i + 1) * TITLE.depthStep]}
              color={color}
              {...(last && { outlineWidth: TITLE.glow.width, outlineBlur: TITLE.glow.blur, outlineColor: THEME.accent })}
            >
              {TITLE.text}
            </Text>
          )
        })}
        {/* Face: bright fill with a crisp accent rim. */}
        <Text ref={face} {...textProps} color="#ffffff" strokeWidth="2.2%" strokeColor={THEME.accent}>
          {TITLE.text}
        </Text>
      </group>
    </>
  )
}
