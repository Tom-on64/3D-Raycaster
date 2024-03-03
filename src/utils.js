export const angleToRad = (angle) => {
    return angle * (Math.PI / 180);
}

export const loadFile = async (file) => {
    const res = await fetch(file);
    const out = await res.text();
    return out;
}

export const distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
}

export const mapValue = (value, fromMin, fromMax, toMin, toMax) => {
    const normalizedValue = (value - fromMin) / (fromMax - fromMin);
    const mappedValue = normalizedValue * (toMax - toMin) + toMin;
    return mappedValue;
}

export const isIntersecting = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    const denominator = ((x2 - x1) * (y4 - y3)) - ((y2 - y1) * (x4 - x3));
    
    // Lines are parralel
    if (denominator === 0) return false;

    const numerator1 = ((y1 - y3) * (x4 - x3)) - ((x1 - x3) * (y4 - y3));
    const numerator2 = ((y1 - y3) * (x2 - x1)) - ((x1 - x3) * (y2 - y1));

    const r = numerator1 / denominator;
    const s = numerator2 / denominator;

    return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
}
