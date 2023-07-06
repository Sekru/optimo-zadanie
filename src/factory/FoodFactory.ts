import { Food } from "../characters/food/Food";
import { FoodEnum } from "../enums/FoodEnum";
import { Application } from "pixi.js";

export class FoodFactory {
    constructor() {
    }

    private randomEnumValue(): FoodEnum {
        const enumValues = Object.values(FoodEnum);
        const index = Math.floor(Math.random() * enumValues.length);
        return enumValues[index];
    }

    public spawn(app: Application, speed: number) {
        const food = new Food(this.randomEnumValue(), speed);
        app.stage.addChild(food.getContainer());
        return food;
    }
}