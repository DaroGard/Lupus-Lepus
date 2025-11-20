import React, { useRef, useEffect, useState } from "react";

export default function PopulationChart({ history }) {
  const ref = useRef(null);
  const wrapperRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    const clientW = canvas.clientWidth || 400;
    const clientH = canvas.clientHeight || 200;
    canvas.width = Math.round(clientW * dpr);
    canvas.height = Math.round(clientH * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = clientW;
    const h = clientH;

    ctx.clearRect(0, 0, w, h);

    const safe = {
      rabbits: Array.isArray(history?.rabbits) ? history.rabbits : [],
      wolves: Array.isArray(history?.wolves) ? history.wolves : [],
      carrots: Array.isArray(history?.carrots) ? history.carrots : [],
    };

    const rabbits = safe.rabbits;
    const wolves = safe.wolves;
    const carrots = safe.carrots;

    const maxLen = Math.max(rabbits.length, wolves.length, carrots.length, 1);
    const maxVal = Math.max(
      ...(rabbits.length ? rabbits : [0]),
      ...(wolves.length ? wolves : [0]),
      ...(carrots.length ? carrots : [0]),
      10
    );

    const pad = 40;
    const plotW = w - pad * 2;
    const plotH = h - pad * 2;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const x = pad + (i / 5) * plotW;
      ctx.moveTo(x, pad);
      ctx.lineTo(x, h - pad);
    }
    for (let j = 0; j <= 4; j++) {
      const y = pad + (j / 4) * plotH;
      ctx.moveTo(pad, y);
      ctx.lineTo(w - pad, y);
    }
    ctx.stroke();

    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    function vx(i) {
      if (maxLen <= 1) return pad + plotW;
      return pad + (i / Math.max(1, maxLen - 1)) * plotW;
    }
    function vy(v) {
      return pad + plotH - (v / (maxVal || 1)) * plotH;
    }

    function drawLine(series, color) {
      if (!series.length) return;
      ctx.beginPath();
      for (let i = 0; i < series.length; i++) {
        const x = vx(i);
        const y = vy(series[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      const lastIdx = series.length - 1;
      const lx = vx(lastIdx);
      const ly = vy(series[lastIdx]);
      ctx.beginPath();
      ctx.arc(lx, ly, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    drawLine(rabbits, "#2563eb");
    drawLine(wolves, "#ef4444");
    drawLine(carrots, "#16a34a");

    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#111827";
    ctx.fillText("poblaciones", w / 2 - 40, 18);

    const legendY = h - pad + 18;
    ctx.fillStyle = "#111827";
    ctx.fillText("conejos", pad + 8, legendY);
    ctx.fillStyle = "#2563eb";
    ctx.fillRect(pad + 60, legendY - 12, 18, 6);

    ctx.fillStyle = "#111827";
    ctx.fillText("lobos", pad + 110, legendY);
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(pad + 150, legendY - 12, 18, 6);

    ctx.fillStyle = "#111827";
    ctx.fillText("zanahorias", pad + 200, legendY);
    ctx.fillStyle = "#16a34a";
    ctx.fillRect(pad + 270, legendY - 12, 18, 6);

    ctx.fillStyle = "#6b7280";
    ctx.font = "11px sans-serif";
    for (let j = 0; j <= 4; j++) {
      const val = Math.round((maxVal * (4 - j)) / 4);
      const y = pad + (j / 4) * plotH;
      ctx.fillText(String(val), 6, y + 4);
    }

    ctx.fillStyle = "#6b7280";
    for (let i = 0; i <= 5; i++) {
      const idx = Math.round((i / 5) * Math.max(0, maxLen - 1));
      const x = vx(idx);
      const label = idx;
      ctx.fillText(String(label), x - 6, h - pad + 14);
    }
  }, [history?.rabbits?.length, history?.wolves?.length, history?.carrots?.length, ref]);

  useEffect(() => {
    const canvas = ref.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const rect = () => canvas.getBoundingClientRect();

    function onMove(e) {
      const r = rect();
      const dpr = Math.max(window.devicePixelRatio || 1, 1);
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      const pad = 40;
      const plotW = r.width - pad * 2;
      const maxLen = Math.max(
        (history?.rabbits?.length || 0),
        (history?.wolves?.length || 0),
        (history?.carrots?.length || 0),
        1
      );
      if (plotW <= 0 || maxLen === 0) {
        setTooltip(null);
        return;
      }
      const relX = Math.max(0, Math.min(plotW, cx - pad));
      const idxFloat = (relX / plotW) * Math.max(1, maxLen - 1);
      const idx = Math.round(idxFloat);
      const clampIdx = Math.max(0, Math.min(maxLen - 1, idx));

      const rVal = (history?.rabbits?.[clampIdx]) ?? null;
      const wVal = (history?.wolves?.[clampIdx]) ?? null;
      const cVal = (history?.carrots?.[clampIdx]) ?? null;

      setTooltip({
        x: e.clientX - r.left + 8,
        y: e.clientY - r.top + 8,
        items: [
          { label: "conejos", val: rVal, color: "#2563eb" },
          { label: "lobos", val: wVal, color: "#ef4444" },
          { label: "zanahorias", val: cVal, color: "#16a34a" },
        ],
        idx: clampIdx,
      });
    }
    function onLeave() {
      setTooltip(null);
    }

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [history]);

  return (
    <div ref={wrapperRef} className="relative w-full h-64">
      <canvas ref={ref} className="w-full h-full rounded-lg shadow-inner" />
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(0,0)",
            background: "rgba(255,255,255,0.95)",
            padding: "8px",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            pointerEvents: "none",
            minWidth: 120,
            zIndex: 30,
            fontSize: 12,
          }}
        >
          <div style={{ fontSize: 12, color: "#111827", fontWeight: 600, marginBottom: 6 }}>
            tick {tooltip.idx}
          </div>
          {tooltip.items.map((it) => (
            <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, background: it.color, borderRadius: 2 }} />
              <div style={{ color: "#374151", flex: 1 }}>{it.label}</div>
              <div style={{ fontWeight: 700 }}>{it.val ?? "—"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
