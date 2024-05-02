import { ctx } from "../app.js";
import Ray from "./Ray.js";
import { angleToRad, isIntersecting } from "./utils.js";

export default class Player {
    constructor(x, y, fov = 85) {
        this.x = x;
        this.y = y;
        this.a = 0;

        this.speed = 30;
        this.lookSpeed = 3;

        this.fov = fov;
        this.res = 0.1;
        this.rays = [];
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.res)
            this.rays.push(new Ray(this.x, this.y, a * (Math.PI / 180)))
    }

    move(amount, level) {
        const newX = this.x + Math.cos(this.a) * amount;
        const newY = this.y + Math.sin(this.a) * amount;

        for (const wall of level.walls) {
            const [x1, y1] = wall[0];
            const [x2, y2] = wall[1];
            if (isIntersecting(this.x, this.y, newX, newY, x1, y1, x2, y2)) return;
        }

        this.x = newX;
        this.y = newY;
    }

    rotate(amount) {
        this.a = (this.a + amount) % 360;

        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.res) {
            this.rays[index].setAngle(a * (Math.PI / 180) + this.a);
            index++;
        }
    }

    update(dt) {
        this.rays.forEach(r => {
            r.x = this.x;
            r.y = this.y;
        })
    }

    cast(walls) {
        const distanceData = [];

        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.res) {
            const r = this.rays[index];
            index++;

            distanceData.push(r.castLevel(walls).dist * Math.sin(angleToRad(a)));
        }

        return distanceData;
    }

    drawMini(offsetX, offsetY, normX, normY, r) {
        ctx.lineWidth = 2;
        ctx.fillStyle = "red";
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(offsetX + this.x * normX, offsetY + this.y * normY, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(offsetX + this.x * normX, offsetY + this.y * normY);
        ctx.lineTo(offsetX + (this.x + Math.cos(this.a) * r) * normX, offsetY + (this.y + Math.sin(this.a) * r) * normY);
        ctx.stroke();
    }
}
