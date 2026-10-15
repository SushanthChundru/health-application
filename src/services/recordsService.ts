import type { MedicalRecord, RecordCategory } from '@/types';
import { mockRecords } from '@/data/mockData';

/**
 * Simulated medical records service.
 * In production, this would connect to a secure backend API with Supabase.
 */

export function getAllRecords(): MedicalRecord[] {
  return mockRecords;
}

export function getRecordById(id: string): MedicalRecord | undefined {
  return mockRecords.find((r) => r.id === id || r.recordId === id);
}

export function getRecordsByCategory(category: RecordCategory | 'All'): MedicalRecord[] {
  if (category === 'All') return mockRecords;
  return mockRecords.filter((r) => r.category === category);
}

export function searchRecords(query: string): MedicalRecord[] {
  const lower = query.toLowerCase();
  return mockRecords.filter(
    (r) =>
      r.recordId.toLowerCase().includes(lower) ||
      r.providerName.toLowerCase().includes(lower) ||
      r.doctorName.toLowerCase().includes(lower) ||
      r.diagnosisOrTest.toLowerCase().includes(lower) ||
      r.category.toLowerCase().includes(lower)
  );
}

export function sortRecords(
  records: MedicalRecord[],
  sortBy: 'date-desc' | 'date-asc' | 'provider'
): MedicalRecord[] {
  const sorted = [...records];
  if (sortBy === 'date-desc') {
    sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (sortBy === 'date-asc') {
    sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } else if (sortBy === 'provider') {
    sorted.sort((a, b) => a.providerName.localeCompare(b.providerName));
  }
  return sorted;
}
