import { ObjectMap } from '@react-three/fiber';
import { AnimationAction, MeshStandardMaterial, SkinnedMesh } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export type TAnimation =
    | 'Walking_forward'
    | 'Walking_left'
    | 'Walking_right'
    | 'Walking_backward'
    | 'Running_forward'
    | 'Running_backward'
    | 'Running_left'
    | 'Running_right'
    | 'Jumping'
    | 'Falling_idle'
    | 'Falling_to_landing'
    | 'Idle';

export type TAnimationAction = {
    [key in TAnimation]: AnimationAction;
};

export type TAjMaterials = 'Boy01_Body_MAT' | 'Boy01_Eyes_MAT1' | 'Boy01_Brows_MAT1' | 'Boy01_Mouth_MAT1';
export type TAjGLTF = GLTF & {
    materials: {
        [key in TAjMaterials]: MeshStandardMaterial;
    };
};
export type TAjNodes = 'Boy01_Body_Geo' | 'Boy01_Brows_Geo' | 'Boy01_Eyes_Geo' | 'h_Geo';
export type TAjObjectMap = ObjectMap & {
    nodes: {
        [key in TAjNodes]: SkinnedMesh;
    };
};

export type TStoolMaterials = 'stool';
export type TStoolNodes = 'stool';
export type TStoolGLTF = GLTF & {
    materials: {
        [key in TStoolMaterials]: MeshStandardMaterial;
    };
    nodes: {
        [key in TStoolNodes]: SkinnedMesh;
    };
};

export type TMapMaterials =
    | 'Material.001'
    | 'Material.002'
    | 'Material.003'
    | 'Material.004'
    | 'Material.005'
    | 'Material.006'
    | 'Material.007'
    | 'Material.008';
export type TMapNodes = 'Cube_1' | 'Cube_2' | 'Cube_3' | 'Cube_4' | 'Cube004' | 'Cube004_1' | 'Cube004_2' | 'Cube005' | 'Cube005_1' | 'Cube005_2';

export type TMapGLTF = GLTF & {
    materials: {
        [key in TMapMaterials]: MeshStandardMaterial;
    };
    nodes: {
        [key in TMapNodes]: SkinnedMesh;
    };
};
