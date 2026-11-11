// Tunables for the hero scene. Everything visual about the fly-in lives here.

// Theme accent for the 3D hero; keep in sync with --color-accent in index.css.
export const THEME = {
  accent: '#ffffff',
}

export const MODEL = {
  // Drop the Sketchfab download here (GLB). Until it exists, a procedural
  // stand-in headphone is rendered instead.
  url: '/models/headphones.glb',
  // Rotation [x, y, z] in radians applied to the raw model so that it faces
  // the camera with the ear cups on the left and right (adjust once the real
  // model is in — every exporter has its own idea of "forward").
  rotation: [0, 0, 0],
  // The model is rescaled so its width (cup to cup) equals this many units.
  width: 2.65,
  // Horizontal distance from the centre to the inside face of each ear pad,
  // after rescaling. The camera's end position is derived from it.
  cupInnerX: 0.95,
}

export const CAMERA = {
  startFov: 35,
  // How much of the screen the headphones occupy at the start (world units
  // that must fit in view, width x height).
  startFrame: [3.8, 4.2],
  // At the end the ear cups should sit at the screen edges, this far in
  // (fraction of the half-width) from the edge.
  endEdge: 0.9,
  // Target horizontal half-angle at the end (degrees) and the clamp on the
  // vertical fov that produces it (portrait screens hit the max).
  endHalfAngle: 48,
  endFovRange: [60, 100],
  endY: -0.05,
  lookY: [0, 0.18],
  // After the "on your head" frame the camera keeps travelling forward to
  // this z, so the headphones slide back past you and out of view. Only just
  // far enough to clear the cups — any further and they vanish in a blink.
  exitZ: 0.3,
}

// Section bubbles that float out of "OXY" on hover / tap.
export const BUBBLES = {
  hitArea: [1.5, 0.62], // world units around the title that count as hovering it
  arcDeg: [168, 12], // arc the bubbles fan along (180 = left, 90 = straight up)
  radiusVw: 0.17, // arc radius as a fraction of viewport width…
  radiusPx: [140, 250], // …clamped to this range
  sizePx: [66, 88], // bubble diameter on phones / larger screens
  closeDelay: 600, // ms of grace after the pointer leaves, to reach a bubble
  maxProgress: 0.05, // only available near the top of the hero
}

// Mouse parallax at the start of the hero (fades out as you zoom in).
export const POINTER = {
  cameraShift: [0.06, 0.035], // world units the camera drifts, x / y
  tilt: [0.03, 0.05], // radians the headphones turn toward the cursor, x / y
  damping: 2.5, // lower = lazier follow
}

export const SCROLL = {
  // Height of the hero scroll track, in viewport heights.
  trackVh: 450,
  // How far the next section slides up over the pinned hero (viewport
  // heights), and the height of its soft fade-in edge.
  overlapVh: 50,
  edgeVh: 40,
  // Smoothing for the scroll-driven animation (higher = snappier).
  damping: 6,
}

// Scroll progress (0 → 1 across the pinned hero) at which each beat happens.
export const TIMELINE = {
  zoom: [0, 0.5], // fly in until the ear cups frame the screen
  settle: [0, 0.4], // headphones turn from three-quarter to square-on
  title: [0.15, 0.35], // OXY fades as the camera passes between the cups
  exit: [0.55, 0.78], // headphones slide back past you and vanish
  fade: [0.68, 1], // stars & backdrop fade as the next section rises in
  caption: [0, 0.1],
  cue: [0, 0.04],
}

export const TITLE = {
  text: 'OXY',
  // Must be .ttf/.otf/.woff — the 3D text renderer can't read .woff2.
  font: '/fonts/Unbounded-latin-900-normal.woff',
  size: 0.46,
  letterSpacing: 0.04,
  // Faux extrusion: copies stacked behind the face, front → back colours.
  depthLayers: 10,
  depthStep: 0.011,
  depthColors: ['#a1a1aa', '#09090b'],
  // Soft halo behind the block. Keep it subtle — big blur reads as cheap.
  glow: { width: '5%', blur: '25%', opacity: 0.18 },
  z: -0.25,
}
