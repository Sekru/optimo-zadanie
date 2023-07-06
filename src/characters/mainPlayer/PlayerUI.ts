import { Application, Text } from "pixi.js";

export class PlayerUI {
    private healthText?: Text;

    public setupUI(app: Application, currentHealth: Number) {
        this.healthText = new Text(`Health: ${currentHealth}`, {
            fontSize: 24,
            fill: 0xffffff,
        });
        this.healthText.x = window.innerWidth - 150;
        this.healthText.y = 10;
        app.stage.addChild(this.healthText);
    }

    public updateText(currentHealth: number) {
        this.healthText!.text = `Health: ${currentHealth}`;
    }
}