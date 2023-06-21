export default class Maze1 extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("maze1");
    }
  
    init() {
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
  
     
    }
  
    create() {
      // todo / para hacer: texto de puntaje
      const map = this.make.tilemap({ key: "maze1" });
  
      // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
      // Phaser's cache (i.e. the name you used in preload)
      const capaFondo = map.addTilesetImage("piso", "tilePiso");
      const capaTecho = map.addTilesetImage("atlas-techo", "tileTecho");
      const capaPlataformas = map.addTilesetImage("wall", "tilePared");

      const fondoLayer = map.createLayer(
        "fondo", 
      capaFondo, 
      0, 0);
      const techoLayer = map.createLayer(
        "techo",
        capaTecho,
        0,
        0
      );
      const paredLayer = map.createLayer (
        "plataformas", 
        capaPlataformas,
        0,0);

     /* const objectosLayer = map.getObjectLayer("objetos");
  
      plataformaLayer.setCollisionByProperty({ colision: true });
  
      console.log("spawn point player", objectosLayer);
  
      // crear el jugador
      // Find in the Object Layer, the name "dude" and get position
      let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
      console.log(spawnPoint);
      // The player and its settings
      this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
  
      //  Player physics properties. Give the little guy a slight bounce.
      this.jugador.setBounce(0.1);
      this.jugador.setCollideWorldBounds(true);
  
      spawnPoint = map.findObject("objetos", (obj) => obj.name === "salida");
      console.log("spawn point salida ", spawnPoint);
      this.salida = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "salida")
        .setScale(0.2);
  
      //  Input Events
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Create empty group of starts
      this.estrellas = this.physics.add.group();
  
      // find object layer
      // if type is "stars", add to stars group
      objectosLayer.objects.forEach((objData) => {
        //console.log(objData.name, objData.type, objData.x, objData.y);
  
        const { x = 0, y = 0, name } = objData;
        switch (name) {
          case "estrella": {
            // add star to scene
            // console.log("estrella agregada: ", x, y);
            const star = this.estrellas.create(x, y, "star");
            break;
          }
        }
      });*/
  
    }
  
    update() {
      // update game objects
      // check input
    
  
  }
}