import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from '@react-three/drei'
import './App.css'
import Box from "./components/Box";

export default function App() {
return (
  <div id="canvas-container">
      <Canvas style={{background : "black"}}>

              <gridHelper />

        <OrbitControls></OrbitControls>
          <Box position={[0, -1, 0]} size={[10,1,10]}></Box>

        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 5, 5]} color="red" />
      </Canvas>
  </div>
);s
}