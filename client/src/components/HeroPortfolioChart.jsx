import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { value: 400 },
  { value: 420 },
  { value: 410 },
  { value: 455 },
  { value: 470 },
  { value: 465 },
  { value: 510 },
  { value: 535 },
  { value: 550 },
  { value: 565 },
  { value: 590 },
  { value: 610 },
  { value: 640 },
];

export default function HeroPortfolioChart() {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="portfolio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35}/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#portfolio)"
            isAnimationActive
            animationDuration={2500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}