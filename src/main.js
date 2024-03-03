import Engine from "./Engine.js";
import { loadFile } from "./utils.js";

const level = JSON.parse(await loadFile("/levels/level.json"));
const engine = new Engine(level);

export const update = (dt) => {
    engine.update(dt);
}
