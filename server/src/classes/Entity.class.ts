import { Vector3 } from 'three';
import { ICoordinates, IEuler, TEntityModel, TPlayerModel } from './player.interface';

export class Entity {
    constructor(id: string, model: TEntityModel | TPlayerModel, position?: ICoordinates, rotation?: ICoordinates) {
        this.id = id;
        this.model = model;
        this.position = position ?? { x: 0, y: 0, z: 0 };
        this.rotation = rotation ?? { x: 0, y: 0, z: 0 };
    }

    private moveX(x: number) {
        this.position.x = x;
    }

    private moveY(y: number) {
        this.position.y = y;
    }

    private moveZ(z: number) {
        this.position.z = z;
    }
    private rotateX(x: number) {
        this.rotation.x = x;
    }

    private rotateY(y: number) {
        this.rotation.y = y;
    }

    private rotateZ(z: number) {
        this.rotation.z = z;
    }

    move(position: Vector3, rotation: IEuler) {
        this.moveX(position.x);
        this.moveZ(position.z);
        this.moveY(position.y);
        this.rotateX(rotation._x);
        this.rotateZ(rotation._z);
        this.rotateY(rotation._y);
    }

    id: string;
    position: ICoordinates;
    rotation: ICoordinates;
    model: TEntityModel | TPlayerModel;
}
