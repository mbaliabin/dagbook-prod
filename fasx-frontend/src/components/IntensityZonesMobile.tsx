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
      color: [
        "linear-gradient(90deg, #2ecc71, #27ae60)",
        "linear-gradient(90deg, #f1c40f, #f39c12)",
        "linear-gradient(90deg, #e67e22, #d35400)",
        "linear-gradient(90deg, #e74c3c, #c0392b)",
        "linear-gradient(90deg, #c0392b, #8e2c2b)",
      ][idx],
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
      <div className="flex flex-col gap-2">
        {totals.map((zone, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-6 text-[10px] text-gray-300">{zone.label}</span>
            <div className="flex-1 h-5 bg-[#333] rounded overflow-hidden relative">
              <div
                className="h-full rounded flex items-center justify-end pr-1 text-[8px] text-white font-medium transition-all duration-700"
                style={{
                  width: `${zone.percent}%`,
                  backgroundImage: zone.color,
                }}
              >
                {zone.percent > 5 && (
                  <span>{zone.percent}% ({formatTime(zone.time)})</span>
                )}
              </div>
              {zone.percent <= 5 && (
                <span className="absolute right-1 top-0 text-[8px] text-white">
                  {zone.percent}% ({formatTime(zone.time)})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


