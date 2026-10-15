import type { BlockchainBlock, VerificationStatus } from '@/types';
import { mockBlockchain } from '@/data/mockData';

/**
 * Simulated blockchain verification service.
 * This does NOT perform real blockchain verification.
 * It simulates hash comparison for demonstration purposes.
 * A real implementation would query a blockchain network (e.g., Ethereum, Hyperledger).
 */

export function getAllBlocks(): BlockchainBlock[] {
  return mockBlockchain.sort((a, b) => a.blockNumber - b.blockNumber);
}

export function getBlockByNumber(blockNumber: number): BlockchainBlock | undefined {
  return mockBlockchain.find((b) => b.blockNumber === blockNumber);
}

export function getLatestBlock(): BlockchainBlock {
  return mockBlockchain.reduce((latest, b) =>
    b.blockNumber > latest.blockNumber ? b : latest
  );
}

/**
 * Simulates verifying a record's hash against a stored reference hash.
 * Returns a verification result after a simulated delay.
 */
export async function verifyRecord(
  recordHash: string
): Promise<{ status: VerificationStatus; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const block = mockBlockchain.find((b) => b.recordHash === recordHash);
  if (block) {
    return {
      status: 'Verified',
      message: `Record hash verified successfully on Block #${block.blockNumber}. The stored hash matches the reference hash on the blockchain.`,
    };
  }

  return {
    status: 'Failed',
    message: 'Verification failed: The record hash does not match any stored reference hash on the blockchain.',
  };
}

/**
 * Generates a simulated hash for a new record.
 * Not a real cryptographic hash — for demonstration only.
 */
export function generateSimulatedHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 32; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}
