// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Nivelcompleto extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("nivelcompleto");
    }
  
    init(data) {
    
      console.log(data);
      this.lives=data.lives
      this.puntaje = data.puntaje||0;
      this.tesoroRecolectado=data.tesoroRecolectado;
    }
  
    create() {
      this.clic=this.sound.add('clic')
      this.background=this.add.image(200,15,'background')
      this.frameText=this.add.image(400,300,'frameText').setScale(0.08)
      this.titleText=this.add.sprite(400,100,'titleL1')
      this.titleText.anims.play("tituloL1anim")
      this.puntajeText=this.add.text(
        100,
        330,
        "Puntaje " +this.puntaje,
        { fontSize: "30px", fill: "#FFFFFF" }
      )
      this.tesoroText=this.add.text(
        100,
        400,
        "Tesoros recolectados " + this.tesoroRecolectado +" de 2",
        { fontSize: "30px", fill: "#FFFFFF" }
      )
      
      this.startButton=this.add.sprite(400,500,"nextLButton").setScale(0.5)
        .setInteractive()
    this.startButton.on('pointerover', () => {
        this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
        this.startButton.setFrame(0);
    });
    this.startButton.on('pointerdown', () => {
      this.clic.play();
    this.scene.start('scene2', {lives:this.lives, puntaje:this.puntaje, tesoroRecolectado:this.tesoroRecolectado,
    });
        });
        
    }
  }
  