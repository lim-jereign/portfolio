

(function () {
  const wrapper = document.createElement('div');
  wrapper.id = 'pageContent';
  while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
  }
  document.body.appendChild(wrapper);

  const canvas = document.createElement('canvas');
  canvas.id = 'bgCanvas';
  const tint = document.createElement('div');
  tint.id = 'bgTint';
  document.body.appendChild(canvas);
  document.body.appendChild(tint);
  const ctx = canvas.getContext('2d');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  let w, h, dpr;
  let nodes = [];
  let mouse = { x: null, y: null, active: false };

  const NODE_COUNT_DENSITY = 9000; // px^2 per node -- tune for density
  const LINK_DIST = 160;
  const MOUSE_LINK_DIST = 200;
  const SPEED = 0.2;

  function colors() {
    const cs = getComputedStyle(document.body);
    return {
      pink: cs.getPropertyValue('--pink-deep').trim() || '#c85e80',
      sage: cs.getPropertyValue('--sage-deep').trim() || '#4f7548',
      line: cs.getPropertyValue('--ink-faint').trim() || '#94909a'
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(24, Math.min(90, Math.floor((w * h) / NODE_COUNT_DENSITY)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 2.2 + 2,
      tone: Math.random() < 0.55 ? 'pink' : 'sage'
    }));
  }

  function step() {
    const c = colors();
    ctx.clearRect(0, 0, w, h);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
      if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.45;
          ctx.strokeStyle = hexToRgba(c.line, alpha);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const dx = nodes[i].x - mouse.x, dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_LINK_DIST) {
          const alpha = (1 - dist / MOUSE_LINK_DIST) * 0.6;
          ctx.strokeStyle = hexToRgba(c.pink, alpha);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.fillStyle = n.tone === 'pink' ? hexToRgba(c.pink, 0.85) : hexToRgba(c.sage, 0.8);
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (mouse.active) {
      ctx.beginPath();
      ctx.fillStyle = hexToRgba(c.pink, 0.65);
      ctx.arc(mouse.x, mouse.y, 2.6, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(ch => ch + ch).join('');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener('mouseleave', () => { mouse.active = false; });

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(step);
})();