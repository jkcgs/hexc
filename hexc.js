(function(d, w) {
  let canvas = d.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  canvas.style.border = '1px solid #000';

  const center = { x: (canvas.width/2), y: (canvas.height/2) };

  let size = 40;
  let selectedHex = {q: 2, r: 0};
  let mousePosition = {x: 0, y: 0};
  loop();

  function drawHexagonCoord(ctx, q, r) {
    let width = canvas.width;
    let height = canvas.height;
    let center = { x: (width/2), y: (height/2) };

    let xPos = center.x + size * (0.88*r + 1.75*q);
    let yPos = center.y + ((size*1.5) * r);

    let selected = q === selectedHex.q && r === selectedHex.r;
    let color = selected ? '#eca' : '#a97';
    drawHexagon(ctx, xPos, yPos, size, color);

    let fontS = 0.4;
    ctx.font = (size*fontS) + 'px sans-serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(q, xPos-(size*fontS), yPos);
    ctx.fillText(r, xPos+(size*fontS), yPos);
  }

  function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let rings = 3;

    for (let b = -rings, count = 0; b <= rings; b++) {
      for (let a = -rings; a <= rings; a++) {
        if (Math.abs(a + b) <= rings) {
          drawHexagonCoord(ctx, a, b);
        }
      }
    }

    setTimeout(loop, 100/6);
  }

  // https://stackoverflow.com/a/17130415
  function updateMousePosition(evt) {
    let rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    mousePosition = {
      x: Math.floor((evt.clientX - rect.left) * scaleX),   // scale mouse coordinates after they have
      y: Math.floor((evt.clientY - rect.top) * scaleY)     // been adjusted to be relative to element
    }
  }

  // https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
  function updateSelectedHex(evt) {
    let mx = mousePosition.x - center.x;
    let my = mousePosition.y - center.y;

    let hex = {
      q: (Math.sqrt(3)/3 * mx - 1/3 * my) / size,
      r: (2/3 * my) / size
    };

    selectedHex = cubeToAxial(cubeRound(axialToCube(hex)));
  }

  canvas.addEventListener('mousemove', function(evt) {
    updateMousePosition(evt);
    updateSelectedHex(evt);

    d.querySelectorAll('pre')[0].textContent = `Mouse: ${mousePosition.x}, ${mousePosition.y}\n`;
    d.querySelectorAll('pre')[0].textContent += `Hex: ${selectedHex.q}, ${selectedHex.r}`;
  });
})(document, window);
