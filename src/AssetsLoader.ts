import { PlayerAssets } from "./characters/mainPlayer/PlayerAssets";
import { FoodAssets } from "./characters/food/FoodAssets";

export class AssetsLoader {
    private playerAssets: PlayerAssets;
    private foodAssets: FoodAssets;
    constructor(
        playerAssets: PlayerAssets,
        foodAssets: FoodAssets,
    ) {
        this.playerAssets = playerAssets;
        this.foodAssets = foodAssets;
    }

    public async loadSprites() {
        this.playerAssets.addAssets();
        this.foodAssets.addAssets();
    }
}