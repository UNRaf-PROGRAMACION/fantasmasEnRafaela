import HelloWorldScene from "./src/scenes/HelloWorldScene.js";
import Preload from "./src/scenes/preload.js";
import Scene1 from "./src/scenes/Escena1.js";
import Scene2 from "./src/scenes/Escena2.js";
import Maze1 from "./src/scenes/Laberinto1.js";
import Maze2 from "./src/scenes/Laberinto2.js";
import End from "./src/scenes/Fin.js";
// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Preload, Scene1, Scene2,Maze1, Maze2,End],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
