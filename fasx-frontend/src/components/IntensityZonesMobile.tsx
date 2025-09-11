import React, { useMemo } from "react";

interface Workout {
  zone1Min?: number;
  zone2Min?: number;
  zone3Min?: number;
  zone4Min?: number;
  zone5Min?: number;
}

interface Props {
  workouts: Workout[];
}

export default function IntensityZonesMobile({ workouts }: Props) {
  const totals = useMemo(() => {
    const sums = [0, 0, 0, 0, 0];

    for (const workout of workouts) {
      sums[0] += workout.zone1Min ?? 0;
      sums[1] += workout.zone2Min ?? 0;
      sums[2] += workout.zone3Min ?? 0;
      sums[3] += workout.zone4Min ?? 0;
      sums[4] += workout.zone5Min ?? 0;
    }

    const totalMinutes = sums.reduce((a, b) => a + b, 0);

    const percent = totalMinutes
      ? sums.map((min) => Math.round((min / totalMinutes) * 100))
      : [0, 0, 0, 0, 0];

    return sums.map((min, idx) => ({
      label: `Z${idx + 1}`,
      color: ["#2ecc71", "#f1c40f", "#e67e22", "#e74c3c", "#c0392b"][idx],
      time: min,
      percent: percent[idx],
    }));
  }, [workouts]);

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}ч ${m}м` : `${m}м`;
  };

  return (
    <div className="bg-[#1a1a1d] p-3 rounded-xl text-white">
      <h2 className="text-sm font-semibold mb-2">Intensity Zones</h2>
      <div className="flex justify-between gap-2 items-end h-20">
        {totals.map((zone, idx) => {
          const maxHeight = 80; // px
          const relativeHeight = Math.min(zone.time, 60); // ограничение для анимации
          const heightPx = totalMaxHeight(relativeHeight, totals);

          return (
            <div key={idx} className="flex flex-col items-center flex-1 text-center">
              <div
                title={`${zone.percent}% — ${formatTime(zone.time)}`}
                className="w-2 md:w-3 rounded-full mb-1 transition-all duration-700"
                style={{
                  height: `${heightPx}px`,
                  backgroundColor: zone.color,
                }}
              />
              <span className="text-[10px] text-gray-300">{zone.label}</span>
              <span className="text-[8px] text-gray-400">{zone.percent}%</span>
              <span className="text-[8px] text-gray-500">{formatTime(zone.time)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// функция для пропорциональной высоты
function totalMaxHeight(value: number, totals: { time: number }[]) {
  const max = Math.max(...totals.map((z) => z.time));
  if (max === 0) return 0;
  return (value / max) * 80; // 80px макс высота
}

