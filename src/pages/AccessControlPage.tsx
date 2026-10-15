import { useState } from 'react';
import {
  KeyRound,
  Plus,
  ShieldCheck,
  X,
  Calendar,
  Hospital,
  FlaskConical,
  Pill,
  History,
  Siren,
  Check,
  Lock,
  User,
  Eye,
  Ban,
  Clock,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import Modal from '@/components/Modal';
import { useApp } from '@/context/AppContext';
import {
  mockAccessPermissions,
  mockAccessHistory,
  mockProviders,
} from '@/data/mockData';
import * as accessService from '@/services/accessService';
import type { AccessPermission, RecordCategory, ProviderType } from '@/types';

const allCategories: RecordCategory[] = [
  'Consultations',
  'Diagnoses',
  'Laboratory Reports',
  'Prescriptions',
  'Scans and Imaging',
  'Discharge Summaries',
];

const providerTypeIcons: Record<string, typeof Hospital> = {
  Hospital,
  Laboratory: FlaskConical,
  Pharmacy: Pill,
};

export default function AccessControlPage() {
  const { showToast } = useApp();
  const [permissions, setPermissions] = useState<AccessPermission[]>(mockAccessPermissions);
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProviderName, setSelectedProviderName] = useState('');
  const [selectedProviderType, setSelectedProviderType] = useState<ProviderType>('Hospital');
  const [selectedCategories, setSelectedCategories] = useState<RecordCategory[]>([]);
  const [expirationDate, setExpirationDate] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activePermissions = permissions.filter((p) => p.status === 'Active');
  const expiredOrRevoked = permissions.filter((p) => p.status !== 'Active');

  const handleGrantAccess = () => {
    if (!selectedProviderName) {
      showToast('Please select a healthcare provider.', 'error');
      return;
    }
    if (selectedCategories.length === 0) {
      showToast('Please select at least one record category to share.', 'error');
      return;
    }
    if (!expirationDate) {
      showToast('Please set an access expiration date.', 'error');
      return;
    }
    setShowGrantModal(false);
    setShowConfirmModal(true);
  };

  const confirmGrant = () => {
    const newPerm = accessService.grantAccess(
      selectedProviderName,
      selectedProviderType,
      selectedCategories,
      expirationDate,
      isEmergency
    );
    setPermissions([...permissions, newPerm]);
    setShowConfirmModal(false);
    showToast(
      `Access granted to ${selectedProviderName} for ${selectedCategories.length} categor${selectedCategories.length > 1 ? 'ies' : 'y'}.`,
      'success'
    );
    // Reset form
    setSelectedProviderName('');
    setSelectedCategories([]);
    setExpirationDate('');
    setIsEmergency(false);
  };

  const handleRevoke = (id: string) => {
    const perm = permissions.find((p) => p.id === id);
    if (perm) {
      accessService.revokeAccess(id);
      setPermissions(permissions.map((p) => (p.id === id ? { ...p, status: 'Revoked' as const } : p)));
      showToast(`Access revoked for ${perm.providerName}.`, 'info');
    }
  };

  const toggleCategory = (cat: RecordCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-navy-800">
      <PageHeader
        title="Privacy & Access Control"
        subtitle="You are in control. Manage who can access your medical records, what they can see, and for how long."
        icon={<KeyRound className="w-8 h-8 text-white" />}
      >
        <div className="flex flex-wrap gap-3">
          <div className="bg-navy-700/50 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Check className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{activePermissions.length}</p>
              <p className="text-xs text-gray-500">Active Permissions</p>
            </div>
          </div>
          <div className="bg-navy-700/50 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3">
            <div className="bg-amber-500/20 p-2 rounded-lg">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{expiredOrRevoked.length}</p>
              <p className="text-xs text-gray-500">Expired / Revoked</p>
            </div>
          </div>
          <button
            onClick={() => setShowGrantModal(true)}
            className="gradient-purple text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            Grant New Access
          </button>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition ${
              activeTab === 'active'
                ? 'bg-accent-400/20 text-accent-200 border border-accent-400/30'
                : 'bg-navy-700/50 text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            Active Permissions ({activePermissions.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition ${
              activeTab === 'history'
                ? 'bg-accent-400/20 text-accent-200 border border-accent-400/30'
                : 'bg-navy-700/50 text-gray-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            Access History
          </button>
        </div>

        {/* Active Permissions */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activePermissions.length === 0 ? (
              <div className="bg-navy-700/30 border border-white/5 rounded-2xl p-12 text-center">
                <Lock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No active permissions. Grant access to share your records.</p>
              </div>
            ) : (
              activePermissions.map((perm) => {
                const Icon = providerTypeIcons[perm.providerType] || Hospital;
                return (
                  <div
                    key={perm.id}
                    className="bg-navy-700/50 border border-white/5 rounded-2xl p-5 hover:border-accent-400/20 transition"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex items-center gap-3 md:w-1/3">
                        <div className="bg-accent-400/10 p-3 rounded-xl">
                          <Icon className="w-5 h-5 text-accent-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{perm.providerName}</p>
                          <p className="text-xs text-gray-500">{perm.providerType}</p>
                          {perm.isEmergency && (
                            <span className="inline-flex items-center gap-1 mt-1 text-xs text-red-400">
                              <Siren className="w-3 h-3" />
                              Emergency Access
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {perm.categories.map((cat) => (
                            <span
                              key={cat}
                              className="bg-accent-400/10 text-accent-200 px-2.5 py-1 rounded-lg text-xs font-medium border border-accent-400/20"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Granted: {perm.grantedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Expires: {perm.expirationDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <StatusBadge status={perm.status} />
                        <button
                          onClick={() => handleRevoke(perm.id)}
                          className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                        >
                          <Ban className="w-4 h-4" />
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Expired/Revoked section */}
            {expiredOrRevoked.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">Expired & Revoked Access</h3>
                <div className="space-y-2">
                  {expiredOrRevoked.map((perm) => {
                    const Icon = providerTypeIcons[perm.providerType] || Hospital;
                    return (
                      <div
                        key={perm.id}
                        className="bg-navy-700/20 border border-white/5 rounded-xl p-4 flex items-center gap-3 opacity-60"
                      >
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-400 flex-1">{perm.providerName}</span>
                        <StatusBadge status={perm.status} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Access History */}
        {activeTab === 'history' && (
          <div className="bg-navy-700/50 border border-white/5 rounded-2xl p-6">
            <div className="space-y-3">
              {mockAccessHistory.map((entry) => {
                const Icon = providerTypeIcons[entry.providerType] || Hospital;
                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-4 bg-navy-600/50 rounded-xl p-4 hover:bg-navy-600/80 transition"
                  >
                    <div className="bg-accent-400/10 p-2.5 rounded-lg">
                      <Icon className="w-4 h-4 text-accent-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        <span className="font-medium">{entry.providerName}</span>
                        <span className="text-gray-500"> — {entry.providerType}</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {entry.requestedCategories.map((cat) => (
                          <span key={cat} className="text-xs text-gray-500 bg-navy-500/50 px-2 py-0.5 rounded">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Requested on {entry.requestDate}</p>
                    </div>
                    <StatusBadge status={entry.status} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Emergency Access info */}
        <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-500/20 p-3 rounded-xl flex-shrink-0">
              <Siren className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Emergency Access Protocol</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                In a medical emergency, authorized healthcare providers can request emergency access
                to critical patient information (blood group, allergies, current medications). Emergency
                access requires additional authorization and all actions are fully audit-logged on the
                blockchain. The patient is notified after the emergency is resolved.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                  Requires authorization
                </span>
                <span className="text-xs text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                  Audit-logged
                </span>
                <span className="text-xs text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                  Patient notified post-event
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grant Access Modal */}
      <Modal
        isOpen={showGrantModal}
        onClose={() => setShowGrantModal(false)}
        title="Grant Access to a Healthcare Provider"
      >
        <div className="space-y-5">
          {/* Provider selection */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">Select Provider</label>
            <select
              value={selectedProviderName}
              onChange={(e) => {
                const prov = mockProviders.find((p) => p.name === e.target.value);
                setSelectedProviderName(e.target.value);
                if (prov) setSelectedProviderType(prov.type);
              }}
              className="w-full bg-navy-600/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-400/50"
            >
              <option value="">Choose a provider...</option>
              {mockProviders.map((prov) => (
                <option key={prov.id} value={prov.name}>
                  {prov.name} ({prov.type})
                </option>
              ))}
            </select>
          </div>

          {/* Record categories */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">Record Categories to Share</label>
            <div className="grid grid-cols-2 gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition text-left ${
                    selectedCategories.includes(cat)
                      ? 'bg-accent-400/20 text-accent-200 border border-accent-400/40'
                      : 'bg-navy-600/50 text-gray-400 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                    selectedCategories.includes(cat) ? 'bg-accent-400 border-accent-400' : 'border-gray-600'
                  }`}>
                    {selectedCategories.includes(cat) && <Check className="w-3 h-3 text-navy-900" />}
                  </div>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Expiration date */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">Access Expiration Date</label>
            <input
              type="date"
              value={expirationDate}
              min={today}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full bg-navy-600/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-400/50"
            />
          </div>

          {/* Emergency toggle */}
          <label className="flex items-center gap-3 bg-navy-600/30 rounded-xl p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={isEmergency}
              onChange={(e) => setIsEmergency(e.target.checked)}
              className="w-5 h-5 rounded accent-red-500"
            />
            <div className="flex-1">
              <p className="text-sm text-white flex items-center gap-2">
                <Siren className="w-4 h-4 text-red-400" />
                Emergency Access
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Grants immediate access to critical information with additional audit logging
              </p>
            </div>
          </label>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleGrantAccess}
              className="flex-1 gradient-purple text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              Review & Confirm
            </button>
            <button
              onClick={() => setShowGrantModal(false)}
              className="bg-white/5 border border-white/10 text-gray-400 hover:text-white px-6 py-3 rounded-xl font-medium transition flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Consent Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Consent Confirmation"
        maxWidth="max-w-lg"
      >
        <div className="space-y-4">
          <div className="bg-navy-600/50 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-accent-400" />
              <div>
                <p className="text-xs text-gray-500">Provider</p>
                <p className="text-sm text-white font-medium">{selectedProviderName}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Categories</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCategories.map((cat) => (
                  <span key={cat} className="text-xs text-accent-200 bg-accent-400/10 px-2 py-1 rounded border border-accent-400/20">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-accent-400" />
              <div>
                <p className="text-xs text-gray-500">Expires On</p>
                <p className="text-sm text-white font-medium">{expirationDate}</p>
              </div>
            </div>
            {isEmergency && (
              <div className="flex items-center gap-3">
                <Siren className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-xs text-gray-500">Access Type</p>
                  <p className="text-sm text-red-300 font-medium">Emergency Access</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <p className="text-sm text-amber-200">
              <ShieldCheck className="w-4 h-4 inline mr-1" />
              By confirming, you consent to sharing the selected record categories with this provider
              until the expiration date. You can revoke access at any time. This action will be
              recorded on the blockchain as an audit entry.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={confirmGrant}
              className="flex-1 gradient-purple text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
            >
              <Check className="w-4 h-4" />
              I Consent — Grant Access
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="bg-white/5 border border-white/10 text-gray-400 hover:text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
