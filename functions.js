'use strict';

function drawHexagon(ctx, x, y, size, color) {
  ctx.beginPath();

  for (let side = 1.5; side < 8; side++) {
    let px = x + size * Math.cos(side * 2 * Math.PI / 6);
    let py = y + size * Math.sin(side * 2 * Math.PI / 6);
    ctx.lineTo(px, py);
  }

  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

// https://www.redblobgames.com/grids/hexagons/#conversions-axial
function axialToCube(hex) {
  return {
    x: hex.q,
    y: -hex.q - hex.r,
    z: hex.r
  }
}

function cubeToAxial(cube) {
  return  {
    q: cube.x,
    r: cube.z
  }
}

// https://www.redblobgames.com/grids/hexagons/#rounding
function cubeRound(cube) {
  let rx = Math.round(cube.x);
  let ry = Math.round(cube.y);
  let rz = Math.round(cube.z);

  let x_diff = Math.abs(rx - cube.x);
  let y_diff = Math.abs(ry - cube.y);
  let z_diff = Math.abs(rz - cube.z);

  if (x_diff > y_diff && x_diff > z_diff){
    rx = -ry-rz;
  } else if (y_diff > z_diff) {
    ry = -rx-rz;
  } else {
    rz = -rx-ry;
  }

  return {x: rx, y: ry, z: rz};
}

// https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
function pixelToHex(size, mx, my) {
  let hex = {
    q: (Math.sqrt(3)/3 * mx - 1/3 * my) / size,
    r: (2/3 * my) / size
  };

  return cubeToAxial(cubeRound(axialToCube(hex)));
}
