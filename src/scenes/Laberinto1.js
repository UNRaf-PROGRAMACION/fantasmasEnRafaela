export default class Maze1 extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("maze1");
    }
  
    init(data) {
     this.puntaje=data.puntaje|| 0; 
     this.lives=data.lives || 3;  
     this.timer=15;
     this.isWinner=false;
     this.tesoroRecolectado=data.tesoroRecolectado
    }
  
    create() {
      this.coinSound=this.sound.add('coinS')
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
let salida2 = map.findObject("objetos", (obj) => obj.name === "salida");
this.salida2 = this.physics.add
      .sprite(salida2.x, salida2.y, "puerta2")
      this.salida2.body.allowGravity = false;

let salida = map.findObject("objetos", (obj) => obj.name === "salida");
this.salida = this.physics.add
      .sprite(salida.x, salida.y, "puerta1")
this.salida.body.allowGravity = false;
let entrada= map.findObject("objetos", (obj) => obj.name === "entrada");
this.entrada=this.physics.add.sprite(entrada.x,entrada.y, "puerta1");
this.entrada.body.allowGravity=false
this.entrada.flipX=true
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
  this.physics.add.overlap(
    this.jugador,
    this.salida2,
    this.nextLevel,
    null, 
    this
  );
 //textos
  this.livesText = this.add.text(
    15,
    15,
    "LIVES:" + this.lives,
    { fontSize: "30px",
     fill: "#703F03", 
     fontFamily:"Lucida Console",
     fontWeight:"bold",}
  );

  this.score = this.add.text(
    300,
    15,
    'SCORE:' + this.puntaje,
    { fontSize: "30px",
     fill: "#703F03", 
     fontFamily:"Lucida Console",
     fontWeight:"bold",}
  );

this.timerText=this.add.text(
  500, 
  15,"TIME: " + this.timer,
{ fontSize: "30px",
     fill: "#703F03", 
     fontFamily:"Lucida Console",
     fontWeight:"bold",});
//evento del contador
     this.time.addEvent({
      delay:1000,
      callback: this.updateTimer,
      callbackScope:this,
      loop: true,
    });
    }
  
    update() {
     
      //movimientos jugador
      if (this.cursors.left.isDown && this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
        this.jugador.setVelocityY(0);
        this.jugador.setVelocityX(-300);
        this.jugador.anims.play("left", true);
      }
      else if (this.cursors.left.isDown) {
        this.jugador.setVelocityX(-200);
        this.jugador.setVelocityY(0);
        this.jugador.anims.play("left", true);
      }
      //move right
      else if (this.cursors.right.isDown && this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
        this.jugador.setVelocityY(0);
        this.jugador.setVelocityX(300);
        this.jugador.anims.play("right", true);
      }
      else if (this.cursors.right.isDown) {
        this.jugador.setVelocityX(200);
        this.jugador.setVelocityY(0);
        this.jugador.anims.play("right", true);
      
      } 
      else if (this.cursors.up.isDown && this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
        this.jugador.setVelocityY(-300);
        this.jugador.setVelocityX(0);
        this.jugador.anims.play("top", true);
      }
      else if (this.cursors.up.isDown ) {
        this.jugador.setVelocityY(-200);
        this.jugador.setVelocityX(0);
        this.jugador.anims.play("top", true);
      }
      else if (this.cursors.down.isDown && this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
        this.jugador.setVelocityY(300);
        this.jugador.setVelocityX(0);
        this.jugador.anims.play("down", true);
      }
      else if (this.cursors.down.isDown) {
        this.jugador.setVelocityY(100);
        this.jugador.setVelocityX(0);
        this.jugador.anims.play("down", true);
      }
      //stop
      else {
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0)
        this.jugador.anims.play("front",true);
       
      }
    
  
  }
  recolectarMoneda(jugador, moneda){
    this.coinSound.play()
    moneda.disableBody(true, true)
    this.puntaje+=753;
    console.log(this.puntaje)
    this.score.setText(
      'SCORE:'+ this.puntaje
    )
  }
  updateTimer() {
    if (this.timer > 0) {
      this.timer--;
      if (this.timer === 0) {
        this.salida.disableBody(true, true);
        this.monedas.getChildren().forEach((moneda) => {
          moneda.disableBody(true, true);
        });
      }
      this.timerText.setText("Timer: " + this.timer + " ");
    }
  }
  nextLevel(jugador, salida2){
    this.isWinner=true;
    if (this.isWinner){
      this.scene.start("nivelcompleto", {lives:this.lives, puntaje:this.puntaje, tesoroRecolectado:this.tesoroRecolectado})
    }
  }
}
 
