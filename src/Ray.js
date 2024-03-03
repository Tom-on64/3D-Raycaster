import { distance } from "./utils.js";

export default class Ray {
    constructor(x, y, a) {
        this.x = x;
        this.y = y;
        this.dir = {
            x: Math.cos(a),
            y: Math.sin(a),
        };
    }

    setAngle(a) {
        this.dir.x = Math.cos(a);
        this.dir.y = Math.sin(a);
    }

    cast(wall) {
        // Formulas source
        // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

        const x1 = wall[0][0];
        const y1 = wall[0][1];
        const x2 = wall[1][0];
        const y2 = wall[1][1];

        const x3 = this.x;
        const y3 = this.y;
        const x4 = this.x + this.dir.x;
        const y4 = this.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) return; // Lines are parallel

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {
            const pt = { x: 0, y: 0, dist: Infinity };
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            pt.dist = distance(x3, y3, pt.x, pt.y);
            return pt;
        } else return;
    }

    castLevel(walls) {
        let closest = { dist: Infinity };

        walls.forEach(wall => {
            const pt = this.cast(wall);
            if (!pt) return;

            if (pt.dist < closest.dist) closest = pt;
        });

        return closest;
    }
}