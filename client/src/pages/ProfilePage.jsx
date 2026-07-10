import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile({ name });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Profile</p>
        <h1 className="text-3xl font-semibold text-white">Edit your profile</h1>
      </div>
      <div className="glass p-8">
        <form className="space-y-5" onSubmit={handleSave}>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Name</label>
            <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Email</label>
            <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none" value={user?.email || ''} disabled />
          </div>
          <button className="rounded-full bg-cyan-500 px-5 py-3 font-semibold">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
