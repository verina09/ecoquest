import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(960, 540, 'main-background');

        const rect = this.add.image(960, 620, 'btn_start');
        rect.setInteractive();
        rect.scale = 0.8;

        rect.on("pointerover", () => {
            rect.scale = 0.85;
        });
        rect.on("pointerout", () => {
            rect.scale = 0.8;
        });
        rect.on('pointerdown', () => {
            this.scene.start('Game');
        });

    }
}
