import { InputManager } from "../app";

export default class Main {
  #ctx;
  /**
   * Initialize app
   * @param {CanvasRenderingContext2D} ctx 2d canvas context
   * @param {InputManager} inputManager Input manager instance
   * @param {number} frameRate Frame rate
   * @param {bool} [isDebug = false] For debugging
   */
  constructor(ctx, inputManager, frameRate, isDebug = false) {
    this.#ctx = ctx;
    this.input = inputManager;
    this.frameRate = frameRate;
    this.isDebug = isDebug;
  }

  /**
   * Runs once at start
   */
  start() {
    // Write your setup code here and not in the constructor
  }

  /**
   * Gets called every frame
   * @param {number} dt Time since last frame
   */
  update(dt) {
    // Write your logic here
  }

  /**
   * Gets called every frame update (If FPS is 30, than 30x a second)
   */
  fixedUpdate() {
    // Write your rendering code here
  }

  /**
   * Resizes the window
   * @param {number} w Window width
   * @param {number} h Window height
   */
  resize(w, h) {
    this.width = w;
    this.height = h;
  }
}
