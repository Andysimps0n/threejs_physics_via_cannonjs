import { useFrame, useThree } from "@react-three/fiber";

function Init() {



    const { camera } = useThree();

    camera.position.set(2, 2.5, 5)

    // useFrame(()=>{
    // console.log(camera.position);
    // },[camera])





    return null;
}

export default Init
