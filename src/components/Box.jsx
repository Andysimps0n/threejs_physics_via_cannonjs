import React from 'react'

function Box({size, position}) {
  return (
        <mesh position={position}>
          <boxGeometry args={size} />
          <meshStandardMaterial />
        </mesh>
  )
}

export default Box

