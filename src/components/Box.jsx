import React from 'react'

function Box({size, position}) {
  return (
        <mesh receiveShadow castShadow position={position}>
          <boxGeometry args={size} />
          <meshStandardMaterial color="grey" />
        </mesh>
  )
}

export default Box

