(function(d, w) {
  let canvas = d.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  canvas.style.border = '1px solid #000';

  let rings = 3;
  let size = 40;
  for (let x = -rings; x <= rings; x++) {
    for (let y = -rings; y <= rings; y++) {
      if (Math.abs(y + x) <= rings) {
        drawHexagonCoord(ctx, x, y);
      }
    }
  }

  function drawHexagonCoord(ctx, q, r) {
    let width = canvas.width;
    let height = canvas.height;
    let center = { x: (width/2), y: (height/2) };

    let xPos = center.x + (size * q * 1.75) + (size * r * 0.87);
    let yPos = center.y + (size * r * 1.5);

    drawHexagon(ctx, xPos, yPos, size-2);

    let fontS = 0.4;
    ctx.font = (size*fontS) + 'px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(q, xPos-(size*fontS), yPos);
    ctx.fillText(r, xPos+(size*fontS), yPos);
  }

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

  function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
})(document, window);
