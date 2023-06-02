import { InputManager } from "../app";

export default class Main {
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

  start() {}

  update(dt) {}

  fixedUpdate() {}

  resize(w, h) {
    this.width = w;
    this.height = h;
  }
}
