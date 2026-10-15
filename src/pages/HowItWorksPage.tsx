import { Link } from 'react-router-dom';
import {
  UserPlus,
  Stethoscope,
  FlaskConical,
  Pill,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Boxes,
  Database,
  FileText,
  Fingerprint,
  Eye,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const steps = [
  {
    icon: UserPlus,
    title: 'Patient Registration',
    description:
      'A patient registers on HealthChain and receives a unique digital healthcare identity (Health ID) that links all their medical records.',
    color: 'from-accent-400 to-accent-600',
  },
  {
    icon: Stethoscope,
    title: 'Hospital Adds Records',
    description:
      'A hospital adds medical records including consultations, prescriptions, diagnoses, and treatment details to the patient\u2019s profile.',
    color: 'from-cyan-400 to-accent-500',
  },
  {
    icon: FlaskConical,
    title: 'Laboratory Uploads Reports',
    description:
      'A laboratory uploads test reports and diagnostic results, which are linked to the patient\u2019s Health ID and verified on the blockchain.',
    color: 'from-blue-400 to-accent-600',
  },
  {
    icon: Pill,
    title: 'Pharmacy Records Prescriptions',
    description:
      'A pharmacy records dispensed prescriptions and medicine-related information, creating a complete medication history.',
    color: 'from-teal-400 to-accent-500',
  },
  {
    icon: KeyRound,
    title: 'Provider Requests Access',
    description:
      'Authorized healthcare providers request access to relevant patient records. The patient receives a consent request and can approve or deny it.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: ShieldCheck,
    title: 'Verification and Audit',
    description:
      'The system verifies permissions and records an audit entry on the blockchain for access and record verification, ensuring a tamper-evident trail.',
    color: 'from-green-400 to-accent-600',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-navy-800">
      <PageHeader
        title="How It Works"
        subtitle="A step-by-step walkthrough of how HealthChain connects patients, hospitals, laboratories, and pharmacies through blockchain technology."
        icon={<Boxes className="w-8 h-8 text-white" />}
      />

      {/* Steps */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-400/50 via-accent-400/30 to-transparent md:-translate-x-1/2" />

            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex gap-6 md:gap-0 mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step number / icon */}
                <div className="relative z-10 flex-shrink-0 md:w-1/2 md:flex md:justify-center">
                  <div className={`md:flex ${i % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}`}>
                    <div className={`bg-gradient-to-br ${step.color} p-4 rounded-2xl shadow-xl relative`}>
                      <step.icon className="w-8 h-8 text-white" />
                      <span className="absolute -top-3 -right-3 bg-navy-900 text-accent-200 text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center border border-accent-400/30">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  <div className="bg-navy-700/50 border border-accent-400/20 rounded-2xl p-6 hover:border-accent-400/40 transition-all">
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture explanation */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              On-Chain vs. Off-Chain Storage
            </h2>
            <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
              HealthChain uses a hybrid architecture to balance security, privacy, and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* On-Chain */}
            <div className="bg-navy-700/50 border border-accent-400/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-accent-400 to-accent-600 p-3 rounded-xl">
                  <Boxes className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">On-Chain (Blockchain)</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Stored on a distributed ledger for tamper-evident verification and auditability.
              </p>
              <ul className="space-y-2">
                {[
                  { icon: FileText, text: 'Record hashes (not documents)' },
                  { icon: KeyRound, text: 'Consent and access records' },
                  { icon: ShieldCheck, text: 'Audit trail entries' },
                  { icon: Fingerprint, text: 'Identity verification proofs' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <item.icon className="w-4 h-4 text-accent-400 flex-shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Off-Chain */}
            <div className="bg-navy-700/50 border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-3 rounded-xl">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Off-Chain (Secure Storage)</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Encrypted, access-controlled storage for sensitive medical documents.
              </p>
              <ul className="space-y-2">
                {[
                  { icon: FileText, text: 'Actual medical documents' },
                  { icon: Eye, text: 'Diagnostic images and scans' },
                  { icon: Stethoscope, text: 'Detailed clinical notes' },
                  { icon: FlaskConical, text: 'Full laboratory reports' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <item.icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200">
              <strong>Demonstration Notice:</strong> This is a college project prototype. Blockchain
              transactions, encryption, and record sharing are simulated for demonstration purposes.
              No real patient data is stored or transmitted.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white">See It In Action</h2>
          <p className="mt-3 text-gray-400">
            Explore the patient dashboard and medical records to see how it all comes together.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="gradient-purple text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              View Patient Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/blockchain"
              className="bg-white/5 border border-accent-400/30 text-accent-200 px-8 py-3 rounded-xl font-semibold hover:bg-accent-400/10 transition-all"
            >
              Try Blockchain Verification
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
