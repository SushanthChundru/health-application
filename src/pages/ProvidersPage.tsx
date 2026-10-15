import { useState } from 'react';
import {
  Building2,
  Hospital,
  FlaskConical,
  Pill,
  MapPin,
  Calendar,
  FileText,
  ArrowRight,
  X,
  User,
  Stethoscope,
  Share2,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import Modal from '@/components/Modal';
import { useApp } from '@/context/AppContext';
import { mockProviders } from '@/data/mockData';
import type { HealthcareProvider, ProviderType } from '@/types';

const typeFilters: (ProviderType | 'All')[] = ['All', 'Hospital', 'Laboratory', 'Pharmacy'];

const typeIcons: Record<string, typeof Hospital> = {
  Hospital,
  Laboratory: FlaskConical,
  Pharmacy: Pill,
};

const typeColors: Record<string, string> = {
  Hospital: 'from-accent-400 to-accent-600',
  Laboratory: 'from-cyan-400 to-accent-500',
  Pharmacy: 'from-purple-400 to-purple-600',
};

export default function ProvidersPage() {
  const { showToast } = useApp();
  const [activeFilter, setActiveFilter] = useState<ProviderType | 'All'>('All');
  const [selectedProvider, setSelectedProvider] = useState<HealthcareProvider | null>(null);

  const filteredProviders =
    activeFilter === 'All'
      ? mockProviders
      : mockProviders.filter((p) => p.type === activeFilter);

  const handleRequestAccess = (provider: HealthcareProvider) => {
    showToast(
      `Access request sent to ${provider.name}. You will be notified when the provider responds.`,
      'success'
    );
    setSelectedProvider(null);
  };

  return (
    <div className="min-h-screen bg-navy-800">
      <PageHeader
        title="Healthcare Providers"
        subtitle="Browse verified hospitals, laboratories, and pharmacies connected to the HealthChain network."
        icon={<Building2 className="w-8 h-8 text-white" />}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {typeFilters.map((filter) => {
            const Icon = filter === 'All' ? Building2 : typeIcons[filter];
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition ${
                  activeFilter === filter
                    ? 'gradient-purple text-white shadow-lg shadow-purple-500/20'
                    : 'bg-navy-700/50 text-gray-400 hover:text-white hover:bg-navy-700'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {filter === 'All' ? 'All Providers' : filter + 's'}
              </button>
            );
          })}
        </div>

        {/* Provider count */}
        <p className="text-sm text-gray-400 mb-4">
          Showing <span className="text-white font-medium">{filteredProviders.length}</span> provider{filteredProviders.length !== 1 ? 's' : ''}
        </p>

        {/* Provider cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => {
            const Icon = typeIcons[provider.type] || Hospital;
            const color = typeColors[provider.type];
            return (
              <div
                key={provider.id}
                className="group bg-navy-700/50 border border-white/5 rounded-2xl p-6 hover:border-accent-400/30 transition-all hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <StatusBadge status={provider.verificationStatus} />
                </div>

                <h3 className="text-lg font-bold text-white">{provider.name}</h3>
                <p className="text-xs text-accent-200 mt-1">{provider.type}</p>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed line-clamp-2">
                  {provider.description}
                </p>

                <div className="mt-4 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {provider.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Established {provider.established}
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    {provider.totalRecords} record{provider.totalRecords !== 1 ? 's' : ''} on HealthChain
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProvider(provider)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-accent-400/20 text-gray-300 hover:text-accent-200 py-2.5 rounded-lg text-sm font-medium transition"
                >
                  View Profile & Request Access
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Provider Profile Modal */}
      <Modal
        isOpen={!!selectedProvider}
        onClose={() => setSelectedProvider(null)}
        title={selectedProvider ? selectedProvider.name : ''}
      >
        {selectedProvider && (
          <div className="space-y-5">
            {/* Provider header */}
            <div className="flex items-center gap-4">
              <div className={`bg-gradient-to-br ${typeColors[selectedProvider.type]} p-4 rounded-xl`}>
                {(() => {
                  const Icon = typeIcons[selectedProvider.type] || Hospital;
                  return <Icon className="w-8 h-8 text-white" />;
                })()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedProvider.name}</h3>
                <p className="text-sm text-accent-200">{selectedProvider.type}</p>
                <StatusBadge status={selectedProvider.verificationStatus} />
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: 'Location', value: selectedProvider.location },
                { icon: Calendar, label: 'Established', value: selectedProvider.established },
                { icon: FileText, label: 'Total Records', value: String(selectedProvider.totalRecords) },
                { icon: Stethoscope, label: 'Provider Type', value: selectedProvider.type },
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

            {/* Description */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">About</h4>
              <p className="text-sm text-gray-400 leading-relaxed bg-navy-600/30 rounded-xl p-4">
                {selectedProvider.description}
              </p>
            </div>

            {/* Request access form */}
            <div className="bg-navy-600/30 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-accent-400" />
                Request Access to Patient Records
              </h4>
              <p className="text-xs text-gray-400 mb-4">
                By requesting access, you are asking this provider to grant you access to relevant
                medical records. The patient must approve all access requests.
              </p>
              <button
                onClick={() => handleRequestAccess(selectedProvider)}
                className="w-full gradient-purple text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
              >
                <User className="w-4 h-4" />
                Send Access Request
              </button>
            </div>

            {/* Close */}
            <button
              onClick={() => setSelectedProvider(null)}
              className="w-full bg-white/5 border border-white/10 text-gray-400 hover:text-white py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
