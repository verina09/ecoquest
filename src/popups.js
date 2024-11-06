export default class Popups {
    constructor(scene, in_title, in_maintext) {
        this.scene = scene;
        this.addPopup(in_title, in_maintext);
    }

    addPopup(in_title, in_maintext) {
        let popup_bg = this.scene.add.image(960, 540, 'popup-white');

        let title = this.scene.add.text(960, 250, in_title, {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        let maintext = this.scene.add.text(950, 500, in_maintext, {
            fontFamily: 'Arial', fontSize: 35, color: 'black',
            align: 'left'
        }).setOrigin(0.5);

        let button_ok = this.scene.add.image(960, 800, 'btn_ok');


        this.popup1Container = this.scene.add.container(0, 0, [popup_bg, title,maintext, button_ok]);
        this.popup1Container.setInteractive(new Phaser.Geom.Rectangle(0, 0, popup_bg.displayWidth*2, popup_bg.displayHeight*2), Phaser.Geom.Rectangle.Contains)


        this.popup1Container.on('pointerdown', () => {
            this.popup1Container.visible =  !this.popup1Container.visible
        });

        this.popup1Container.visible = true;
    }


    //currently not used as the pointerdown is controlled from init above
    showHidePopup() {

        this.popup1Container.visible = !this.popup.visible;

    }

}
