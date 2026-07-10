import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-16">
      <div className="glass w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold">Welcome back</h2>
        <p className="mt-2 text-slate-400">Sign in to access your paper trading dashboard.</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold">Login</button>
        </form>
        <p className="mt-4 text-sm text-slate-400">Need an account? <Link to="/register" className="text-cyan-400">Register</Link></p>
      </div>
    </div>
  );
}
