import type { UserRole, User } from '@/types';

/**
 * Simulated authentication service.
 * This is NOT real authentication — it is for demonstration purposes only.
 * A real implementation would use Supabase Auth, JWT tokens, and server-side verification.
 */

const STORAGE_KEY = 'healthchain_demo_user';

export function getCurrentUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function login(email: string, _password: string, role: UserRole): User {
  const user: User = {
    id: 'demo-user-001',
    name: getDemoNameForRole(role),
    email,
    role,
    healthId: role === 'patient' ? 'HC-2024-008374' : undefined,
    isAuthenticated: true,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function register(
  name: string,
  email: string,
  _password: string,
  role: UserRole
): User {
  const user: User = {
    id: 'demo-user-' + Date.now(),
    name,
    email,
    role,
    healthId: role === 'patient' ? 'HC-' + Date.now().toString().slice(-8) : undefined,
    isAuthenticated: true,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function demoLogin(): User {
  return login('aarav.sharma@email.com', 'demo123', 'patient');
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

function getDemoNameForRole(role: UserRole): string {
  const names: Record<UserRole, string> = {
    patient: 'Aarav Sharma',
    doctor: 'Dr. Rajesh Kumar',
    hospital_admin: 'Hospital Admin',
    lab_staff: 'Lab Technician',
    pharmacy_staff: 'Pharmacist Vikram',
  };
  return names[role];
}
