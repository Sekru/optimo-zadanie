import { Assets, Sprite } from "pixi.js";
import { FoodEnum } from "../../enums/FoodEnum";

const pathToImages = 'assets/images/food/';

export class FoodAssets {
    public apple!: Sprite;
    public avocado!: Sprite;
    public bacon!: Sprite;

    public addAssets() {
        Assets.add(FoodEnum.APPLE, `${pathToImages}${FoodEnum.APPLE}.png`);
        Assets.add(FoodEnum.AVOCADO, `${pathToImages}${FoodEnum.AVOCADO}.png`);
        Assets.add(FoodEnum.BACON, `${pathToImages}${FoodEnum.BACON}.png`);
    }

    public async loadSheet() {
        const appleTexture = await Assets.load(FoodEnum.APPLE);
        const avocadoTexture = await Assets.load(FoodEnum.AVOCADO);
        const baconTexture = await Assets.load(FoodEnum.BACON);

        this.apple = Sprite.from(appleTexture);
        this.avocado = Sprite.from(avocadoTexture);
        this.bacon = Sprite.from(baconTexture);
    }
}