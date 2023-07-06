import { AnimatedSprite, Assets, TextureSource, Texture } from "pixi.js";

const pathToImages = 'assets/images/main_character/';

export class PlayerAssets {
    private sheet?: { animations: { idle: any; moveLeft: any; moveRight: any; }; };
    public idleAnim!: AnimatedSprite;
    public moveLeftAnim!: AnimatedSprite;
    public moveRightAnim!: AnimatedSprite;

    public addAssets() {
        Assets.add('player', `${pathToImages}spritesheet.json`)
    }

    public async loadSheet() {
        this.sheet = await Assets.load('player');
        this.idleAnim = new AnimatedSprite(this.sheet?.animations.idle
            .map((image: TextureSource) => Texture.from(`${pathToImages}/idle/${image}`)));
        
        this.moveLeftAnim = new AnimatedSprite(this.sheet?.animations.moveLeft
            .map((image: TextureSource) => Texture.from(`${pathToImages}/move_left/${image}`)));

        this.moveRightAnim = new AnimatedSprite(this.sheet?.animations.moveRight
            .map((image: TextureSource) => Texture.from(`${pathToImages}/move_right/${image}`)));
    }
}