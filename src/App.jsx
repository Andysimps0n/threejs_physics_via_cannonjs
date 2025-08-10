import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stats, OrbitControls } from '@react-three/drei'
import { useEffect } from "react";

// file imports
import './App.css'
import Box from "./components/Box";
import Init from "./components/Init";

export default function App() {


return (
  <div id="canvas-container">
      <Canvas shadows  position={[4.3, 4.5, 10.1]} style={{background : "black"}}>

        {/* Helpers */}
        <OrbitControls/>
        <Init/>

        {/* Light setting */}
        <ambientLight intensity={0.1} />
        <directionalLight  castShadow position={[0, 5, 5]} color="white" />


        {/* Objects */}
          <Box position={[0, -1, 0]} size={[10,1,10]}></Box>
          <Box position={[0, 0, 0]} size={[2, 2, 2]}></Box>

      </Canvas>
  </div>
);s
}