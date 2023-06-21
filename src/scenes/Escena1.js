// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Scene1 extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("scene1");
    }
  
    init() {
      let score=0;
  
     
    }
  
    create() {
      // todo / para hacer: texto de puntaje
      const map = this.make.tilemap({ key: "map" });
  
      // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
      // Phaser's cache (i.e. the name you used in preload)
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

   //  Jugador y sus configuraciones
      let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
      console.log(spawnPoint);
      this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "fer");
      this.jugador.setBounce(0.1);
      this.jugador.setCollideWorldBounds(true);
      console.log(this.jugador)
      this.jugador.body.allowGravity = false;
      
      // Enemigo y sus configuraciones
      let enemyPoint = map.findObject("objetos", (obj) => obj.name === "enemigo");
      console.log(enemyPoint);
      this.enemigo = this.physics.add.sprite(enemyPoint.x, enemyPoint.y, "fantasma");
      this.enemigo.setCollideWorldBounds(true);
      let end=map.findObject("objetos", (obj) => obj.name==="inicio");
      let endY=map.findObject("objetos", (obj) => obj.name==="fin");
      this.tweens.add ({
        targets: this.enemigo,
        x: 600,
        y: 200,
        duration:2000,
        repeat: -1,
        yoyo: true,

      })

//objetos
      this.puerta=this.add.group()
      objectosLayer.objects.forEach((objData) => {
        const { x = 0, y = 0, name } = objData;
        switch (name) {
          case "puerta": {
            const puerta = this.puerta.create(x, y, "puerta");
            break;
          }
        }
      });
      
  
      //  Input Events
      this.cursors = this.input.keyboard.createCursorKeys();
  
    
    
  //Físicas del juego
     this.physics.add.collider(this.jugador, paredLayer);
     this.physics.add.collider(this.jugador, techoLayer);
     this.physics.add.collider(this.enemigo, paredLayer);
     this.physics.add.collider(this.enemigo, techoLayer);
     this.physics.add.collider(this.jugador, this.enemigo);
     /* this.physics.add.collider(this.estrellas, plataformaLayer);
      this.physics.add.collider(
        this.jugador,
        this.estrellas,
        this.recolectarEstrella,
        null,
        this
      );
      this.physics.add.collider(this.salida, plataformaLayer);
      this.physics.add.overlap(
        this.jugador,
        this.salida,
        this.esVencedor,
        () => this.cantidadEstrellas >= 5, // condicion de ejecucion
        this
      );
  
      /// mostrar cantidadEstrella en pantalla
      this.cantidadEstrellasTexto = this.add.text(
        15,
        15,
        "Estrellas recolectadas: 0",
        { fontSize: "15px", fill: "#FFFFFF" }
      );
      */  }
  
    update() {
     
      if (this.cursors.left.isDown) {
        this.jugador.setVelocityX(-160);
        this.jugador.setVelocityY(0);
        this.jugador.flipX=false;
        this.jugador.anims.play("left", true);
      }
      //move right
      else if (this.cursors.right.isDown) {
        this.jugador.setVelocityX(160);
        this.jugador.setVelocityY(0);
        this.jugador.flipX=true;
        this.jugador.anims.play("left", true);
      
      } 
      else if (this.cursors.up.isDown ) {
        this.jugador.setVelocityY(-160);
        this.jugador.setVelocityX(0);
        this.jugador.anims.play("top", true);
      }
      else if (this.cursors.down.isDown){
        this.jugador.setVelocityY(160);
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
  
   /* recolectarEstrella(jugador, estrella) {
      estrella.disableBody(true, true);
  
      // todo / para hacer: sumar puntaje
      //this.cantidadEstrellas = this.cantidadEstrellas + 1;
      this.cantidadEstrellas++;
  
      this.cantidadEstrellasTexto.setText(
        "Estrellas recolectadas: " + this.cantidadEstrellas
      );
    }
  
    esVencedor(jugador, salida) {
      // if (this.cantidadEstrellas >= 5)
      // sacamos la condicion porque esta puesta como 4to parametro en el overlap
  
      console.log("estrellas recolectadas", this.cantidadEstrellas);
  
      this.scene.start("maze1",{cantidadEstrellas: this.cantidadEstrellas});
    }*/
  }
  