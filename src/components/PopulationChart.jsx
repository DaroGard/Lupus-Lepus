//TODO
import React, { useRef, useEffect } from 'react';

export default function PopulationChart({ history }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = (canvas.width = canvas.clientWidth);
    const h = (canvas.height = canvas.clientHeight);

    ctx.clearRect(0, 0, w, h);

    const safe = {
      rabbits: Array.isArray(history?.rabbits) ? history.rabbits : [],
      wolves: Array.isArray(history?.wolves) ? history.wolves : [],
      carrots: Array.isArray(history?.carrots) ? history.carrots : [],
    };

    const rabbits = safe.rabbits;
    const wolves = safe.wolves;
    const carrots = safe.carrots;

    const maxLen = Math.max(
      rabbits.length,
      wolves.length,
      carrots.length,
      1
    );

    const maxVal = Math.max(
      ...(rabbits.length ? rabbits : [0]),
      ...(wolves.length ? wolves : [0]),
      ...(carrots.length ? carrots : [0]),
      10
    );

    const pad = 40;
    const plotW = w - pad * 2;
    const plotH = h - pad * 2;

    // Ejes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    // Función para dibujar cada línea
    function drawLine(series, color) {
      if (!series.length) return;

      ctx.beginPath();
      for (let i = 0; i < series.length; i++) {
        const vx = pad + (i / Math.max(1, maxLen - 1)) * plotW;
        const vy = pad + plotH - (series[i] / (maxVal || 1)) * plotH;
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    drawLine(rabbits, '#2563eb');
    drawLine(wolves, '#ef4444');
    drawLine(carrots, '#16a34a');

    ctx.font = '12px sans-serif';

    ctx.fillStyle = '#111827';
    ctx.fillText('conejos', pad + 8, h - pad + 18);
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(pad + 60, h - pad + 6, 18, 6);

    ctx.fillStyle = '#111827';
    ctx.fillText('lobos', pad + 110, h - pad + 18);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(pad + 150, h - pad + 6, 18, 6);

    ctx.fillStyle = '#111827';
    ctx.fillText('zanahorias', pad + 200, h - pad + 18);
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(pad + 270, h - pad + 6, 18, 6);

    ctx.fillStyle = '#111827';
    ctx.font = '16px sans-serif';
    ctx.fillText('poblaciones', w / 2 - 40, 18);
  }, [history]);

  return <canvas ref={ref} className="w-full h-64" />;
}
