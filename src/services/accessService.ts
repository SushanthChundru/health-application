import type { AccessPermission, RecordCategory, ProviderType } from '@/types';
import { mockAccessPermissions, mockAccessHistory } from '@/data/mockData';
import type { AccessHistoryEntry } from '@/types';

/**
 * Simulated access control service.
 * In production, this would interact with a backend with real consent management,
 * cryptographic access tokens, and audit logging on a blockchain.
 */

let permissions: AccessPermission[] = [...mockAccessPermissions];
let history: AccessHistoryEntry[] = [...mockAccessHistory];

export function getActivePermissions(): AccessPermission[] {
  return permissions.filter((p) => p.status === 'Active');
}

export function getAllPermissions(): AccessPermission[] {
  return permissions;
}

export function getAccessHistory(): AccessHistoryEntry[] {
  return history.sort(
    (a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
  );
}

export function grantAccess(
  providerName: string,
  providerType: ProviderType,
  categories: RecordCategory[],
  expirationDate: string,
  isEmergency: boolean
): AccessPermission {
  const newPermission: AccessPermission = {
    id: 'ap-' + Date.now(),
    providerName,
    providerType,
    grantedDate: new Date().toISOString().split('T')[0],
    expirationDate,
    categories,
    status: 'Active',
    isEmergency,
  };
  permissions = [...permissions, newPermission];

  const historyEntry: AccessHistoryEntry = {
    id: 'ah-' + Date.now(),
    providerName,
    providerType,
    requestDate: new Date().toISOString().split('T')[0],
    status: 'Approved',
    requestedCategories: categories,
  };
  history = [...history, historyEntry];

  return newPermission;
}

export function revokeAccess(id: string): void {
  permissions = permissions.map((p) =>
    p.id === id ? { ...p, status: 'Revoked' as const } : p
  );

  const perm = permissions.find((p) => p.id === id);
  if (perm) {
    const historyEntry: AccessHistoryEntry = {
      id: 'ah-' + Date.now(),
      providerName: perm.providerName,
      providerType: perm.providerType,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Revoked',
      requestedCategories: perm.categories,
    };
    history = [...history, historyEntry];
  }
}
