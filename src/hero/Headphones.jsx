import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'
import { MODEL, THEME } from './config'

/** The downloaded model, re-oriented, centred and scaled to MODEL.width. */
export function HeadphoneModel() {
  const { scene } = useGLTF(MODEL.url)

  const { root, offset, scale } = useMemo(() => {
    const root = scene.clone(true)
    root.rotation.set(...MODEL.rotation)
    root.updateMatrixWorld(true)
    const box = new Box3().setFromObject(root)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    return { root, offset: center.negate().toArray(), scale: MODEL.width / size.x }
  }, [scene])

  return (
    <group scale={scale}>
      <group position={offset}>
        <primitive object={root} />
      </group>
    </group>
  )
}

/** Procedural stand-in with the same proportions, used until the GLB exists. */
export function PlaceholderHeadphones() {
  const shell = <meshPhysicalMaterial color="#17171a" metalness={0.85} roughness={0.28} clearcoat={1} clearcoatRoughness={0.2} />
  const pad = <meshStandardMaterial color="#0c0c0d" roughness={0.95} />
  const accent = <meshStandardMaterial color={THEME.accent} emissive={THEME.accent} emissiveIntensity={1.4} toneMapped={false} />

  // The cup group is rotated so its local +y points to world -x and its
  // local +x points up; "outer" for side s is therefore local y = -s.
  const cup = (side) => (
    <group position={[side * 1.15, -0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
      {/* outer shell */}
      <mesh>
        <cylinderGeometry args={[0.52, 0.56, 0.32, 64]} />
        {shell}
      </mesh>
      {/* glowing ring on the outer face */}
      <mesh position={[0, -side * 0.165, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.018, 16, 96]} />
        {accent}
      </mesh>
      {/* ear cushion on the inner face */}
      <mesh position={[0, side * 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.13, 24, 96]} />
        {pad}
      </mesh>
      {/* yoke */}
      <mesh position={[0.6, 0, 0]}>
        <boxGeometry args={[0.18, 0.08, 0.12]} />
        {shell}
      </mesh>
    </group>
  )

  return (
    <group>
      {/* headband */}
      <mesh position={[0, 0.42, 0]}>
        <torusGeometry args={[1.14, 0.065, 24, 128, Math.PI]} />
        {shell}
      </mesh>
      <mesh position={[0, 0.42, 0]} scale={[0.97, 0.97, 1]}>
        <torusGeometry args={[1.12, 0.05, 16, 128, Math.PI * 0.6]} />
        {pad}
      </mesh>
      {/* sliders */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 1.14, 0.3, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.3, 16]} />
          <meshStandardMaterial color="#9a9aa0" metalness={1} roughness={0.2} />
        </mesh>
      ))}
      {cup(-1)}
      {cup(1)}
    </group>
  )
}
