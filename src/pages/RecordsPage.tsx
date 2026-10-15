import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  ArrowUpDown,
  Hospital,
  FlaskConical,
  Pill,
  Stethoscope,
  ScanLine,
  FileCheck2,
  Eye,
  X,
  Calendar,
  User,
  Building2,
  Boxes,
  Hash,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import Modal from '@/components/Modal';
import { useApp } from '@/context/AppContext';
import { mockRecords } from '@/data/mockData';
import type { MedicalRecord, RecordCategory } from '@/types';

const categories: (RecordCategory | 'All')[] = [
  'All',
  'Consultations',
  'Diagnoses',
  'Laboratory Reports',
  'Prescriptions',
  'Scans and Imaging',
  'Discharge Summaries',
];

const categoryIcons: Record<string, typeof FileText> = {
  Consultations: Stethoscope,
  Diagnoses: FileCheck2,
  'Laboratory Reports': FlaskConical,
  Prescriptions: Pill,
  'Scans and Imaging': ScanLine,
  'Discharge Summaries': FileText,
};

const providerIcons: Record<string, typeof FileText> = {
  Hospital: Hospital,
  Laboratory: FlaskConical,
  Pharmacy: Pill,
};

const providerColors: Record<string, string> = {
  Hospital: 'text-accent-400 bg-accent-400/10',
  Laboratory: 'text-cyan-400 bg-cyan-400/10',
  Pharmacy: 'text-purple-400 bg-purple-400/10',
};

export default function RecordsPage() {
  const { showToast } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<RecordCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'provider'>('date-desc');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const filteredRecords = useMemo(() => {
    let records = [...mockRecords];

    if (activeCategory !== 'All') {
      records = records.filter((r) => r.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      records = records.filter(
        (r) =>
          r.recordId.toLowerCase().includes(q) ||
          r.providerName.toLowerCase().includes(q) ||
          r.doctorName.toLowerCase().includes(q) ||
          r.diagnosisOrTest.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'date-desc') {
      records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'date-asc') {
      records.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'provider') {
      records.sort((a, b) => a.providerName.localeCompare(b.providerName));
    }

    return records;
  }, [searchQuery, activeCategory, sortBy]);

  const handleVerify = (record: MedicalRecord) => {
    setSelectedRecord(null);
    showToast(`Redirecting to blockchain verification for ${record.recordId}...`, 'info');
    navigate('/blockchain');
  };

  return (
    <div className="min-h-screen bg-navy-800">
      <PageHeader
        title="Medical Records"
        subtitle="Browse, search, and filter your complete medical history. All records are blockchain-verified for authenticity."
        icon={<FileText className="w-8 h-8 text-white" />}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-navy-700/50 border border-white/5 rounded-2xl p-6 mb-6 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by record ID, provider, doctor, diagnosis, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-600/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-400/50 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeCategory === cat
                    ? 'gradient-purple text-white shadow-lg shadow-purple-500/20'
                    : 'bg-navy-600/50 text-gray-400 hover:text-white hover:bg-navy-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-navy-600/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-accent-400/50"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="provider">Provider Name</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400">
            Showing <span className="text-white font-medium">{filteredRecords.length}</span> record{filteredRecords.length !== 1 ? 's' : ''}
          </p>
          {(searchQuery || activeCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="text-sm text-accent-200 hover:text-accent-100 flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>

        {/* Records Grid */}
        {filteredRecords.length === 0 ? (
          <div className="bg-navy-700/30 border border-white/5 rounded-2xl p-12 text-center">
            <Filter className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No records found matching your filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecords.map((record) => {
              const CatIcon = categoryIcons[record.category] || FileText;
              const ProvIcon = providerIcons[record.providerType] || Building2;
              return (
                <div
                  key={record.id}
                  className="group bg-navy-700/50 border border-white/5 rounded-2xl p-5 hover:border-accent-400/30 transition-all hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${providerColors[record.providerType]}`}>
                        <ProvIcon className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-gray-500">{record.providerType}</span>
                    </div>
                    <StatusBadge status={record.verificationStatus} />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <CatIcon className="w-4 h-4 text-accent-400" />
                    <span className="text-xs text-accent-200 font-medium">{record.category}</span>
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">{record.diagnosisOrTest}</h3>
                  <p className="text-xs text-gray-500 mb-3">{record.recordId}</p>

                  <div className="space-y-1.5 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3 h-3 text-gray-600" />
                      {record.providerName}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-gray-600" />
                      {record.doctorName}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-gray-600" />
                      {record.date}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRecord(record)}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-accent-400/20 text-gray-300 hover:text-accent-200 py-2.5 rounded-lg text-sm font-medium transition"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Record Detail Modal */}
      <Modal
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        title={selectedRecord ? `Record Details — ${selectedRecord.recordId}` : ''}
      >
        {selectedRecord && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${providerColors[selectedRecord.providerType]}`}>
                  {(() => {
                    const Icon = providerIcons[selectedRecord.providerType] || Building2;
                    return <Icon className="w-5 h-5" />;
                  })()}
                </div>
                <div>
                  <p className="text-white font-semibold">{selectedRecord.diagnosisOrTest}</p>
                  <p className="text-xs text-accent-200">{selectedRecord.category}</p>
                </div>
              </div>
              <StatusBadge status={selectedRecord.verificationStatus} />
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Building2, label: 'Provider', value: selectedRecord.providerName },
                { icon: User, label: 'Doctor', value: selectedRecord.doctorName },
                { icon: Calendar, label: 'Date', value: selectedRecord.date },
                { icon: Hash, label: 'Record ID', value: selectedRecord.recordId },
              ].map((item, i) => (
                <div key={i} className="bg-navy-600/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <item.icon className="w-3 h-3" />
                    {item.label}
                  </div>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Clinical details */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Clinical Details</h4>
              <p className="text-sm text-gray-400 leading-relaxed bg-navy-600/30 rounded-xl p-4">
                {selectedRecord.details}
              </p>
            </div>

            {/* Blockchain verification info */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Boxes className="w-4 h-4 text-accent-400" />
                Blockchain Verification Details
              </h4>
              <div className="bg-navy-600/30 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Block Number</span>
                  <span className="text-white font-mono">#{selectedRecord.blockNumber}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Record Hash</span>
                  <span className="text-accent-200 font-mono text-[11px]">{selectedRecord.recordHash}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="text-accent-200 font-mono text-[11px]">{selectedRecord.transactionId}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleVerify(selectedRecord)}
                className="flex-1 gradient-purple text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
              >
                <Boxes className="w-4 h-4" />
                Verify on Blockchain
              </button>
              <button
                onClick={() => {
                  setSelectedRecord(null);
                  showToast('Navigating to access management...', 'info');
                  navigate('/access');
                }}
                className="flex-1 bg-white/5 border border-accent-400/30 text-accent-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent-400/10 transition"
              >
                Share Record
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
