(function(d, w) {
  let config = {
    hexSize: 40,
    hexRings: 3,
    width: 500,
    height: 500
  };
  let selectedHex = {q: 0, r: 0};
  let mouse = {x: 0, y: 0};

  ///////////////////////////////////////////

  const canvas = d.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const center = { x: (config.width/2), y: (config.height/2) };

  canvas.width = config.width;
  canvas.height = config.height;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  canvas.style.border = '1px solid #666';

  loop();

  ///////////////////////////////////////////

  function drawHexagonCoord(ctx, q, r) {
    let size = config.hexSize;
    let xPos = center.x + size * (0.88*r + 1.75*q);
    let yPos = center.y + ((size*1.5) * r);

    let selected = q === selectedHex.q && r === selectedHex.r;
    let color = selected ? '#eca' : '#a97';
    drawHexagon(ctx, xPos, yPos, size, color);

    // draw axial coordinates inside hexagon
    let fontS = 0.4;
    ctx.font = (size*fontS) + 'px sans-serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(q, xPos-(size*fontS), yPos);
    ctx.fillText(r, xPos+(size*fontS), yPos);
  }

  function loop() {
    let init = (new Date()).getTime();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let rings = config.hexRings;

    for (let b = -rings; b <= rings; b++) {
      for (let a = -rings; a <= rings; a++) {
        if (Math.abs(a + b) <= rings) {
          drawHexagonCoord(ctx, a, b);
        }
      }
    }

    let delta = (new Date()).getTime() - init;
    setTimeout(loop, (100/6) - delta);
  }

  // https://stackoverflow.com/a/17130415
  function updateMousePosition(evt) {
    let rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    mouse.x = Math.floor((evt.clientX - rect.left) * scaleX);   // scale mouse coordinates after they have
    mouse.y = Math.floor((evt.clientY - rect.top) * scaleY);    // been adjusted to be relative to element
  }
  
  function updateSelectedHex(evt) {
    let mx = mouse.x - center.x;
    let my = mouse.y - center.y;

    selectedHex = pixelToHex(config.hexSize, mx, my);
  }

  canvas.addEventListener('mousemove', function(evt) {
    updateMousePosition(evt);
    updateSelectedHex(evt);

    d.querySelector('pre').textContent = `Mouse: ${mouse.x}, ${mouse.y}\n`;
    d.querySelector('pre').textContent += `Hex: ${selectedHex.q}, ${selectedHex.r}`;
  });
})(document, window);
