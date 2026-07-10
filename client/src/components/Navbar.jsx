import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBarChart2, FiLogOut, FiMenu, FiUser } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 text-xl font-semibold text-white">
          <FiBarChart2 className="text-cyan-400" /> SB Stocks
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {user ? (
            <>
              <Link className={location.pathname === '/dashboard' ? 'text-cyan-400' : ''} to="/dashboard">Dashboard</Link>
              <Link className={location.pathname === '/market' ? 'text-cyan-400' : ''} to="/market">Market</Link>
              <Link className={location.pathname === '/portfolio' ? 'text-cyan-400' : ''} to="/portfolio">Portfolio</Link>
              <Link className={location.pathname === '/watchlist' ? 'text-cyan-400' : ''} to="/watchlist">Watchlist</Link>
              <Link className={location.pathname === '/transactions' ? 'text-cyan-400' : ''} to="/transactions">Transactions</Link>
              <Link className={location.pathname === '/profile' ? 'text-cyan-400' : ''} to="/profile"><FiUser /></Link>
              <button onClick={() => { logout(); navigate('/'); }} className="rounded-full bg-white/10 px-3 py-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
        <div className="md:hidden"><FiMenu /></div>
      </div>
    </nav>
  );
}
