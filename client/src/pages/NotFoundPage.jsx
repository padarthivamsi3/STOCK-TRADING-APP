import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md p-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">404</p>
        <h1 className="mt-3 text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-slate-400">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-cyan-500 px-5 py-3 font-semibold">Go Home</Link>
      </div>
    </div>
  );
}
