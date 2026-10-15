import type { LucideIcon } from 'lucide-react';

export type UserRole = 'patient' | 'doctor' | 'hospital_admin' | 'lab_staff' | 'pharmacy_staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  healthId?: string;
  isAuthenticated: boolean;
}

export type RecordCategory =
  | 'Consultations'
  | 'Diagnoses'
  | 'Laboratory Reports'
  | 'Prescriptions'
  | 'Scans and Imaging'
  | 'Discharge Summaries';

export type VerificationStatus = 'Verified' | 'Pending' | 'Failed';

export interface MedicalRecord {
  id: string;
  recordId: string;
  providerName: string;
  providerType: 'Hospital' | 'Laboratory' | 'Pharmacy';
  category: RecordCategory;
  doctorName: string;
  date: string;
  diagnosisOrTest: string;
  verificationStatus: VerificationStatus;
  details: string;
  blockNumber: number;
  recordHash: string;
  transactionId: string;
}

export type ProviderType = 'Hospital' | 'Laboratory' | 'Pharmacy';

export interface HealthcareProvider {
  id: string;
  name: string;
  type: ProviderType;
  location: string;
  verificationStatus: VerificationStatus;
  description: string;
  totalRecords: number;
  established: string;
}

export interface AccessPermission {
  id: string;
  providerName: string;
  providerType: ProviderType;
  grantedDate: string;
  expirationDate: string;
  categories: RecordCategory[];
  status: 'Active' | 'Expired' | 'Revoked';
  isEmergency: boolean;
}

export interface AccessHistoryEntry {
  id: string;
  providerName: string;
  providerType: ProviderType;
  requestDate: string;
  status: 'Approved' | 'Denied' | 'Expired' | 'Revoked';
  requestedCategories: RecordCategory[];
}

export interface BlockchainBlock {
  blockNumber: number;
  transactionId: string;
  timestamp: string;
  recordHash: string;
  previousHash: string;
  verificationStatus: VerificationStatus;
  recordType: string;
  providerName: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  time: string;
  reason: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface Activity {
  id: string;
  type: 'record_added' | 'access_granted' | 'access_revoked' | 'verification' | 'appointment';
  description: string;
  timestamp: string;
  icon: LucideIcon;
}

export interface Patient {
  id: string;
  name: string;
  healthId: string;
  bloodGroup: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  totalRecords: number;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
