import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { AdditiveBlending, Color, Group, MathUtils, Mesh, PointsMaterial, Vector3 } from 'three'

type CoreMode = 'orbit' | 'network' | 'pulse'

function IntelligenceCore({ paused, compact, mode, rotation, cameraZ, accent, secondary }: {
  paused: boolean
  compact: boolean
  mode: CoreMode
  rotation: { x: number; y: number }
  cameraZ: number
  accent: string
  secondary: string
}) {
  const group = useRef<Group>(null)
  const center = useRef<Mesh>(null)
  const particleMaterial = useRef<PointsMaterial>(null)
  const marker = useRef<Mesh>(null)
  const time = useRef(0)
  const { positions, colors, arcs, links } = useMemo(() => {
    const count = compact ? 900 : 1600
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const primary = new Color(accent)
    const secondaryColor = new Color(secondary)
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i + .5) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 1.76 + Math.sin(i * 13.7) * .045
      positions.set([r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)], i * 3)
      const blend = (Math.sin(i * .8) + 1) * .5
      colors.set([
        primary.r + (secondaryColor.r - primary.r) * blend,
        primary.g + (secondaryColor.g - primary.g) * blend,
        primary.b + (secondaryColor.b - primary.b) * blend,
      ], i * 3)
    }
    const arcs: Vector3[][] = []
    for (let j = 0; j < 16; j++) {
      const points: Vector3[] = []
      for (let k = 0; k <= 100; k++) {
        const t = k / 100 * Math.PI * 2
        const angle = j / 16 * Math.PI
        const r = 1.79 + Math.sin(t * 3 + j) * .065
        points.push(new Vector3(Math.cos(t) * r, Math.sin(t) * Math.cos(angle) * r, Math.sin(t) * Math.sin(angle) * r))
      }
      arcs.push(points)
    }
    const links: Vector3[][] = []
    for (let i = 0; i < 48; i++) {
      const first = (i * 43) % count
      const second = (first + 11 + i % 9 * 7) % count
      links.push([
        new Vector3(positions[first * 3], positions[first * 3 + 1], positions[first * 3 + 2]),
        new Vector3(positions[second * 3], positions[second * 3 + 1], positions[second * 3 + 2]),
      ])
    }
    return { positions, colors, arcs, links }
  }, [compact, accent, secondary])

  const { camera } = useThree()
  useEffect(() => {
    if (!paused) return
    camera.position.z = cameraZ
    if (group.current) {
      group.current.rotation.x = rotation.x
      group.current.rotation.y = rotation.y
    }
  }, [camera, cameraZ, paused, rotation])
  useFrame((_, delta) => {
    const step = Math.min(delta, .05)
    if (!paused) time.current += step
    camera.position.z = MathUtils.damp(camera.position.z, cameraZ, 3, step)
    if (group.current) {
      group.current.rotation.x = MathUtils.damp(group.current.rotation.x, rotation.x, 4, step)
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, rotation.y + (paused ? 0 : time.current * (mode === 'pulse' ? .045 : .075)), 3, step)
    }
    if (center.current) {
      const pulse = mode === 'pulse' ? Math.sin(time.current * 2.4) * .045 : 0
      center.current.scale.setScalar(1 + pulse)
    }
    if (particleMaterial.current) particleMaterial.current.size = (compact ? .028 : .022) * (mode === 'pulse' ? 1 + Math.sin(time.current * 2.4) * .18 : 1)
    if (marker.current) {
      const angle = time.current * .8
      marker.current.position.set(Math.cos(angle) * 1.82, Math.sin(angle * 1.7) * .7, Math.sin(angle) * 1.82)
    }
  })

  return <group ref={group} rotation={[rotation.x, rotation.y, -.3]}>
    <mesh ref={center}>
      <sphereGeometry args={[1.69, 48, 32]} />
      <meshBasicMaterial color={new Color(accent).multiplyScalar(.035)} transparent opacity={.95} />
    </mesh>
    <mesh>
      <icosahedronGeometry args={[1.75, 2]} />
      <meshBasicMaterial color={accent} wireframe transparent opacity={mode === 'network' ? .38 : .18} />
    </mesh>
    {arcs.map((points, i) => <Line key={`orbit-${i}`} points={points} color={i % 4 === 0 ? secondary : accent} lineWidth={i % 4 === 0 ? 1 : .6} transparent opacity={mode === 'orbit' ? (i % 4 === 0 ? .72 : .34) : .11} />)}
    {links.map((points, i) => <Line key={`link-${i}`} points={points} color={i % 3 === 0 ? secondary : accent} lineWidth={i % 3 === 0 ? 1 : .65} transparent opacity={mode === 'network' ? .42 : 0} />)}
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /><bufferAttribute attach="attributes-color" args={[colors, 3]} /></bufferGeometry>
      <pointsMaterial ref={particleMaterial} vertexColors size={compact ? .028 : .022} transparent opacity={.95} sizeAttenuation blending={AdditiveBlending} depthWrite={false} />
    </points>
    <group rotation={[.6, -.3, .3]}>
      {[2.05, 2.14].map((radius, i) => <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[radius, i ? .003 : .008, 6, 180]} /><meshBasicMaterial color={i ? accent : secondary} transparent opacity={mode === 'orbit' ? (i ? .55 : .86) : .22} /></mesh>)}
    </group>
    <mesh rotation={[1, .65, .2]}><torusGeometry args={[2.2, .003, 4, 160, Math.PI * 1.6]} /><meshBasicMaterial color={accent} transparent opacity={mode === 'orbit' ? .62 : .18} /></mesh>
    <mesh ref={marker} visible={mode === 'pulse'}>
      <sphereGeometry args={[.055, 12, 12]} />
      <meshBasicMaterial color={secondary} />
    </mesh>
  </group>
}

export default function CoreScene({ paused, compact, mode, rotation, cameraZ, accent, secondary }: {
  paused: boolean
  compact: boolean
  mode: CoreMode
  rotation: { x: number; y: number }
  cameraZ: number
  accent: string
  secondary: string
}) {
  return <Canvas camera={{ position: [0, 0, cameraZ], fov: 42 }} dpr={[1, compact ? 1 : 1.25]} frameloop={paused ? 'demand' : 'always'} gl={{ antialias: !compact, alpha: true, powerPreference: 'low-power' }} onCreated={({ gl }) => gl.setClearColor('#050508', 0)}>
    <IntelligenceCore compact={compact} paused={paused} mode={mode} rotation={rotation} cameraZ={cameraZ} accent={accent} secondary={secondary} />
  </Canvas>
}
