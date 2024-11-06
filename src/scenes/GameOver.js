import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    init (data)
    {
        //data = {state: "WIN", failParameter: "The economy has collapsed."}
        this.data = data;
    }

    create ()
    {
        //this.cameras.main.setBackgroundColor(0xff0000);

        this.add.image(960, 540, 'bg-color');

        var longText;

        this.add.image(960, 540, 'popup-white');

        if(this.data.state == "WIN"){
            longText = "Congratulations, you survived Ecoquest!";

            const img = this.add.image(950, 410, 'congratulations');
            img.scale = 1.3;
        }
        else {
            longText = this.data.failParameter + '\nYou are not successful in winning Ecoquest this time.\nMaybe next time.'
            this.add.image(960, 410, 'game_over');
        }

        const text = this.add.text(950, 650, longText, {
            fontFamily: 'Arial', fontSize: 40, color: 'black',
            stroke: '#000000', strokeThickness: 0,
            align: 'center'
        }).setOrigin(0.5);


        const backBtn = this.add.image(950, 820, 'btn_backtomain');
        backBtn.setInteractive();
        backBtn.scale = 0.8;

        backBtn.on("pointerover", () => {
            backBtn.scale = 0.85;
        });
        backBtn.on("pointerout", () => {
            backBtn.scale = 0.8;
        });
        backBtn.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });


    }
}
