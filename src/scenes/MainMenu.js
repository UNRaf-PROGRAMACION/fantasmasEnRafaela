// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Inicio extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("inicio");
    }
  
    init() {

    
    }
  
    create() {
        this.clic=this.sound.add('clic')
    this.background=this.add.image(400,30,'background')
    this.menu=this.add.image(400,150,'menu').setScale(0.08)

    this.startButton=this.add.sprite(400,400,"playButton")
        .setInteractive()
    this.startButton.on('pointerover', () => {
        this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
        this.startButton.setFrame(0);
    });
    this.startButton.on('pointerdown', () => {
        this.clic.play()
    this.scene.start('scene2');
        });
   
     }
    
   
    }
  
  