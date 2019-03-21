(function(d, w) {
  let canvas = d.querySelector('canvas');
  canvas.style.width = '300px';
  canvas.style.height = '300px';
  canvas.style.border = '1px solid #000';
  canvas.width = 300;
  canvas.height = 300;

  let ctx = canvas.getContext('2d');
  drawHexagonCoord(ctx, +0, +0, +0);
  drawHexagonCoord(ctx, -1, +1, +0);
  drawHexagonCoord(ctx, +1, +1, +0);
  drawHexagonCoord(ctx, +0, -1, +1);

  function drawHexagon(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (let side = 1.5; side <= 7.5; side++) {
      let px = x + size * Math.cos(side * 2 * Math.PI / 6);
      let py = y + size * Math.sin(side * 2 * Math.PI / 6);
      ctx.lineTo(px, py);
    }

    ctx.fillStyle = randomColor();
    ctx.fill();
  }

  function drawHexagonCoord(ctx, x, y, z) {
    let size = 50;
    let width = 300;
    let height = 300;
    let center = { x: (width/2), y: (height/2) };

    let xPos = center.x + (size * x * 1.75 + (size * x * ((y+1) % 2)));
    let yPos = center.y + (size * z * -1.25);

    drawHexagon(ctx, xPos, yPos, size);
  }

  function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
})(document, window);
