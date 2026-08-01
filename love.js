   // Classic parametric heart curve
    function heartXY(t, scale) {
      // t in radians
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return { x: x * scale, y: y * scale };
    }

    function addText(x, y, delay) {
      const el = document.createElement('div');
      el.className = 'word';
      el.innerText = 'I love you';
      el.style.left = `calc(50% + ${x}px)`;
      el.style.top  = `calc(50% + ${y}px)`;
      el.style.transform = 'translate(-50%, -50%)';
      document.getElementById('stage').appendChild(el);

      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
    }

    function startHeart() {
      const border = [];
      const fill = [];

      // Border points (outline)
      for (let t = 0; t < Math.PI * 2; t += 0.08) {
        border.push(heartXY(t, 18));
      }

      // Filled points (multiple scales)
      for (let scale = 6; scale <= 17; scale += 1) {
        for (let t = 0; t < Math.PI * 2; t += 0.15) {
          fill.push(heartXY(t, scale));
        }
      }

      // Shuffle fill a bit for organic feel
      for (let i = fill.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fill[i], fill[j]] = [fill[j], fill[i]];
      }

      // Animate border first (quickly)
      border.forEach((p, i) => {
        addText(p.x, p.y, i * 12);
      });

      // Then fill
      const borderTime = border.length * 12;
      fill.forEach((p, i) => {
        addText(p.x, p.y, borderTime + i * 8);
      });

      // Show the big "Love you." text near the end
      const totalTime = borderTime + fill.length * 8;
      setTimeout(() => {
        document.getElementById('loveText').classList.add('show');
      }, totalTime * 0.55);
    }

    // System screen sequence
    window.addEventListener('load', () => {
      const line1 = document.getElementById('line1');
      const line2 = document.getElementById('line2');
      const btn   = document.getElementById('decryptBtn');
      const system = document.getElementById('system');

      setTimeout(() => line1.classList.add('show'), 400);
      setTimeout(() => line2.classList.add('show'), 1400);
      setTimeout(() => btn.classList.add('show'), 2200);

      btn.addEventListener('click', () => {
        system.classList.add('hidden');
        setTimeout(startHeart, 600);
      });
    });