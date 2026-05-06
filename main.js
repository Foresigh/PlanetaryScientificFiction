/* ============================================================
   Planetary Science Fiction — Shared JS
   ============================================================ */

/* ── Starfield Canvas ─────────────────────────────────────── */
(function() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, stars = [], nebulae = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    const count = Math.floor((W * H) / 3500);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2
      });
    }
    nebulae = [
      { x: W * 0.15, y: H * 0.3,  rx: 260, ry: 160, color: 'rgba(74,158,255,0.04)'  },
      { x: W * 0.8,  y: H * 0.7,  rx: 320, ry: 200, color: 'rgba(240,200,67,0.03)'  },
      { x: W * 0.5,  y: H * 0.55, rx: 400, ry: 250, color: 'rgba(0,229,255,0.025)'  },
    ];
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // nebula glows
    nebulae.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(n.rx, n.ry));
      g.addColorStop(0, n.color);
      g.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.ellipse(n.x, n.y, n.rx, n.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    // stars
    stars.forEach(s => {
      const twinkle = s.alpha * (0.7 + 0.3 * Math.sin(t * s.speed * 60 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,230,255,${twinkle})`;
      ctx.fill();
    });

    t += 0.016;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  draw();
})();

/* ── Mobile Nav Toggle ────────────────────────────────────── */
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav')) links.classList.remove('open');
  });
})();

/* ── Active nav link ──────────────────────────────────────── */
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
