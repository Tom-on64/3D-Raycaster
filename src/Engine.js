import { ctx, height, input, width } from "../app.js";
import Level from "./Level.js";
import Player from "./Player.js";
import { mapValue } from "./utils.js";

export default class Engine {
    constructor(level) {
        this.player = new Player(0, 0);
        this.loadLevel(level);
        this.drawMap = false;
    }

    update(dt) {
        this.player.update(dt);
        this.renderScene(this.player.cast(this.level.walls));
        if (this.drawMap) {
            const w = this.level.width * 2;
            const h = this.level.height * 2;
            this.level.drawMini((width - w) / 2, (height - h) / 2, w, h, this.player);
        }

        if (input["w"]) this.player.move(this.player.speed * dt, this.level);
        if (input["s"]) this.player.move(-this.player.speed * dt, this.level);
        if (input["a"]) this.player.rotate(-this.player.lookSpeed * dt);
        if (input["d"]) this.player.rotate(this.player.lookSpeed * dt);

        if (input[" "] && !input[" _"]) { this.drawMap = !this.drawMap; input[" _"] = true; }
        if (!input[" "] && input[" _"]) input[" _"] = false;
    }

    loadLevel(levelData) {
        this.level = new Level(levelData);
        this.player.x = this.level.spawn[0];
        this.player.y = this.level.spawn[1];
    }

    renderScene(distanceData) {
        ctx.fillStyle = "#222";
        ctx.fillRect(0, height / 2, width, height / 2);

        // Modified code from https://github.com/michaelkemp/p5-raycast/
        const rayW = width / this.player.rays.length;
        distanceData.forEach((dist, i) => {
            const len = 10 * height / dist;
            const top = (height - len) / 2;
            ctx.fillStyle = `hsl(0, 0%, ${mapValue(len, 0, height * 2, 0, 100)}%, 1)`;
            ctx.fillRect(rayW * i, top, rayW + 1, len);
        })
    }
}