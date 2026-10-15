import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Shield,
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Building2,
  Boxes,
  Info,
  LogIn,
  LogOut,
  Fingerprint,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

const navLinks = [
  { label: 'Home', path: '/', icon: Shield },
  { label: 'Patient Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Medical Records', path: '/records', icon: FileText },
  { label: 'Healthcare Providers', path: '/providers', icon: Building2 },
  { label: 'Blockchain Verification', path: '/blockchain', icon: Boxes },
  { label: 'About Project', path: '/about', icon: Info },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    showToast('You have been logged out successfully.', 'info');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-800/95 backdrop-blur-lg border-b border-accent-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
            <div className="relative">
              <div className="absolute inset-0 bg-accent-400/30 rounded-lg blur-md group-hover:bg-accent-400/50 transition" />
              <div className="relative bg-gradient-to-br from-accent-400 to-accent-600 p-2 rounded-lg">
                <Fingerprint className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-white">
              Health<span className="gradient-text">Chain</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                    active
                      ? 'bg-accent-400/20 text-accent-200'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">
                  <span className="text-accent-200 font-medium">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 gradient-purple text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-800 border-t border-accent-400/20 animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                    active
                      ? 'bg-accent-400/20 text-accent-200'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-white/10">
              {user ? (
                <div className="space-y-2">
                  <p className="px-4 text-sm text-gray-400">
                    Signed in as <span className="text-accent-200">{user.name}</span>
                  </p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/20 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 gradient-purple text-white px-4 py-3 rounded-lg text-sm font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
