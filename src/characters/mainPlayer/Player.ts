import { Application } from "pixi.js";
import { Key } from "../../enums/Key";
import { GameObject } from "../GameObject";
import { PlayerUI } from "./PlayerUI";
import { PlayerAnimation } from "./PlayerAnimation";

export class Player extends GameObject {
    private currentHealth: number = 10;
    private ui: PlayerUI;
    private animation: PlayerAnimation;

    constructor(app: Application) {
        super();
        this.ui = new PlayerUI();
        this.animation = new PlayerAnimation();
        this.setupPlayer(app);
    }

    private setupEvents() {
        window.addEventListener('keydown', (event) => {
            this.animation.assets.idleAnim.stop();
            switch (event.key) {
                case Key.LEFT:
                    this.container.removeChildren();
                    this.animation.playMoveLeftAnim();
                    this.container.addChild(this.animation.assets.moveLeftAnim);
                    break;
                case Key.RIGHT:
                    this.container.removeChildren();
                    this.animation.playMoveRightAnim();
                    this.container.addChild(this.animation.assets.moveRightAnim);
                    break;
                default:
                    break;
            }
        });

        window.addEventListener('keyup', () => {
            this.container.removeChildren();
            this.animation.playIdleAnim();
            this.container.addChild(this.animation.assets.idleAnim);
            this.animation.assets.moveRightAnim.stop();
            this.animation.assets.moveLeftAnim.stop();
        });
    }

    private movement(delta: number) {
        if (this.animation.assets.moveLeftAnim.playing) {
            this.container.x -= 5 * delta;
        }

        if (this.animation.assets.moveRightAnim.playing) {
            this.container.x += 5 * delta;
        }
    }

    private setupPlayer(app: Application) {
        this.animation.init().then(() => {
            this.setupEvents();
            this.ui.setupUI(app, this.currentHealth);
            if (this.animation.assets.idleAnim) {
                this.container.x = app.screen.width / 2;
                this.container.y = app.screen.height - 50;
                this.animation.playIdleAnim();
                this.container.addChild(this.animation.assets.idleAnim);
                app.stage.addChild(this.container);
            }
        });
    }

    public isPlayerAlive() {
        return this.currentHealth > 0;
    }

    public decreaseHealth(hitPoint: number) {
        this.currentHealth -= hitPoint;
        this.ui.updateText(this.currentHealth);
    }

    public getContainer() {
        return this.container;
    }

    public gameLoop(delta: number) {
        if (!this.isPlayerAlive()) {
            this.container.destroy();
        }
        if (this.animation.assets.moveLeftAnim) {
            this.movement(delta);
        }
    }
}