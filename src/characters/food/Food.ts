import { FoodAssets } from "./FoodAssets";
import { GameObject } from "../GameObject";
import { FoodEnum } from "../../enums/FoodEnum";
import { Player } from "../mainPlayer/Player";
import { Container } from "pixi.js";

export class Food extends GameObject {
    private hitPoint?: number;
    private name: FoodEnum;
    private assets: FoodAssets;
    private speed: number;

    static ANCHOR: number = 0.5;

    constructor(name: FoodEnum, speed: number) {
        super();
        this.container.x = this.randomPosition();
        this.container.y = 0;
        this.speed = speed | 2;
        this.name = name;
        this.hitPoint = 1;
        this.assets = new FoodAssets();

        this.init(this.name.toLowerCase());
    }

    private init(name: String) {
        this.assets.loadSheet().then(() => {
            //@ts-ignore
            this.assets[name].anchor.set(Food.ANCHOR);
            //@ts-ignore
            this.container.addChild(this.assets[name]);
        });
    }

    private randomPosition(): number {
        return Math.floor(Math.random() * window.innerWidth);
    }

    private rotate() {
        this.container.rotation += 0.2;
    }

    private moveDown(player: Player) {
        this.container.y += this.speed;
        if (this.container.y >= window.innerHeight) {
            this.container.destroy();
            this.hitObject(player);
        }
    }

    public getContainer(): Container {
        return this.container;
    }

    public hitObject(player: Player) {
        player.decreaseHealth(this.hitPoint!);
    }

    public gameLoop(player: Player) {
        if (this.container.transform) {
            this.rotate();
            this.moveDown(player);
            this.boxCollider.onCollision(player.getContainer(), (state: boolean) => {
                if (state) {
                    this.container.destroy();
                }
            });
        }
    }
}