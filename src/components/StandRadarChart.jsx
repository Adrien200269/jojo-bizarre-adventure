import React from 'react';

// Stand Radar Chart (6-axis: Power, Speed, Range, Durability, Precision, Potential)
export default function StandRadarChart({
  stats = { power: 80, speed: 80, range: 60, durability: 70, precision: 75, potential: 85 },
  rawStats = null, // e.g. { power: 'A', speed: 'A', ... }
  size = 260,
  color = "#ec4899",
  labelColor = "#ffffff"
}) {
  const center = size / 2;
  const radius = (size / 2) - 42;

  // 6 axes in order
  const axes = [
    { key: "power", label: "Power", jp: "破壊力", angle: -Math.PI / 2 },
    { key: "speed", label: "Speed", jp: "スピード", angle: -Math.PI / 6 },
    { key: "range", label: "Range", jp: "射程距離", angle: Math.PI / 6 },
    { key: "durability", label: "Durability", jp: "持続力", angle: Math.PI / 2 },
    { key: "precision", label: "Precision", jp: "精密動作性", angle: 5 * Math.PI / 6 },
    { key: "potential", label: "Potential", jp: "成長性", angle: -5 * Math.PI / 6 },
  ];

  // Helper to convert rank string (A-E) to value if needed
  const rankToValue = (rank) => {
    if (typeof rank === 'number') return rank;
    switch ((rank || '').toUpperCase()) {
      case 'A': return 95;
      case 'B': return 78;
      case 'C': return 58;
      case 'D': return 38;
      case 'E': return 20;
      case 'INFINITE':
      case 'NONE': return 98;
      default: return 50;
    }
  };

  // Concentric polygon rings (levels 0.2, 0.4, 0.6, 0.8, 1.0)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const rankLabels = ['E', 'D', 'C', 'B', 'A'];

  // Points for data polygon
  const dataPoints = axes.map((axis) => {
    const rawVal = rawStats ? rawStats[axis.key] : stats[axis.key];
    const val = rankToValue(rawVal);
    const r = (val / 100) * radius;
    const x = center + r * Math.cos(axis.angle);
    const y = center + r * Math.sin(axis.angle);
    return { x, y, val, label: rawStats ? rawStats[axis.key] : Math.round(val) };
  });

  const polygonPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  return (
    <div className="relative flex flex-col items-center select-none">
      <svg width={size} height={size} className="overflow-visible filter drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]">
        {/* Background Grid Rings */}
        {levels.map((lvl, index) => {
          const ringPoints = axes.map(axis => {
            const r = lvl * radius;
            return `${center + r * Math.cos(axis.angle)},${center + r * Math.sin(axis.angle)}`;
          }).join(' ');

          return (
            <g key={lvl}>
              <polygon
                points={ringPoints}
                fill={index === levels.length - 1 ? "rgba(255, 255, 255, 0.04)" : "none"}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth={index === levels.length - 1 ? "2" : "1"}
                strokeDasharray={index === levels.length - 1 ? "none" : "3,3"}
              />
              {/* Stat rank indicators on vertical axis */}
              <text
                x={center + 5}
                y={center - lvl * radius + 11}
                fill="#facc15"
                fontSize="10"
                fontFamily="Bangers"
                opacity="0.8"
              >
                {rankLabels[index]}
              </text>
            </g>
          );
        })}

        {/* Axis Lines */}
        {axes.map((axis) => {
          const x2 = center + radius * Math.cos(axis.angle);
          const y2 = center + radius * Math.sin(axis.angle);
          return (
            <line
              key={axis.key}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Stand Stat Shape */}
        <path
          d={polygonPath}
          fill={color}
          fillOpacity="0.45"
          stroke={color}
          strokeWidth="3"
          className="transition-all duration-300 ease-out"
        />

        {/* Data Vertices */}
        {dataPoints.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill="#ffffff"
              stroke={color}
              strokeWidth="2.5"
              className="transition-all duration-300"
            />
            {/* Rank badge near vertex */}
            <text
              x={p.x + (p.x > center ? 7 : p.x < center ? -14 : 0)}
              y={p.y + (p.y > center ? 11 : -7)}
              fill="#ffd700"
              fontSize="11"
              fontWeight="900"
              fontFamily="Bangers"
              className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
            >
              {p.label}
            </text>
          </g>
        ))}

        {/* Outer Axis Labels */}
        {axes.map((axis) => {
          const labelDist = radius + 24;
          const lx = center + labelDist * Math.cos(axis.angle);
          const ly = center + labelDist * Math.sin(axis.angle);

          return (
            <g key={axis.key} className="pointer-events-none">
              <text
                x={lx}
                y={ly - 2}
                textAnchor="middle"
                fill={labelColor}
                fontSize="12"
                fontFamily="Bangers"
                letterSpacing="0.05em"
                className="drop-shadow-[0_2px_3px_#000]"
              >
                {axis.label.toUpperCase()}
              </text>
              <text
                x={lx}
                y={ly + 10}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="9"
                fontFamily="Noto Sans JP"
                fontWeight="700"
              >
                {axis.jp}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
