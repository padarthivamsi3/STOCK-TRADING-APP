import { Link } from 'react-router-dom';
import { FiActivity, FiShield, FiTrendingUp, FiZap } from 'react-icons/fi';

const stats = [
  { label: 'Virtual Balance', value: '$100k' },
  { label: 'Live Market Data', value: '24/7' },
  { label: 'Paper Trades', value: '∞' }
];

const features = [
  { title: 'Risk-Free Practice', description: 'Trade with virtual capital and sharpen your strategy without financial risk.', icon: FiShield },
  { title: 'Real-Time Market View', description: 'Monitor top movers, active stocks, and performance at a glance.', icon: FiTrendingUp },
  { title: 'Smart Portfolio Insights', description: 'Track gains, losses, allocation, and balance in one place.', icon: FiActivity }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">Paper trading made simple</div>
          <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">Practice investing like a pro with <span className="text-cyan-400">SB Stocks</span>.</h1>
          <p className="max-w-xl text-lg text-slate-300">A modern paper trading platform for learning, testing strategies, and mastering market moves with virtual money.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white">Get Started</Link>
            <Link to="/login" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-slate-200">Login</Link>
          </div>
        </div>
        <div className="glass p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Portfolio Snapshot</p>
              <h2 className="text-3xl font-semibold">$142,780</h2>
            </div>
            <div className="rounded-full bg-emerald-500/20 p-3 text-emerald-400"><FiZap /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-slate-800/70 p-4">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 text-xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="glass p-6">
                <div className="mb-4 inline-flex rounded-full bg-white/10 p-3 text-cyan-400"><Icon size={20} /></div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
