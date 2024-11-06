import { Scene } from 'phaser';
import Popups from '../popups'

let score_fontSettings = {
            fontFamily: 'Arial Black', fontSize: 40, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }

let round_fontSettings = {
            fontFamily: 'Arial Black', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }


export class Game extends Scene
{
    resetScoreTurns()
    {
        this.environment_health = 100
        this.economic_stability = 100
        this.public_satisfaction = 100
        this.currTurns = 1 
        this.maxTurns = 10  //Number of turns

        this.currAction = 0
    }

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.resetScoreTurns();

        this.add.image(960, 540, 'main-board');
        this.gameSetup();

        //this.createActionPopup();

    }

    gameSetup()
    {
        let maintext = `Achieve a balance of the three core metrics—environmental health, \neconomic growth, and public satisfaction—by the end of the game. 

The game lasts for 10 rounds. In each round, you are to make \na decision that will impact the world. 

If any metric drops too low (e.g., catastrophic pollution \nor complete economic collapse), you will lose the game.`

        this.popup = new Popups(this,'Game Objective', maintext);

        this.envi_score_label = this.add.text(430, 65, this.environment_health, score_fontSettings).setOrigin(0.5);
        this.econ_score_label = this.add.text(950, 65, this.economic_stability, score_fontSettings).setOrigin(0.5);
        this.public_score_label = this.add.text(1450, 65, this.public_satisfaction, score_fontSettings).setOrigin(0.5);

        this.round_score_label = this.add.text(1760, 150, this.currTurns, round_fontSettings).setOrigin(0.5);


        //play button
        let play_btn = this.add.image(1780, 260, 'btn_play')

        play_btn.setInteractive();
        play_btn.scale = 0.45;

        play_btn.on("pointerover", () => {
            play_btn.scale = 0.5;
        });
        play_btn.on("pointerout", () => {
            play_btn.scale = 0.45;
        });
        play_btn.on('pointerdown', () => {
            //if(this.currAction != 0)
                this.createActionPopup();
            //this.scene.start('GameOver'); //TO UPDATE TO SHOW ACTION POPUP?
        });
    }


    createActionPopup()
    {
        let action_popup = this.add.image(960, 540, 'popup-action');

        this.inActionRound_label = this.add.text(560, 840, this.currTurns, {
            fontFamily: 'Arial Bold', fontSize: 35, color: 'black',
            align: 'left'
        }).setOrigin(0.5);

        let select_1 = this.add.line(470, 640, 0, 0,100,0,0xff0000).setLineWidth(10);
        let select_2 = this.add.line(780, 640, 0, 0,100,0,0xff0000).setLineWidth(10);
        let select_3 = this.add.line(1100, 640, 0, 0,100,0,0xff0000).setLineWidth(10);
        let select_4 = this.add.line(1450, 640, 0, 0,100,0,0xff0000).setLineWidth(10);

        select_1.visible = false;
        select_2.visible = false;
        select_3.visible = false;
        select_4.visible = false;

        let btn_1 = this.add.image(470, 710, 'btn_1');
        btn_1.setInteractive();
        btn_1.on("pointerover", () => { btn_1.scale = 1.1;});
        btn_1.on("pointerout", () => { btn_1.scale = 1;});
        btn_1.on('pointerdown', () => {
            
            select_1.visible = true;
            select_2.visible = false;
            select_3.visible = false;
            select_4.visible = false;
            this.currAction =  1;
        });

        let btn_2 = this.add.image(780, 710, 'btn_2');
        btn_2.setInteractive();
        btn_2.on("pointerover", () => { btn_2.scale = 1.1;});
        btn_2.on("pointerout", () => { btn_2.scale = 1;});
        btn_2.on('pointerdown', () => {
            
            select_1.visible = false;
            select_2.visible = true;
            select_3.visible = false;
            select_4.visible = false;
            this.currAction =  2;
        });

        let btn_3 = this.add.image(1100, 710, 'btn_3');
        btn_3.setInteractive();
        btn_3.on("pointerover", () => { btn_3.scale = 1.1;});
        btn_3.on("pointerout", () => { btn_3.scale = 1;});
        btn_3.on('pointerdown', () => {
            
            select_1.visible = false;
            select_2.visible = false;
            select_3.visible = true;
            select_4.visible = false;
            this.currAction =  3;
        });

        let btn_4 = this.add.image(1450, 710, 'btn_4');
        btn_4.setInteractive();
        btn_4.on("pointerover", () => { btn_4.scale = 1.1;});
        btn_4.on("pointerout", () => { btn_4.scale = 1;});
        btn_4.on('pointerdown', () => {
            
            select_1.visible = false;
            select_2.visible = false;
            select_3.visible = false;
            select_4.visible = true;
            this.currAction =  4;
        });


        let button_ok = this.add.image(1450, 830, 'btn_ok');
        button_ok.setInteractive();
        button_ok.on("pointerover", () => { button_ok.scale = 1.1;});
        button_ok.on("pointerout", () => { button_ok.scale = 1;});
        button_ok.on('pointerdown', () => {
            this.updateGame()
        });
    }

    updateGame()
    {
        this.runCalculation(this.currAction)
        
        //update Score label
        this.envi_score_label.setText(this.environment_health)
        this.econ_score_label.setText(this.economic_stability)
        this.public_score_label.setText(this.public_satisfaction)

        this.checkGameOver()

        this.currTurns += 1
        this.round_score_label.setText(this.currTurns)
        this.inActionRound_label.setText(this.currTurns)
        
        //TODO:
        //hide actionpopup and stamp the boxes with action done?
        //random event?
    }

    runCalculation(actionNum)
    {
        //update current scores
        switch(actionNum) {
            
            case 1: //Wind Farm
                this.environment_health += 10
                this.economic_stability -= 5
                this.public_satisfaction += 5
                break;

            case 2: //Coal Mining
                this.environment_health -= 20
                this.economic_stability += 10
                this.public_satisfaction += -5
                break;

            case 3: //Green Tax
                this.environment_health += 5
                this.economic_stability -= 10
                this.public_satisfaction -= 5
                break;

            case 4: //Sustainability Campaign
                this.environment_health += 5
                this.economic_stability -= 5
                this.public_satisfaction += 10
                break;
 
            break;
            //default: - executed when there is no match
        }

        //Cap Value to 100
        //this.environment_health = Math.max(0, Math.min(this.environment_health, 100));
        //this.economic_stability = Math.max(0, Math.min(this.economic_stability, 100));
        //this.public_satisfaction = Math.max(0, Math.min(this.public_satisfaction, 100));
    }

    checkGameOver()
    {
        let param, state = "WIN", causeOfLosing;

        if (this.environment_health <= 0) {
            state = "LOSE"
            causeOfLosing = 'The environment has collapsed.'
        } else if (this.economic_stability <= 0) {
            state = "LOSE"
            causeOfLosing = 'The economy has collapsed.'
        } else  if (this.public_satisfaction <= 0) {
            state = "LOSE"
            causeOfLosing = 'The public has revolted.'
        }

        //last round
        if(this.currTurns == 10 || state == "LOSE")
        {
            if(state == "LOSE")
                param = {state: state, failParameter: causeOfLosing}
            else
                param = {state:"WIN", failParameter: ""}

            this.scene.start('GameOver', param);
        }  

    }
}
