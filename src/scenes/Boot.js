import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('main-background', 'assets/game-images/EcoQuest.png');
        this.load.image('bg-color', 'assets/game-images/bg-color.png');
        this.load.image('congratulations', 'assets/game-images/congratulation.png');
        this.load.image('game_over', 'assets/game-images/game_over.png');
        
        this.load.image('main-board', 'assets/game-images/main-board.png');
        this.load.image('popup-action', 'assets/game-images/action-popup.png');
        this.load.image('popup-white', 'assets/game-images/white_popup.png');

        this.load.image('btn_start', 'assets/game-images/buttons/btn_start.png');
        this.load.image('btn_ok', 'assets/game-images/buttons/btn_ok.png');
        this.load.image('btn_backtomain', 'assets/game-images/buttons/btn_backtomain.png');
        this.load.image('btn_play', 'assets/game-images/buttons/btn_play.png');
        this.load.image('btn_1', 'assets/game-images/buttons/btn_1.png');
        this.load.image('btn_2', 'assets/game-images/buttons/btn_2.png');
        this.load.image('btn_3', 'assets/game-images/buttons/btn_3.png');
        this.load.image('btn_4', 'assets/game-images/buttons/btn_4.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
