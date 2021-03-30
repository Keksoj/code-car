import Game from './src/Game.js';

var canvas = document.getElementById('canvas');
var cellSize = 30; // pixels

canvas.width = 300;
canvas.height = 300;
canvas.style.border = '1px black solid';
var game = new Game(canvas);

// var ctx = canvas.getContext('2d');
game.helloWorld();
game.start();

console.log();

// to put into Game.js
// var map = new Map(10, 10);
// map.draw(ctx, cellSize);

//
