import {
  MeshNormalMaterial,
  IcosahedronGeometry,
  TorusKnotGeometry,
} from 'three'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import {
  Debug,
  Physics,
  useBox,
  usePlane,
  useSphere,
  useTrimesh,
  useCylinder,
  useConvexPolyhedron,
} from '@react-three/cannon'

import { useRef, useMemo, useEffect } from 'react'

import { useControls } from 'leva'
  
function Plane({ tilt, rotation }) {
  const [ref, api] = usePlane(() => ({ mass: 0, rotation }), useRef())

  useEffect(()=>{
    if (tilt) {
      api.rotation.set(tilt.x, tilt.y, tilt.z)
    }
  }, [tilt.x])
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial />
    </mesh>
  )
}

function Box(props) {
  const [ref, api] = useBox(
    () => ({ args: [1, 1, 1], mass: 1, ...props }),
    useRef()
  )

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

function Sphere(props) {
  const [ref, api] = useSphere(
    () => ({ args: [0.75], mass: 1, ...props }),
    useRef()
  )

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <sphereGeometry args={[0.75]} />
      <meshNormalMaterial />
    </mesh>
  )
}

function Cylinder(props) {
  const [ref, api] = useCylinder(
    () => ({ args: [1, 1, 2, 8], mass: 1, ...props }),
    useRef()
  )

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <cylinderGeometry args={[1, 1, 2, 8]} />
      <meshNormalMaterial />
    </mesh>
  )
}


function TorusKnot(props) {
  const geometry = useMemo(() => new TorusKnotGeometry(), [])
  const [ref, api] = useTrimesh(
    () => ({
      args: [geometry.attributes.position.array, geometry.index.array],
      mass: 1,
      ...props,
    }),
    useRef()
  )

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <torusKnotGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}


function App() {

  useEffect(()=>{
    if (tilt){
      console.log(tilt)

    }
  })
  const gravity = useControls('Gravity', {
    x: { value: 0, min: -10, max: 10, step: 0.1 },
    y: { value: -9.8, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 },
  })

  const tilt = useControls("Tilt", {
    x: { value: -Math.PI / 2, min: -10, max: 10, step: 0.1 },
    y: { value: 0, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 },
  })


  return (
      <div id="canvas">
        <Canvas  style={{ background : "black", margin : 0, padding : 0 }} shadows camera={{ position: [0, 4, 6] }}>
          <spotLight
            position={[2.5, 5, 5]}
            angle={Math.PI / 4}
            penumbra={0.5}
            castShadow
            intensity={Math.PI * 25}
          />
          <spotLight
            position={[-2.5, 7, 7]}
            angle={Math.PI / 4}
            penumbra={0.5}
            castShadow
            intensity={Math.PI * 25}
          />
          <Physics gravity={[gravity.x, gravity.y, gravity.z]}>
            <Debug>
              <Plane rotation={[tilt.x, tilt.y, tilt.z ]} />
              <Box position={[-4, 3, 0]} />
              <Sphere position={[-2, 3, 0]} />
              <Cylinder position={[0, 3, 0]} />
              <TorusKnot position={[4, 3, 0]} />
            </Debug>
          </Physics>
          <OrbitControls target-y={0.5} />
          <Stats />
        </Canvas>
      </div>
  )
}

export default App;