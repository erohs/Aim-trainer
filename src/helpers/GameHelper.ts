export const randomPosition = (area: HTMLDivElement, size: number) => {
    const rect = area.getBoundingClientRect();
    const minx = rect.left;
    const maxx = rect.right - size;
    const miny = rect.top;
    const maxy = rect.bottom - size
    const x = Math.floor(Math.random() * (maxx - minx)) + minx;
    const y = Math.floor(Math.random() * (maxy - miny)) + miny;
    return [x, y]
}

export const gameBounds = (area: HTMLDivElement, size: number) => {
    const rect = area.getBoundingClientRect();
    const top = rect.top;
    const right = rect.right - size;
    const bottom = rect.bottom - size
    const left = rect.left;
    return [top, right, bottom, left]
}

export const getNewPosition = (x: number, y: number, angle: number, speed: number) => {
    const deltaX = Math.cos(angle) * speed;
    const deltaY = Math.sin(angle) * speed;
    const newX = x + deltaX;
    const newY = y + deltaY;
    return [newX, newY]
}

export const calculateAngle = (min: number, max: number) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min) * Math.PI / 180
}

export const checkNewPosition = (position: Array<number>, bounds: Array<number>) => {
    if (position[0] < bounds[3]) {
        if (Math.round(Math.random()) === 1) return calculateAngle(285, 360);
        return calculateAngle(1, 75);
    }
    if (position[0] > bounds[1]) return calculateAngle(105, 255);
    if (position[1] > bounds[2]) return calculateAngle(195, 345);
    if (position[1] < bounds[0]) return calculateAngle(15, 165);
}

export const calculateNewPosition = (x: number, y: number, angle: number, speed: number, area: HTMLDivElement, size: number) => {
    const bounds = gameBounds(area, size);
    const position = getNewPosition(x, y, angle, speed);
    const newAngle = checkNewPosition(position, bounds);
    if (newAngle) return getNewPosition(x, y, newAngle, speed).concat(newAngle);
    return position.concat(angle);
}
