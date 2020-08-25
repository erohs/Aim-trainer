export const randomPosition = (area: HTMLDivElement, size: number) => {
    const offset = size;
    const rect = area.getBoundingClientRect();
    const minx = rect.left + offset;
    const maxx = rect.right - offset;
    const miny = rect.top;
    const maxy = rect.bottom - offset
    const x = Math.floor(Math.random() * (maxx - minx)) + minx;
    const y = Math.floor(Math.random() * (maxy - miny)) + miny;
    return [x, y]
}