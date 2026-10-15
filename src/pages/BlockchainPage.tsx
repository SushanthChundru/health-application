import { useState } from 'react';
import {
  Boxes,
  ShieldCheck,
  Hash,
  Link2,
  Clock,
  Building2,
  FileText,
  Check,
  X,
  Search,
  Loader2,
  AlertTriangle,
  Database,
  ArrowRight,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import { useApp } from '@/context/AppContext';
import { getAllBlocks, verifyRecord } from '@/services/blockchainService';
import type { BlockchainBlock, VerificationStatus } from '@/types';

export default function BlockchainPage() {
  const { showToast } = useApp();
  const blocks = getAllBlocks();
  const [selectedBlock, setSelectedBlock] = useState<BlockchainBlock | null>(blocks[0] || null);
  const [verifyInput, setVerifyInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{ status: VerificationStatus; message: string } | null>(null);

  const handleVerify = async (hash?: string) => {
    const hashToVerify = hash || verifyInput;
    if (!hashToVerify) {
      showToast('Please enter a record hash to verify.', 'error');
      return;
    }

    setVerifying(true);
    setVerifyResult(null);

    const result = await verifyRecord(hashToVerify);
    setVerifying(false);
    setVerifyResult(result);
    showToast(result.message, result.status === 'Verified' ? 'success' : 'error');
  };

  const formatTimestamp = (ts: string) =>
    new Date(ts).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <div className="min-h-screen bg-navy-800">
      <PageHeader
        title="Blockchain Verification"
        subtitle="Verify the authenticity of medical records using blockchain technology. Each record's hash is stored on a distributed ledger for tamper-evident verification."
        icon={<Boxes className="w-8 h-8 text-white" />}
      >
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2 text-sm text-amber-200">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            This is a demonstration. Blockchain verification is simulated. No real blockchain network
            is connected. Medical documents are never stored on-chain — only hashes and audit proofs.
          </span>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Verify Record Section */}
        <div className="bg-gradient-to-br from-navy-700 to-navy-800 border border-accent-400/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-accent-400" />
            Verify a Record
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Enter a record hash below or use one from the blockchain explorer to check its authenticity.
            The system will compare the hash against the stored reference hash on the blockchain.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="0x..."
                value={verifyInput}
                onChange={(e) => setVerifyInput(e.target.value)}
                className="w-full bg-navy-600/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-accent-400/50"
              />
            </div>
            <button
              onClick={() => handleVerify()}
              disabled={verifying}
              className="gradient-purple text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Verify Record
                </>
              )}
            </button>
          </div>

          {/* Suggestion chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {blocks.slice(0, 3).map((b) => (
              <button
                key={b.blockNumber}
                onClick={() => {
                  setVerifyInput(b.recordHash);
                  setVerifyResult(null);
                }}
                className="text-xs text-gray-500 bg-navy-600/50 hover:bg-navy-600 border border-white/10 px-2.5 py-1 rounded-lg transition flex items-center gap-1"
              >
                <Hash className="w-3 h-3" />
                {b.recordHash.slice(0, 18)}...
              </button>
            ))}
          </div>

          {/* Verification Result */}
          {verifyResult && (
            <div
              className={`mt-4 rounded-xl p-5 border ${
                verifyResult.status === 'Verified'
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {verifyResult.status === 'Verified' ? (
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                ) : (
                  <div className="bg-red-500/20 p-2 rounded-lg">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                )}
                <h3 className={`text-lg font-bold ${verifyResult.status === 'Verified' ? 'text-green-300' : 'text-red-300'}`}>
                  {verifyResult.status === 'Verified' ? 'Record Verified' : 'Verification Failed'}
                </h3>
              </div>
              <p className="text-sm text-gray-400">{verifyResult.message}</p>
            </div>
          )}
        </div>

        {/* Blockchain Explorer */}
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-accent-400" />
            Blockchain Explorer
          </h2>

          {/* Connected blocks visualization */}
          <div className="bg-navy-700/50 border border-white/5 rounded-2xl p-6 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 min-w-max pb-2">
              {blocks.map((block, i) => (
                <div key={block.blockNumber} className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedBlock(block);
                      setVerifyResult(null);
                    }}
                    className={`flex-shrink-0 w-44 p-4 rounded-xl border transition-all text-left ${
                      selectedBlock?.blockNumber === block.blockNumber
                        ? 'bg-accent-400/20 border-accent-400/50 shadow-lg shadow-accent-400/10'
                        : 'bg-navy-600/50 border-white/10 hover:border-accent-400/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-mono">#{block.blockNumber}</span>
                      <StatusBadge status={block.verificationStatus} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Database className="w-3 h-3 text-accent-400" />
                      <span className="text-xs text-white font-medium truncate">{block.recordType}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">{block.providerName}</p>
                  </button>
                  {i < blocks.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-accent-400/40 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Block details */}
        {selectedBlock && (
          <div className="bg-navy-700/50 border border-accent-400/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-accent-400" />
                Block #{selectedBlock.blockNumber} Details
              </h3>
              <StatusBadge status={selectedBlock.verificationStatus} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Hash, label: 'Block Number', value: `#${selectedBlock.blockNumber}`, mono: true },
                { icon: Link2, label: 'Transaction ID', value: selectedBlock.transactionId, mono: true },
                { icon: Clock, label: 'Timestamp', value: formatTimestamp(selectedBlock.timestamp) },
                { icon: FileText, label: 'Record Type', value: selectedBlock.recordType },
                { icon: Building2, label: 'Provider', value: selectedBlock.providerName },
                { icon: Hash, label: 'Record Hash', value: selectedBlock.recordHash, mono: true, long: true },
                { icon: Link2, label: 'Previous Block Hash', value: selectedBlock.previousHash, mono: true, long: true },
              ].map((item, i) => (
                <div key={i} className={`bg-navy-600/50 rounded-xl p-4 ${item.long ? 'sm:col-span-2' : ''}`}>
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <item.icon className="w-3 h-3" />
                    {item.label}
                  </div>
                  <p className={`text-sm text-white ${item.mono ? 'font-mono' : 'font-medium'} ${item.long ? 'break-all' : 'truncate'}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Verify this block's record */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setVerifyInput(selectedBlock.recordHash);
                  handleVerify(selectedBlock.recordHash);
                }}
                disabled={verifying}
                className="gradient-purple text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {verifying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                Verify This Block's Record
              </button>
            </div>
          </div>
        )}

        {/* How blockchain verification works */}
        <div className="bg-navy-700/50 border border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            How Blockchain Verification Works
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                step: 1,
                title: 'Record Created',
                description: 'When a medical record is created, a unique hash is generated from the record data.',
                icon: FileText,
              },
              {
                step: 2,
                title: 'Hash Stored On-Chain',
                description: 'The hash is stored on the blockchain. The actual medical document stays off-chain in encrypted storage.',
                icon: Database,
              },
              {
                step: 3,
                title: 'Verification',
                description: 'To verify, the system recomputes the hash and compares it to the on-chain reference. A match confirms authenticity.',
                icon: ShieldCheck,
              },
            ].map((s, i) => (
              <div key={i} className="bg-navy-600/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <s.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-xs text-gray-500">Step {s.step}</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{s.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
