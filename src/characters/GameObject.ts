import { Container } from "pixi.js";
import { BoxCollider } from "./BoxCollider";
export class GameObject {
    protected container: Container;
    protected boxCollider: BoxCollider;

    constructor() {
        this.container = new Container();
        this.boxCollider = new BoxCollider(this.container);
    }
}