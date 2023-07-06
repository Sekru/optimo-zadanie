import { PlayerAssets } from "./PlayerAssets";

export class PlayerAnimation {
    public assets: PlayerAssets;

    static ANIMATION_SPEED: number = 10/60;
    static ANCHOR: number = 0.5;

    constructor() {
        this.assets = new PlayerAssets();
    }

    public init(): Promise<void> {
        return this.assets.loadSheet();
    }

    public playIdleAnim() {
        this.assets.idleAnim.anchor.set(PlayerAnimation.ANCHOR);
        this.assets.idleAnim.animationSpeed = PlayerAnimation.ANIMATION_SPEED;
        this.assets.idleAnim.play();
    }

    public playMoveLeftAnim() {
        if (!this.assets.moveLeftAnim.playing) {
            this.assets.moveLeftAnim.anchor.set(PlayerAnimation.ANCHOR);
            this.assets.moveLeftAnim.animationSpeed = PlayerAnimation.ANIMATION_SPEED;
            this.assets.moveLeftAnim.play();
        }
    }

    public playMoveRightAnim() {
        if (!this.assets.moveRightAnim.playing) {
            this.assets.moveRightAnim.anchor.set(PlayerAnimation.ANCHOR);
            this.assets.moveRightAnim.animationSpeed = PlayerAnimation.ANIMATION_SPEED;
            this.assets.moveRightAnim.play();
        }
    }
}