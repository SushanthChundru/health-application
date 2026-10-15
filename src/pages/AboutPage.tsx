import {
  Info,
  Target,
  ShieldCheck,
  Boxes,
  Database,
  Lock,
  Fingerprint,
  Stethoscope,
  FlaskConical,
  Pill,
  Hospital,
  Network,
  Code,
  GraduationCap,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-navy-800">
      <PageHeader
        title="About the Project"
        subtitle="Blockchain-Based Healthcare Identity and Medical Records System — a college project prototype demonstrating how blockchain can transform healthcare data management."
        icon={<Info className="w-8 h-8 text-white" />}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Overview */}
        <section className="bg-navy-700/50 border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-accent-400 to-accent-600 p-3 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Project Overview</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">
            HealthChain is a blockchain-based healthcare platform that allows patients to securely
            access and share their medical records across multiple hospitals, laboratories, and
            pharmacies using a single digital healthcare identity. The system addresses critical
            healthcare challenges including fragmented medical records, repeated medical tests,
            unnecessary healthcare expenses, treatment delays, incomplete medical histories, and
            medical record fraud — all while protecting patient privacy and data security.
          </p>
        </section>

        {/* Objectives */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-accent-400" />
            Project Objectives
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Reduce repeated medical tests by enabling cross-provider record access',
              'Eliminate incomplete medical histories through a unified patient profile',
              'Prevent medical record fraud using blockchain-based verification',
              'Protect patient privacy with granular access control and consent management',
              'Enable seamless interoperability between hospitals, labs, and pharmacies',
              'Provide emergency access to critical patient information when needed',
              'Reduce healthcare costs and treatment delays',
              'Create a tamper-evident audit trail for all record access events',
            ].map((obj, i) => (
              <div key={i} className="bg-navy-700/50 border border-white/5 rounded-xl p-5 flex items-start gap-3">
                <div className="bg-accent-400/20 text-accent-300 w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-300">{obj}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Network className="w-6 h-6 text-accent-400" />
            System Architecture
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-navy-700/50 border border-accent-400/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-accent-400 to-accent-600 p-2.5 rounded-lg">
                  <Boxes className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">On-Chain Layer</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" /> Record hashes for tamper detection</li>
                <li className="flex items-start gap-2"><Lock className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" /> Consent and access control records</li>
                <li className="flex items-start gap-2"><Fingerprint className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" /> Identity verification proofs</li>
                <li className="flex items-start gap-2"><Database className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" /> Audit log entries for all access events</li>
              </ul>
            </div>
            <div className="bg-navy-700/50 border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-2.5 rounded-lg">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Off-Chain Layer</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" /> Encrypted medical document storage</li>
                <li className="flex items-start gap-2"><Stethoscope className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" /> Clinical notes and detailed records</li>
                <li className="flex items-start gap-2"><FlaskConical className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" /> Laboratory reports and diagnostic images</li>
                <li className="flex items-start gap-2"><Pill className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" /> Prescription and medication details</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stakeholders */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Hospital className="w-6 h-6 text-accent-400" />
            Key Stakeholders
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Fingerprint, title: 'Patients', desc: 'Own and control their medical data with a single digital identity' },
              { icon: Hospital, title: 'Hospitals', desc: 'Create and access patient records for consultations and treatments' },
              { icon: Stethoscope, title: 'Doctors', desc: 'View patient history and add diagnoses, prescriptions, and treatment plans' },
              { icon: FlaskConical, title: 'Laboratories', desc: 'Upload test reports and diagnostic results linked to patient identity' },
              { icon: Pill, title: 'Pharmacies', desc: 'Record dispensed prescriptions and medication-related information' },
              { icon: ShieldCheck, title: 'System Administrators', desc: 'Manage provider verification and system-level configuration' },
            ].map((s, i) => (
              <div key={i} className="bg-navy-700/50 border border-white/5 rounded-xl p-5 hover:border-accent-400/30 transition">
                <div className="bg-gradient-to-br from-accent-400 to-accent-600 p-2.5 rounded-lg w-fit mb-3">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Code className="w-6 h-6 text-accent-400" />
            Technology Stack
          </h2>
          <div className="bg-navy-700/50 border border-white/5 rounded-2xl p-6">
            <div className="flex flex-wrap gap-3">
              {['React', 'TypeScript', 'Tailwind CSS', 'Lucide React', 'React Router', 'Blockchain (Simulated)', 'Supabase (Available)', 'Vite'].map((tech) => (
                <span
                  key={tech}
                  className="bg-accent-400/10 text-accent-200 px-4 py-2 rounded-lg text-sm font-medium border border-accent-400/20"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white mb-3">Service Layer Architecture</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                The application is built with a clean service layer that abstracts data operations
                (authentication, records, blockchain verification, and access control). Currently,
                all services use mock data and simulated blockchain operations. The service layer
                is designed to be connected to a real backend (Supabase), secure document storage,
                and a blockchain network (e.g., Ethereum, Hyperledger) with minimal changes.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="bg-amber-500/20 p-3 rounded-xl flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">College Project Disclaimer</h3>
              <p className="mt-2 text-sm text-amber-200 leading-relaxed">
                This is a college project prototype created for educational purposes. All patient
                data shown is fictional. Blockchain transactions, encryption, authentication, and
                medical record sharing are simulated for demonstration. No real patient medical
                documents or sensitive personal data are stored on any blockchain. In a production
                system, real cryptographic operations, secure authentication, and a live blockchain
                network would be used.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
