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

  for (let b = -rings, count = 0; b <= rings; b++) {
    for (let a = -rings; a <= rings; a++) {
      if (Math.abs(a + b) <= rings) {
        setTimeout(function() {
          drawHexagonCoord(ctx, a, b);
        }, 50*count++);
      }
    }
  }

  function drawHexagonCoord(ctx, q, r) {
    let width = canvas.width;
    let height = canvas.height;
    let center = { x: (width/2), y: (height/2) };

    let xPos = center.x + size * (0.88*r + 1.75*q);
    let yPos = center.y + ((size*1.5) * r);

    drawHexagon(ctx, xPos, yPos, size);

    let fontS = 0.4;
    ctx.font = (size*fontS) + 'px sans-serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(q, xPos-(size*fontS), yPos);
    ctx.fillText(r, xPos+(size*fontS), yPos);
  }

  function drawHexagon(ctx, x, y, size) {
    ctx.beginPath();

    for (let side = 1.5; side < 8; side++) {
      let px = x + size * Math.cos(side * 2 * Math.PI / 6);
      let py = y + size * Math.sin(side * 2 * Math.PI / 6);
      ctx.lineTo(px, py);
    }

    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.stroke();
  }

  function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
})(document, window);
