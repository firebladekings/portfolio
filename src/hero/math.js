import { MathUtils } from 'three'

/** 0 → 1 as x goes from a to b, smoothstepped and clamped. */
export const ramp = (a, b, x) => {
  const t = MathUtils.clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

/** Linear, clamped version of ramp. */
export const span = ([a, b], x) => MathUtils.clamp((x - a) / (b - a), 0, 1)

export const easeInOutSine = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t)
