// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Scene1 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("scene2");
  }

  init(data) {
    this.puntaje=data.puntaje||0;
    this.lives=data.lives||4 ;
    this.isWinner=false;
    this.isGameOver=false;
  this.timer=30;
  this.tesoroRecolectado=data.tesoroRecolectado;

   
  }

  create() {
    // todo / para hacer: texto de puntaje
    const map = this.make.tilemap({ key: "map" });

  //cargar imagenes y sonidos
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
   const objectosLayer = map.getObjectLayer("objetos");
    
    paredLayer.setCollisionByProperty({ colision: true });
    techoLayer.setCollisionByProperty({ colision: true });
this.doorSound=this.sound.add('openDoor')
 //  Jugador y sus configuraciones
    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    console.log(spawnPoint);
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "fer").setInteractive(this.input.makePixelPerfect());
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(true);
    console.log(this.jugador)
    this.jugador.body.allowGravity = false;

    
    // Enemigo y sus configuraciones
    let enemyPoint = map.findObject("objetos", (obj) => obj.name === "enemigo");
    console.log(enemyPoint);
    let enemyX = enemyPoint.x;
    let enemyY = enemyPoint.y;
     // ataque del enemigo
    const circle = new Phaser.Geom.Circle(enemyX, enemyY, 200);
    const randomBalls = Phaser.Math.RND.between(8, 10);
    
    this.balls = this.physics.add.group({ key: 'bible', frameQuantity: randomBalls, });
    this.balls.children.iterate((disparo) => {
      disparo.body.allowGravity = false;
      disparo.body.enableBody=true;
      disparo.setScale(0.8)
    });

    Phaser.Actions.PlaceOnCircle(this.balls.getChildren(), circle);
    this.tween = this.tweens.addCounter({
        from: 0,
        to: 500,
        duration: 4000,
        delay: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: false,
    });
 
    this.enemigo = this.physics.add.sprite(enemyPoint.x, enemyPoint.y, "fantasma2");
    this.enemigo.setCollideWorldBounds(true);
    this.enemigo.anims.play('downEnemy2', true)
    const randomDuration = Phaser.Math.RND.between(1500, 2000);
    const duration = randomDuration;
    const startY = 600;
    this.tweens.add ({
      targets: this.enemigo,
      x: 600,
      y: 150,
      duration:duration,
      repeat: -1,
      yoyo: true,
    });
    
    
    


//objetos
this.antorchas = this.add.group();
objectosLayer.objects.forEach((objData) => {
 const { x = 0, y = 0, name } = objData;
  switch (name) {
    case "antorcha": {
      const antorcha = this.antorchas.create(x, y, "torch");
   
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

let tesoro = map.findObject("objetos", (obj) => obj.name === "tesoro");
this.treasure = this.physics.add.sprite(tesoro.x, tesoro.y, "tesoro")
.setScale(2)
.setVisible(false)
this.treasure.body.allowGravity=false;
this.treasure.body.enableBody=false;
this.treasure.anims.play('treasureLoop', true);

//  Input Events
this.cursors = this.input.keyboard.createCursorKeys();
    
  
//Físicas del juego
   this.physics.add.collider(this.jugador, paredLayer);
   this.physics.add.collider(this.jugador, techoLayer);
   this.physics.add.collider(this.enemigo, paredLayer);
   this.physics.add.collider(this.enemigo, techoLayer);
   this.physics.add.collider(this.balls, paredLayer);
   this.physics.add.collider(
    this.jugador, 
    this.enemigo,
    this.recibirAtaque,
    null,
    this);
    this.physics.add.collider(
      this.jugador,
      this.balls,
      this.disparos,
      null, 
      this
    );
    this.physics.add.overlap(
      this.jugador,
      this.salida2,
      this.nextLevel,
      null, 
      this
    );
    this.physics.add.collider(
      this.jugador,
      this.treasure,
      this.abrirSalida,
      null,
      this
    );
    /// Textos en pantalla
    this.livesText = this.add.text(
      30,
      15,
      "LIVES:" + this.lives,
      { fontSize: "30px",
       fill: "#703F03", 
       fontFamily:"Lucida Console",
       fontWeight:"bold",}
    );

    this.score = this.add.text(
      500,
      15,
      'SCORE:' + this.puntaje,
      { fontSize: "30px",
       fill: "#703F03", 
       fontFamily:"Lucida Console",
       fontWeight:"bold",}
    );
  
  this.timerText=this.add.text(
    300, 
    15,"TIME: " + this.timer,
  { fontSize: "30px",
       fill: "#FFFFFF", 
       fontFamily:"Lucida Console",
       fontWeight:"bold",});

//evento de vida
    this.time.addEvent({
      delay:1000,
      callback: this.updateLives,
      callbackScope:this,
      loop: true,
    });
//Evento de contador
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
//update de los disparos del enemigo
    Phaser.Actions.RotateAroundDistance(this.balls.getChildren(), { x: 600, y: 300}, 0.02, this.tween.getValue());
}


 recibirAtaque(jugador, enemigo) {
    jugador.disableBody(true, true);
    setTimeout(() => {
      jugador.enableBody(true, jugador.x, jugador.y, true, true);
    }, 200);
    this.lives = this.lives - 1;
    this.livesText.setText(
      "LIVES " + this.lives,
    );
  }
  disparos(jugador, balls) {
    jugador.disableBody(true, true);
    setTimeout(() => {
      jugador.enableBody(true, jugador.x, jugador.y, true, true);
    }, 200);
    this.lives = this.lives - 1;
    this.livesText.setText(
      "LIVES " + this.lives,
    );
  }
  updateLives(){
    if (this.lives<=0){
      this.isGameOver=true;
    }
    if (this.isGameOver){
      this.scene.start("end",{lives:this.lives, puntaje:this.puntaje, tesoroRecolectado:this.tesoroRecolectado,
      }); 
    } 
  };
  updateTimer(){
    if (this.timer>0){
    this.timer--
    this.puntaje+=30;
    this.score.setText(
      'SCORE:'+ this.puntaje
    )
    if (this.timer==0){
      if(!this.enemyPlay){
        this.balls.getChildren().forEach((disparo) => {
          disparo.disableBody(true, true);
        });

    this.enemigo.play('deathEnemy2', true)
    this.enemyPlay=true;
    } 
    if(this.enemyPlay){
      setTimeout(()=>{
      this.enemigo.disableBody(true,true)
      this.treasure.setVisible(true)
      this.treasure.body.enableBody=true;

    }, 1000);
  }}
  
}
this.timerText.setText(
  "TIME: " + this.timer + " "
)
}
abrirSalida(jugador, trasure){
  this.treasure.disableBody(true,true)
  this.doorSound.play()
  this.salida.disableBody(true,true)
  this.tesoroRecolectado++;
}
nextLevel(jugador, salida2){
  this.isWinner=true;
 
  if (this.isWinner){
    this.scene.start("maze2", {lives:this.lives, puntaje:this.puntaje, tesoro:this.tesoroRecolectado})
  }
}

}