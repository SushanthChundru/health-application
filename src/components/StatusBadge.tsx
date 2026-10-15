import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import type { VerificationStatus } from '@/types';

interface StatusBadgeProps {
  status: VerificationStatus | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
    Verified: { color: 'bg-green-500/20 text-green-300 border-green-500/30', icon: CheckCircle2, label: 'Verified' },
    Pending: { color: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: Clock, label: 'Pending' },
    Failed: { color: 'bg-red-500/20 text-red-300 border-red-500/30', icon: XCircle, label: 'Failed' },
    Active: { color: 'bg-green-500/20 text-green-300 border-green-500/30', icon: CheckCircle2, label: 'Active' },
    Expired: { color: 'bg-gray-500/20 text-gray-300 border-gray-500/30', icon: Clock, label: 'Expired' },
    Revoked: { color: 'bg-red-500/20 text-red-300 border-red-500/30', icon: XCircle, label: 'Revoked' },
    Approved: { color: 'bg-green-500/20 text-green-300 border-green-500/30', icon: CheckCircle2, label: 'Approved' },
    Denied: { color: 'bg-red-500/20 text-red-300 border-red-500/30', icon: XCircle, label: 'Denied' },
  };

  const c = config[status] || { color: 'bg-gray-500/20 text-gray-300 border-gray-500/30', icon: CheckCircle2, label: status };
  const Icon = c.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${c.color}`}>
      <Icon className="w-3 h-3" />
      {c.label}
    </span>
  );
}
