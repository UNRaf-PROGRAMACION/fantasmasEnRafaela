// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class End extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("end");
    }
  
    init(data) {
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
      console.log(data);
      this.cantidadEstrellas = data.cantidadEstrellas;
    }
  
    create() {
      this.cantidadEstrellasTexto = this.add.text(
        240,
        400,
        "GAME OVER ",
        { fontSize: "50px", fill: "#FFFFFF" }
      );
      
        
    }
  }
  