import { Application, Text } from "pixi.js";

export class LevelManagerUI {
    private mainText?: Text;

    public setupUI(app: Application) {
        this.mainText = new Text(`Start Game`, {
            fontSize: 34,
            fill: 0xffffff,
        });
        this.mainText.x = (window.innerWidth) / 2 - 50;
        this.mainText.y = window.innerHeight / 2;
        app.stage.addChild(this.mainText);

        setTimeout(() => {
            this.mainText!.alpha = 0;
        }, 2000);
    }

    public gameOver() {
        this.mainText!.alpha = 1;
        this.mainText!.text = `Game Over`;
    }
}