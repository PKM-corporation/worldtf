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
    | 'Material.008'
    | 'Material.012'
    | 'Material.013'
    | 'Material.009'
    | 'Material.010'
    | 'Material.011'
    | 'Grass'
    | 'Haie'
    | 'Wood1'
    | 'Black'
    | 'Window'
    | 'Bumpers'
    | 'Bottom'
    | 'Lights'
    | 'Tires'
    | 'Body'
    | 'Wheels'
    | 'Tires'
    | 'Body'
    | 'Body.002'
    | 'Body.001'
    | 'Body.003'
    | 'Body.004'
    | 'Tires.001';
export type TMapNodes =
    | 'Cube004'
    | 'Cube004_1'
    | 'Cube004_2'
    | 'Cube004_3'
    | 'Cube004_4'
    | 'Cube004_5'
    | 'Cube004_6'
    | 'Cube004_7'
    | 'Plane002'
    | 'Plane002_1'
    | 'Cube025'
    | 'Cube025_1'
    | 'Cube025_2'
    | 'Cube025_3'
    | 'Cube025_4'
    | 'Cube025_5'
    | 'Cube030'
    | 'Cube030_1'
    | 'Cube030_2'
    | 'Cube030_3'
    | 'Cube030_4'
    | 'Cube030_5'
    | 'Car_Cube_1'
    | 'Car_Cube_2'
    | 'Car_Cube_3'
    | 'Car_Cube_4'
    | 'Car_Cube_5'
    | 'Car_Cube_6'
    | 'Car_Cube_7'
    | 'Car_Cube_8'
    | 'Car_Cube001_1'
    | 'Car_Cube001_2'
    | 'Car_Cube001_3'
    | 'Car_Cube001_4'
    | 'Car_Cube001_5'
    | 'Car_Cube001_6'
    | 'Car_Cube001_7'
    | 'Car_Cube001_8'
    | 'Car_Cube002_1'
    | 'Car_Cube002_2'
    | 'Car_Cube002_3'
    | 'Car_Cube002_4'
    | 'Car_Cube002_5'
    | 'Car_Cube002_6'
    | 'Car_Cube002_7'
    | 'Car_Cube002_8'
    | 'Car_Cube003_1'
    | 'Car_Cube003_2'
    | 'Car_Cube003_3'
    | 'Car_Cube003_4'
    | 'Car_Cube003_5'
    | 'Car_Cube003_6'
    | 'Car_Cube003_7'
    | 'Car_Cube003_8'
    | 'Car_Cube004_1'
    | 'Car_Cube004_2'
    | 'Car_Cube004_3'
    | 'Car_Cube004_4'
    | 'Car_Cube004_5'
    | 'Car_Cube004_6'
    | 'Car_Cube004_7'
    | 'Car_Cube004_8'
    | 'Car_Cube005_1'
    | 'Car_Cube005_2'
    | 'Car_Cube005_3'
    | 'Car_Cube005_4'
    | 'Car_Cube005_5'
    | 'Car_Cube005_6'
    | 'Car_Cube005_7'
    | 'Car_Cube005_8';

export type TMapGLTF = GLTF & {
    materials: {
        [key in TMapMaterials]: MeshStandardMaterial;
    };
    nodes: {
        [key in TMapNodes]: SkinnedMesh;
    };
};

export type TTableMaterials = 'Wood';
export type TTableNodes = 'Circle';

export type TTableGLTF = GLTF & {
    materials: {
        [key in TTableMaterials]: MeshStandardMaterial;
    };
    nodes: {
        [key in TTableNodes]: SkinnedMesh;
    };
};
