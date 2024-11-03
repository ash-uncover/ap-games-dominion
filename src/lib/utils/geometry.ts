interface Point {
  x: number,
  y: number
}

export function tile2point(tile: Point): Point {
  if ((tile.y % 2) === 1) {
    return {
      x: tile.x + 0.5,
      y: tile.y,
    }
  }
  return {
    x: tile.x,
    y: tile.y,
  }
}

export function distance(p1: Point, p2: Point): number {
  const powX = Math.pow(p2.x - p1.x, 2)
  const powY = Math.pow(p2.y - p1.y, 2)
  return Math.sqrt(powX + powY)
}

export function angle(p1: Point, p2: Point): number {
  const x = p2.x - p1.x
  const y = p2.y - p1.y
  return Math.atan2(y, x) * 180 / Math.PI
}