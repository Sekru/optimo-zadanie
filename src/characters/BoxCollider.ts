import { Container } from "pixi.js";

export class BoxCollider {
    public isActive = false;
    private container: Container;

    constructor(container: Container) {
        this.container = container;
    }
    public hitTestRectangle(o1: Container, o2: Container): boolean {
        let hit = false;
        let combinedHalfWidths = 0;
        let combinedHalfHeights = 0;
        let vx = 0;
        let vy = 0;

        hit = false;
        vx = (o1.x + o1.width / 2) - (o2.x + o2.width / 2);
        vy = (o1.y + o1.height / 2) - (o2.y + o2.height / 2);


        combinedHalfWidths = o1.width / 2 + o2.width / 2;
        combinedHalfHeights = o1.height / 2 + o2.height / 2;

        if (Math.abs(vx) < combinedHalfWidths) {
            if (Math.abs(vy) < combinedHalfHeights) {
                hit = true;
            } else {
                hit = false;
            }
        } else {
            hit = false;
        }
        return hit;
    };

    public onCollision(o1: Container, callback: Function): void {
        if (!o1.transform || !this.container.transform) {
            return;
        }

        if (this.hitTestRectangle(o1, this.container)) {
            if (!this.isActive) {
                callback(true);
            }
            this.isActive = true;
        } else {
            if (this.isActive) {
                callback(false);
            }
            this.isActive = false;
        }
    }
}