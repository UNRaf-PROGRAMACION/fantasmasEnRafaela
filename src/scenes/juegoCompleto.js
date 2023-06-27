// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class JCompleto extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("jcompleto");
    }
  
    init(data) {
    
      console.log(data);
      this.puntaje = data.puntaje||0;
      this.tesoroRecolectado=data.tesoroRecolectado||0
    }
  
    create() {
      this.clic=this.sound.add('clic')
      this.background=this.add.image(200,15,'background')
      this.frameText=this.add.image(400,300,'frameText').setScale(0.08)
      this.congratText = this.add.text(
        130,
        200,
        "FELICITACIONES",
        { fontSize: "30px", fill: "#FFFFFF" }
      );
      this.congrat2Text = this.add.text(
        100,
        250,
        "Completaste los dos niveles",
        { fontSize: "30px", fill: "#FFFFFF" }
      );
      this.puntajeText=this.add.text(
        100,
        400,
        "Puntaje final " +this.puntaje,
        { fontSize: "20px", fill: "#FFFFFF" }
      )
      this.tesoroText=this.add.text(
        100,
        300,
        "Recolectaste " + this.tesoroRecolectado + " tesoros y evadiste a \n"+
        "2 fantasmas",
        { fontSize: "20px", fill: "#FFFFFF" }
      )
      
      this.restartButton=this.add.sprite(400,500,"restartButton").setScale(0.5)
        .setInteractive()
        this.restartButton.on('pointerover', () => {
        this.restartButton.setFrame(1);
    });
        this.restartButton.on('pointerout', () => {
        this.startButton.setFrame(0);
    });
        this.restartButton.on('pointerdown', () => {
      this.clic.play();
    this.scene.start('inicio');
        });
        
    }
  }
  