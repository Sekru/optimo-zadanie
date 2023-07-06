import { Food } from "../characters/food/Food";
import { Player } from "../characters/mainPlayer/Player";
import { Application } from "pixi.js";
import { FoodFactory } from "../factory/FoodFactory";
import { LevelManagerUI } from "./LevelManagerUI";

export class LevelManager {
    private foods: Food[] = [];
    private player?: Player;
    private foodFactory: FoodFactory;
    private levelManagerUI: LevelManagerUI;
    private everySecondsSpawn = 5;
    private foodSpeed = 2;

    constructor() {
        this.foodFactory = new FoodFactory();
        this.levelManagerUI = new LevelManagerUI();
    }

    private makeLevelHarderEvery15Seconds(seconds: number) {
        if (seconds % 15 === 0 && seconds !== 0) {
            this.foodSpeed++;
        }
    }

    private appendFood(food: Food) {
        this.foods.push(food);
    }

    public spawnFoods(seconds: number, app: Application) {
        this.makeLevelHarderEvery15Seconds(seconds);
        if (seconds % this.everySecondsSpawn === 0) {
            this.appendFood(this.foodFactory.spawn(app, this.foodSpeed));
        }
    }

    public gameLoop(delta: number, app: Application) {
        if (!this.player?.isPlayerAlive()) {
            this.levelManagerUI.gameOver();
            app.stop();
        }
        this.player?.gameLoop(delta);
        this.foods.forEach(e => e.gameLoop(this.player!))
    }

    public startLevel(player: Player, app: Application) {
        this.player = player;
        this.levelManagerUI.setupUI(app);
    }
}