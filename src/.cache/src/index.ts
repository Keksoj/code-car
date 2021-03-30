import Scene from './PussyEngine/Core/Scene';

const canvas: HTMLCanvasElement = document.querySelector("#canvas");

const scene = new Scene(canvas);
scene.loop();