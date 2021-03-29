import Game from './src/Gamejs';

//  put those into Game.js
import Car from './src/Car.js';
import Position from './src/Position.js';
import Map from './src/Map.js';

var canvas = document.getElementById('canvas');
var cellSize = 30; // pixels
var widthInCells = 10;
var heightInCells = 10;
canvas.width = cellSize * widthInCells;
canvas.height = cellSize * heightInCells;
canvas.style.border = '1px black solid';

var ctx = canvas.getContext('2d');

console.log(ctx);

// to put into Game.js
var map = new Map(10, 10);
map.draw(ctx, cellSize);

// var game = new Game(ctx);
// game.start();
