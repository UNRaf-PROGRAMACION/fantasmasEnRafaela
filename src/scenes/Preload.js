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
      this.load.image("barra","./public/images/info-bar.png");
      this.load.image("ball","./public/images/ball.png")
      this.load.image("puerta1","./public/images/puerta1.png")
      this.load.image("puerta2","./public/images/puerta2.png")
      this.load.spritesheet("playButton","./public/images/play.png", {
        frameWidth: 243,
        frameHeight: 117,
      })

      this.load.spritesheet("fer","./public/images/PJ-Sheet.png",{
        frameWidth: 64,
        frameHeight: 64,
      });
      this.load.spritesheet("fantasma","./public/images/Ghosthat-sheet1.png",{
        frameWidth: 64,
        frameHeight: 64,
    });
    this.load.spritesheet("cofre","./public/images/cofre-Sheet.png",{
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("monedas", "./public/images/coins.png", {
      frameWidth: 32,
      frameHeight:32,
    });
    this.load.spritesheet("tesoro", "./public/images/trasure.png",{
      frameWidth: 32,
      frameHeight: 32,
    });
   

  }
    create() {
   
      //Creacion de animaciones  
     
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
        frameRate: 5,
        repeat: -1,
      });
      this.anims.create({
        key: "deathEnemy",
        frames: this.anims.generateFrameNumbers("fantasma", { start: 3, end: 5}),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: 'coinsAnim',
        frames: this.anims.generateFrameNumbers("monedas", {start:0, end:5}),
        frameRate: 10,
        repeat:-1,
      });
      this.anims.create({
        key:'treasureAnim',
        frames: this.anims.generateFrameNumbers("tesoro", {start:0, end:6}),
        frameRate:10,
        repeat:1,
      });
      this.anims.create({
        key:'treasureLoop',
        frames:this.anims.generateFrameNumbers('tesoro', {start:3, end:6}),
       frameRate:10,
        repeat:-1
  });
      // init scene juego
      this.scene.start("inicio");
    }
  }
