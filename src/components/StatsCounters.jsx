import React from "react";

export default function StatsCounters({ history }) {
    const r = (history?.rabbits ?? []);
    const w = (history?.wolves ?? []);
    const c = (history?.carrots ?? []);

    const last = (arr) => (arr.length ? arr[arr.length - 1] : 0);
    const prev = (arr) => (arr.length > 1 ? arr[arr.length - 2] : null);

    const rabbitsNow = last(r);
    const wolvesNow = last(w);
    const carrotsNow = last(c);

    const rabbitsPrev = prev(r);
    const wolvesPrev = prev(w);
    const carrotsPrev = prev(c);

    function delta(now, prevVal) {
        if (prevVal == null) return null;
        const d = now - prevVal;
        return d === 0 ? "±0" : d > 0 ? `+${d}` : `${d}`;
    }

    const itemClass = "flex flex-col items-center justify-center px-3 py-2 rounded-lg";
    const numClass = "text-2xl font-semibold leading-tight";

    return (
        <div className="w-full flex gap-3">
            <div className={`${itemClass} bg-white border border-gray-200 flex-1`}>
                <div className="text-xs text-gray-500">conejos</div>
                <div className={numClass} style={{ color: "#2563eb" }}>{rabbitsNow}</div>
                <div className="text-xs text-gray-400">{delta(rabbitsNow, rabbitsPrev) ?? "—"}</div>
            </div>
            <div className={`${itemClass} bg-white border border-gray-200 flex-1`}>
                <div className="text-xs text-gray-500">lobos</div>
                <div className={numClass} style={{ color: "#ef4444" }}>{wolvesNow}</div>
                <div className="text-xs text-gray-400">{delta(wolvesNow, wolvesPrev) ?? "—"}</div>
            </div>
            <div className={`${itemClass} bg-white border border-gray-200 flex-1`}>
                <div className="text-xs text-gray-500">zanahorias</div>
                <div className={numClass} style={{ color: "#16a34a" }}>{carrotsNow}</div>
                <div className="text-xs text-gray-400">{delta(carrotsNow, carrotsPrev) ?? "—"}</div>
            </div>
        </div>
    );
}
