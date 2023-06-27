// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Controles extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("controles");
    }
  
    init() {
    
     
    }
  
    create() {
      this.clic=this.sound.add('clic')
      this.frameText=this.add.image(400,300,'frameText').setScale(0.08)
      this.ayudaText = this.add.text(
        130,
        80,
        "CONTROLES",
        { fontSize: "100px", fill: "#FFFFFF" }
      );
      this.controlesText=this.add.image(400,300,'controlImagen')
      
      this.menuButton=this.add.sprite(400,500,"menuButton").setScale(0.5)
        .setInteractive()
        this.menuButton.on('pointerover', () => {
        this.menuButton.setFrame(1);
    });
        this.menuButton.on('pointerout', () => {
        this.menuButton.setFrame(0);
    });
        this.menuButton.on('pointerdown', () => {
      this.clic.play();
    this.scene.start('inicio');
        });
        
    }
  }
  