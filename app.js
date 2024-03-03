import { update } from "./src/main.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("screen");
export const ctx = canvas.getContext("2d");

export const input = {};

export const width = 1024;
export const height = 512;
const clearColor = "#000000";

canvas.width = width;
canvas.height = height;

let timestamp = 0;
const render = (time = 0) => {
    const dt = (time - timestamp) / 1000;
    timestamp = time;

    requestAnimationFrame(render);
    ctx.fillStyle = clearColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    update(dt);
}

document.addEventListener("keydown", (e) => input[e.key] = true);
document.addEventListener("keyup", (e) => input[e.key] = false);

render();

;;    ;; ;;;;;;  ;;      ;;        ;;;;
;;    ;; ;;      ;;      ;;      ;;    ;;
;;;;;;;; ;;;;    ;;      ;;      ;;    ;;
;;    ;; ;;      ;;      ;;      ;;    ;;
;;    ;; ;;;;;;  ;;;;;;  ;;;;;;    ;;;;
