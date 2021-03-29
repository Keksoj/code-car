import './src/Car.js';
import './src/Position.js';

var canvas = document.getElementById('canvas');
canvas.style.width = '70%';
canvas.style.height = '70%';
canvas.style.border = '1px black solid';

var ctx = canvas.getContext('2d');

var game = new Game(ctx);

game.start();
