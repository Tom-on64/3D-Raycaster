import Main from "./src/Main.js";
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// A basic input manager class
export class InputManager {
  constructor() {
    this.keys = {};
    this.mouse = {
      x: 0,
      y: 0,
      isPressed: false,
    };
  }
}

let timestamp = 0;
let buffer = 0;
const isDebug = document.URL.includes("?debug");
const input = new InputManager();
const main = new Main(ctx, input, 30, isDebug);

// Runs every time the window gets resized
const resizeWindow = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  main.resize(canvas.width, canvas.height);
};

// Runs every frame
const update = (time) => {
  const dt = time - timestamp;
  timestamp = time;
  requestAnimationFrame(update);

  main.update(dt);

  
  if (buffer >= 1000 / main.frameRate) {
    buffer = 0;
    main.fixedUpdate();
  } else buffer += dt;
};

// Evenet listeners
window.addEventListener("resize", resizeWindow);
document.addEventListener("keydown", (e) => (input.keys[e.key] = true));
document.addEventListener("keyup", (e) => (input.keys[e.key] = false));
document.addEventListener("mousedown", () => (input.mouse.isPressed = true));
document.addEventListener("mouseup", () => (input.mouse.isPressed = false));
document.addEventListener("mousemove", (e) => {
  input.mouse.x = e.clientX;
  input.mouse.y = e.clientY;
});

// Init
resizeWindow();
main.start();
update(0);
