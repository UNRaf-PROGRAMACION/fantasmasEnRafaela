export default class Maze1 extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("maze1");
    }
  
    init() {
     this.puntaje=0;     
    }
  
    create() {
      
      const map = this.make.tilemap({ key: "maze1" });
      //carga de imagenes
      const objectosLayer = map.getObjectLayer("objetos");
      const capaFondo = map.addTilesetImage("piso", "tilePiso");
      const capaTecho = map.addTilesetImage("atlas-techo", "tileTecho");
      const capaPlataformas = map.addTilesetImage("wall", "tilePared");
  
      const capaBarra=map.addTilesetImage("info-bar", "barra");

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
        const barraLayer = map.createLayer (
          "barra",
          capaBarra,
          0,
          0,
        );      
      paredLayer.setCollisionByProperty({ colision: true });
      techoLayer.setCollisionByProperty({ colision: true });

//  Jugador y sus configuraciones
let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
console.log(spawnPoint);
this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "fer");
this.jugador.setBounce(0.1);
this.jugador.setCollideWorldBounds(true);
console.log(this.jugador)
this.jugador.body.allowGravity = false;

this.cursors = this.input.keyboard.createCursorKeys();
//creacion de monedas
this.monedas = this.physics.add.group();
objectosLayer.objects.forEach((objData) => {
 const { x = 0, y = 0, name } = objData;
  switch (name) {
    case "coin": {
      const moneda = this.monedas.create(x, y, "monedas");
      moneda.body.allowGravity = false; 
      moneda.anims.play("coinsAnim",true)
      break;
    }
  }
});
//fisicas del juego
this.physics.add.collider(this.jugador, paredLayer);
this.physics.add.collider(this.jugador, techoLayer);
this.physics.add.collider(this.monedas, paredLayer);
this.physics.add.collider(this.monedas, techoLayer);
this.physics.add.collider(
  this.jugador, 
  this.monedas,
  this.recolectarMoneda,
  null,
  this);
 
this.puntajeText=this.add.text(
    300,
    15,
    "SCORE: " + this.puntaje,
    { fontSize: "30px",
    fill: "#703F03", 
    fontFamily:"Lucida Console",
    fontWeight:"bold",}
 );
    }
  
    update() {
    // movimientos jugador
     if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-200);
      this.jugador.setVelocityY(0);
      this.jugador.flipX=false;
      this.jugador.anims.play("left", true);
    }
    //move right
    else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(200);
      this.jugador.setVelocityY(0);
      this.jugador.flipX=true;
      this.jugador.anims.play("left", true);
    
    } 
    else if (this.cursors.up.isDown ) {
      this.jugador.setVelocityY(-200);
      this.jugador.setVelocityX(0);
      this.jugador.anims.play("top", true);
    }
    else if (this.cursors.down.isDown){
      this.jugador.setVelocityY(200);
      this.jugador.setVelocityX(0);
      this.jugador.anims.play("down",true);
    }
    //stop
    else {
      this.jugador.setVelocityX(0);
      this.jugador.setVelocityY(0)
      this.jugador.anims.play("front",true);
     
    }
    
  
  }
  recolectarMoneda(jugador, moneda){
    moneda.disableBody(true, true)
    this.puntaje+=753;
    console.log(this.puntaje)
    this.puntajeText.setText(
      'SCORE: '+ this.puntaje
    )

  }
}