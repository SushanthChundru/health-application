import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Fingerprint,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Stethoscope,
  Hospital,
  FlaskConical,
  Pill,
  ArrowRight,
  AlertCircle,
  Info,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { UserRole } from '@/types';

const roles: { value: UserRole; label: string; icon: typeof User; color: string }[] = [
  { value: 'patient', label: 'Patient', icon: User, color: 'from-accent-400 to-accent-600' },
  { value: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'from-cyan-400 to-accent-500' },
  { value: 'hospital_admin', label: 'Hospital Admin', icon: Hospital, color: 'from-blue-400 to-accent-600' },
  { value: 'lab_staff', label: 'Laboratory Staff', icon: FlaskConical, color: 'from-teal-400 to-accent-500' },
  { value: 'pharmacy_staff', label: 'Pharmacy Staff', icon: Pill, color: 'from-purple-400 to-purple-600' },
];

type Mode = 'login' | 'register';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register, demoLogin, showToast } = useApp();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (mode === 'register' && !name.trim()) {
      errs.name = 'Name is required';
    }

    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register' && password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'login') {
      const user = login(email, password, role);
      showToast(`Welcome back, ${user.name}!`, 'success');
      navigate('/dashboard');
    } else {
      const user = register(name, email, password, role);
      showToast(`Account created successfully. Welcome, ${user.name}!`, 'success');
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = () => {
    const user = demoLogin();
    showToast(`Demo login successful. Welcome, ${user.name}!`, 'success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-navy-800 flex items-center justify-center p-4 pt-24 pb-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-gradient-to-br from-accent-400 to-accent-600 p-2.5 rounded-xl">
              <Fingerprint className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Health<span className="gradient-text">Chain</span>
            </span>
          </Link>
        </div>

        <div className="bg-navy-700/50 border border-accent-400/20 rounded-2xl p-6 md:p-8">
          {/* Mode toggle */}
          <div className="flex gap-2 p-1 bg-navy-600/50 rounded-xl mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
                mode === 'login'
                  ? 'gradient-purple text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
                mode === 'register'
                  ? 'gradient-purple text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          <h2 className="text-xl font-bold text-white mb-1">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {mode === 'login'
              ? 'Sign in to access your healthcare dashboard'
              : 'Join HealthChain and get your digital healthcare identity'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selection */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Select Your Role</label>
              <div className="grid grid-cols-5 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition ${
                      role === r.value
                        ? 'bg-accent-400/20 border-accent-400/50'
                        : 'bg-navy-600/50 border-white/10 hover:border-white/20'
                    }`}
                    title={r.label}
                  >
                    <r.icon className={`w-4 h-4 ${role === r.value ? 'text-accent-200' : 'text-gray-500'}`} />
                    <span className={`text-[10px] ${role === r.value ? 'text-accent-200' : 'text-gray-500'}`}>
                      {r.label.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name (register only) */}
            {mode === 'register' && (
              <div>
                <label className="text-sm font-medium text-white mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-navy-600/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-400/50 transition"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-white mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-navy-600/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-400/50 transition"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-white mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-navy-600/50 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-400/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password (register only) */}
            {mode === 'register' && (
              <div>
                <label className="text-sm font-medium text-white mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-navy-600/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-400/50 transition"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full gradient-purple text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-purple-500/20"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo login */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              onClick={handleDemoLogin}
              className="w-full bg-white/5 border border-accent-400/30 text-accent-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent-400/10 transition"
            >
              <Info className="w-4 h-4" />
              Try Demo Login (No Credentials Needed)
            </button>
            <p className="text-xs text-gray-600 text-center mt-3">
              This is simulated authentication for demonstration purposes only.
              No real credentials are verified.
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-gray-500 hover:text-accent-200 transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
