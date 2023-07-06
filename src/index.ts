import { Application } from "pixi.js";
import { AssetsLoader } from "./AssetsLoader";
import { Player } from "./characters/mainPlayer/Player";
import { PlayerAssets } from "./characters/mainPlayer/PlayerAssets";
import { FoodAssets } from "./characters/food/FoodAssets";
import { LevelManager } from "./manager/LevelManager";

const app = new Application<HTMLCanvasElement>({
    resizeTo: window,
    backgroundColor: 0x2980b9,
    resolution: devicePixelRatio
});

document.body.appendChild(app.view);

async function init()
{
    const playerAssets = new PlayerAssets();
    const foodAssets = new FoodAssets();
    const assetsLoader = new AssetsLoader(playerAssets, foodAssets);
    await assetsLoader.loadSprites();

    const player = new Player(app);
    const levelManager = new LevelManager();
    levelManager.startLevel(player, app);
    let timer = 0;
    let seconds = 0;
    app.ticker.add((delta: number) => {
        const time = Math.floor(timer / 60);
        if (time !== seconds) {
            seconds = time;
            levelManager.spawnFoods(seconds, app);
        }
        levelManager.gameLoop(delta, app);
        timer++;
    });

    app.ticker.start();
}

init();