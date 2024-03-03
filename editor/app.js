/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('screen')
const ctx = canvas.getContext('2d')

const lvlName = document.getElementById("lvlName");
const width = document.getElementById("lvlWidth");
const height = document.getElementById("lvlHeight");
const player = [0, 0];
const walls = [];

canvas.width = width.value * 2;
canvas.height = height.value * 2;

const input = {
    keys: {},
    mouse: {
        x: 0,
        y: 0,
        left: false,
        middle: false,
        right: false,
    },
}

let currentWall = [];
let isHolding = false;

const update = () => {
    requestAnimationFrame(update);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width.value * 2, height.value * 2);

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    walls.forEach(w => {
        ctx.moveTo(w[0][0] * 2, w[0][1] * 2);
        ctx.lineTo(w[1][0] * 2, w[1][1] * 2);
    })
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(player[0] * 2, player[1] * 2, 5, 0, Math.PI * 2);
    ctx.fill();

    if (!currentWall[0]) {
        if (input.mouse.left && !isHolding) { currentWall[0] = Math.floor(input.mouse.x / 2); currentWall[1] = Math.floor(input.mouse.y / 2); }
    } else {
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(currentWall[0] * 2, currentWall[1] * 2);
        ctx.lineTo(input.mouse.x, input.mouse.y);
        ctx.stroke();

        if (input.mouse.left && !isHolding) {
            walls.push([currentWall, [Math.floor(input.mouse.x / 2), Math.floor(input.mouse.y / 2)]]);
            currentWall = [];
            console.log(walls);
        }
    }

    if (input.mouse.right) {
        player[0] = Math.floor(input.mouse.x / 2);
        player[1] = Math.floor(input.mouse.y / 2);
    }

    if (input.mouse.left && !isHolding) isHolding = true;
    else if (!input.mouse.left && isHolding) isHolding = false;
}

document.getElementById("exportBtn").onclick = () => {
    const exportData = {
        width: width.value,
        height: height.value,
        name: lvlName.value,
        spawn: player,
        walls,
    }

    const data = document.getElementById("exportData");
    data.value = JSON.stringify(exportData);

    data.select();
    data.setSelectionRange(0, 9999999);

    navigator.clipboard.writeText(data.value);

    alert("Exported To Clipboard!");
}

width.onchange = () => canvas.width = width.value * 2;
height.onchange = () => canvas.height = height.value * 2;
canvas.onkeydown = (e) => input.keys[e.key] = true;
canvas.onkeyup = (e) => input.keys[e.key] = false;
canvas.onmousedown = (e) => {
    e.preventDefault();
    if (e.button == 0) input.mouse.left = true
    else if (e.button == 1) input.mouse.middle = true
    else if (e.button == 2) input.mouse.right = true
}
canvas.onmouseup = (e) => {
    if (e.button == 0) input.mouse.left = false
    else if (e.button == 1) input.mouse.middle = false
    else if (e.button == 2) input.mouse.right = false
}
canvas.onmousemove = (e) => {
    input.mouse.x = e.offsetX;
    input.mouse.y = e.offsetY;
}
canvas.addEventListener("contextmenu", (e) => e.preventDefault());

update();
