import './src/Car.js';
import './src/Position.js';

import './src/Map.js';

var canvas = document.getElementById('canvas');
var cellSize = 30; // pixels
var widthInCells = 10;
var heightInCells = 10;
canvas.style.width = cellSize * widthInCells;
canvas.style.height = cellSize * heightInCells;
canvas.style.border = '1px black solid';

var ctx = canvas.getContext('2d');

console.log(ctx);
// var game = new Game(ctx);
var map = new Map(ctx, 10, 10);
map.draw(cellSize);

// game.start();
