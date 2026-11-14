import * as THREE from 'three';

// Cache generated textures in memory so canvas generation runs only once
const textureCache = new Map();

function createProceduralCanvas(width = 512, height = 256, drawFn) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function getPlanetTexture(slug) {
  if (textureCache.has(slug)) {
    return textureCache.get(slug);
  }

  let texture;
  switch (slug) {
    case 'sun':
      texture = createProceduralCanvas(512, 256, (ctx, w, h) => {
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#FFE87C');
        grad.addColorStop(0.3, '#FDB813');
        grad.addColorStop(0.7, '#FF8C00');
        grad.addColorStop(1, '#FF4500');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Solar granulations / solar flare noise
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        for (let i = 0; i < 300; i++) {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const r = Math.random() * 8 + 2;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      break;

    case 'mercury':
      texture = createProceduralCanvas(512, 256, (ctx, w, h) => {
        ctx.fillStyle = '#8E8E93';
        ctx.fillRect(0, 0, w, h);
        // Craters
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const r = Math.random() * 6 + 1;
          ctx.fillStyle = i % 2 === 0 ? '#636366' : '#AEAEB2';
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      break;

    case 'venus':
      texture = createProceduralCanvas(512, 256, (ctx, w, h) => {
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#EAD6B8');
        grad.addColorStop(0.5, '#D4A373');
        grad.addColorStop(1, '#C68B59');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Sulfuric acid cloud streaks
        ctx.fillStyle = 'rgba(255, 230, 180, 0.2)';
        for (let i = 0; i < 20; i++) {
          const y = (h / 20) * i;
          ctx.fillRect(0, y, w, Math.random() * 12 + 4);
        }
      });
      break;

    case 'earth':
      texture = createProceduralCanvas(512, 256, (ctx, w, h) => {
        // Ocean base
        ctx.fillStyle = '#1D4ED8';
        ctx.fillRect(0, 0, w, h);

        // Continents / Green & Brown Landmasses
        ctx.fillStyle = '#15803D';
        // Eurasia/Africa
        ctx.beginPath();
        ctx.ellipse(w * 0.5, h * 0.45, w * 0.18, h * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        // Americas
        ctx.fillStyle = '#166534';
        ctx.beginPath();
        ctx.ellipse(w * 0.22, h * 0.5, w * 0.12, h * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        // White polar ice caps
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h * 0.08);
        ctx.fillRect(0, h * 0.92, w, h * 0.08);

        // Cloud swirls
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let i = 0; i < 15; i++) {
          ctx.beginPath();
          ctx.ellipse(Math.random() * w, Math.random() * h, Math.random() * 40 + 20, Math.random() * 10 + 5, 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      break;

    case 'moon':
      texture = createProceduralCanvas(256, 128, (ctx, w, h) => {
        ctx.fillStyle = '#A1A1AA';
        ctx.fillRect(0, 0, w, h);
        // Lunar Maria (dark basalt plains)
        ctx.fillStyle = '#71717A';
        ctx.beginPath();
        ctx.ellipse(w * 0.35, h * 0.4, w * 0.15, h * 0.2, 0, 0, Math.PI * 2);
        ctx.ellipse(w * 0.6, h * 0.5, w * 0.2, h * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        // White impact craters
        ctx.fillStyle = '#E4E4E7';
        for (let i = 0; i < 100; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 3 + 1, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      break;

    case 'mars':
      texture = createProceduralCanvas(512, 256, (ctx, w, h) => {
        // Red-orange rusty regolith
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#B91C1C');
        grad.addColorStop(0.5, '#C2410C');
        grad.addColorStop(1, '#9A3412');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Dark volcanic basalt patches (Syrtis Major)
        ctx.fillStyle = 'rgba(67, 20, 7, 0.5)';
        ctx.beginPath();
        ctx.ellipse(w * 0.45, h * 0.5, w * 0.15, h * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();

        // White polar ice caps
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h * 0.06);
        ctx.fillRect(0, h * 0.94, w, h * 0.06);
      });
      break;

    case 'jupiter':
      texture = createProceduralCanvas(512, 256, (ctx, w, h) => {
        // Multi-colored gas bands
        const bandColors = [
          '#E2D5C3', '#C7A27C', '#D8B18A', '#A36E48',
          '#E9DEC7', '#B97C52', '#DFD3C3', '#9D6038'
        ];
        const bandHeight = h / bandColors.length;
        bandColors.forEach((color, i) => {
          ctx.fillStyle = color;
          ctx.fillRect(0, i * bandHeight, w, bandHeight + 1);
        });

        // The Great Red Spot
        ctx.fillStyle = '#B91C1C';
        ctx.beginPath();
        ctx.ellipse(w * 0.65, h * 0.65, 24, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        // Inner swirl of Great Red Spot
        ctx.fillStyle = '#EA580C';
        ctx.beginPath();
        ctx.ellipse(w * 0.65, h * 0.65, 14, 8, 0, 0, Math.PI * 2);
        ctx.fill();
      });
      break;

    case 'saturn':
      texture = createProceduralCanvas(512, 256, (ctx, w, h) => {
        const bands = ['#F5E6CA', '#E6D2B5', '#D4BE98', '#EBD8B8', '#D8C2A0', '#F0E0C4'];
        const bh = h / bands.length;
        bands.forEach((b, i) => {
          ctx.fillStyle = b;
          ctx.fillRect(0, i * bh, w, bh + 1);
        });
      });
      break;

    case 'uranus':
      texture = createProceduralCanvas(256, 128, (ctx, w, h) => {
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#A5F3FC');
        grad.addColorStop(0.5, '#67E8F9');
        grad.addColorStop(1, '#06B6D4');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });
      break;

    case 'neptune':
      texture = createProceduralCanvas(256, 128, (ctx, w, h) => {
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#38BDF8');
        grad.addColorStop(0.5, '#2563EB');
        grad.addColorStop(1, '#1D4ED8');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Great Dark Spot
        ctx.fillStyle = '#1E3A8A';
        ctx.beginPath();
        ctx.ellipse(w * 0.4, h * 0.45, 16, 9, 0, 0, Math.PI * 2);
        ctx.fill();
      });
      break;

    case 'kuiper-belt':
    case 'pluto':
      texture = createProceduralCanvas(256, 128, (ctx, w, h) => {
        ctx.fillStyle = '#A8A29E';
        ctx.fillRect(0, 0, w, h);
        // Tombaugh Regio (Heart Glacier)
        ctx.fillStyle = '#FAFAF9';
        ctx.beginPath();
        ctx.arc(w * 0.45, h * 0.5, 18, 0, Math.PI * 2);
        ctx.arc(w * 0.55, h * 0.5, 18, 0, Math.PI * 2);
        ctx.fill();
      });
      break;

    case 'ceres':
    case 'asteroid-belt':
      texture = createProceduralCanvas(512, 256, (ctx, w, h) => {
        // Dark carbonaceous gray base
        ctx.fillStyle = '#4A4B4F';
        ctx.fillRect(0, 0, w, h);
        // Surface craters and tonal variations
        for (let i = 0; i < 240; i++) {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const r = Math.random() * 5 + 1;
          ctx.fillStyle = i % 2 === 0 ? '#38393D' : '#5E6066';
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        // Occator Crater Bright Spots (Cerealia & Vinalia Faculae - sodium carbonate salts)
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(w * 0.48, h * 0.45, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(w * 0.48, h * 0.45, 12, 0, Math.PI * 2);
        ctx.fill();
        for (let j = 0; j < 6; j++) {
          const ox = w * 0.48 + (Math.random() - 0.5) * 16;
          const oy = h * 0.45 + (Math.random() - 0.5) * 16;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(ox, oy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      break;

    default:
      texture = createProceduralCanvas(128, 64, (ctx, w, h) => {
        ctx.fillStyle = '#94A3B8';
        ctx.fillRect(0, 0, w, h);
      });
  }

  textureCache.set(slug, texture);
  return texture;
}

export function createSaturnRingTexture() {
  const cacheKey = 'saturn-rings-texture';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Concentric ring transparency gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.1, 'rgba(212, 175, 120, 0.4)');
  grad.addColorStop(0.3, 'rgba(235, 205, 155, 0.85)');
  grad.addColorStop(0.55, 'rgba(210, 180, 130, 0.9)');
  // Cassini Division gap
  grad.addColorStop(0.65, 'rgba(0, 0, 0, 0.05)');
  grad.addColorStop(0.70, 'rgba(200, 170, 120, 0.7)');
  grad.addColorStop(0.9, 'rgba(180, 150, 110, 0.5)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 64);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}
