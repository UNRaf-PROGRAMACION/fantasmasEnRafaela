export default class Preload extends Phaser.Scene {
    constructor() {
      // key of the scene
      super("preload");
    }
  
    preload() {
      // load assets
      this.load.tilemapTiledJSON("map","./public/tilemaps/nivel1.json");
      this.load.tilemapTiledJSON("maze1","./public/tilemaps/maze1.json");
      this.load.image("tilePiso","./public/images/piso.png");
      this.load.image("tileTecho","./public/images/atlas-techo.png");
      this.load.image("tilePared","./public/images/wall.png");
      this.load.image("tileGuirnalda","./public/images/garlands.png");
      this.load.image("puerta","./public/images/door.png");
      this.load.image("barra","./public/images/info-bar.png");
      this.load.spritesheet("fer","./public/images/PJ-Sheet.png",{
        frameWidth: 64,
        frameHeight: 64,
      });
      this.load.spritesheet("fantasma","./public/images/Ghosthat-sheet.png",{
        frameWidth: 64,
        frameHeight: 64,
    });
    this.load.spritesheet("cofre","./public/images/cofre-Sheet.png",{
      frameWidth: 64,
      frameHeight: 64,
    });
  }
    create() {
      //  Our player animations, turning, walking left and walking right.
      // se crea una sola vez, para que no de error en el restart de la escena
      
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("fer", { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "front",
        frames: [{ key: "fer", frame: 0 }],
        frameRate: 20,
      });
  
      this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("fer", { start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "top",
        frames: this.anims.generateFrameNumbers("fer", { start: 8, end: 11}),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "downEnemy",
        frames: this.anims.generateFrameNumbers("fantasma", { start: 0, end: 2}),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "upEnemy",
        frames: this.anims.generateFrameNumbers("fantasma", { start: 9, end: 11}),
        frameRate: 10,
        repeat: -1,
      });
      // init scene juego
      this.scene.start("scene1");
    }
  }
