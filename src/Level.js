import { ctx } from "../app.js";

export default class Level {
    constructor(levelData) {
        this.spawn = levelData.spawn;
        this.width = levelData.width;
        this.height = levelData.height;
        this.walls = levelData.walls;
    }

    drawMini(x, y, w, h, player) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, w, h);

        const normX = w / this.width;
        const normY = h / this.height;

        player.drawMini(x, y, normX, normY, ((w + h) / 2) / 30);

        this.walls.forEach(wall => {
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + wall[0][0] * normX, y + wall[0][1] * normY);
            ctx.lineTo(x + wall[1][0] * normX, y + wall[1][1] * normY);
            ctx.stroke();
        });
    }
}