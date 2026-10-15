import { Link } from 'react-router-dom';
import {
  Fingerprint,
  ArrowRight,
  ShieldCheck,
  Boxes,
  Hospital,
  FlaskConical,
  Pill,
  FileWarning,
  Repeat,
  ClipboardList,
  Network,
  Lock,
  Siren,
  ArrowDown,
  Check,
  Database,
  Share2,
  KeyRound,
  Activity,
} from 'lucide-react';

const problems = [
  {
    icon: FileWarning,
    title: 'Fragmented Medical Records',
    description: 'Patient records are scattered across different hospitals and clinics, making it hard to get a complete health picture.',
  },
  {
    icon: Repeat,
    title: 'Repeated Medical Tests',
    description: 'Patients undergo the same tests multiple times at different facilities, leading to unnecessary costs and delays.',
  },
  {
    icon: ClipboardList,
    title: 'Incomplete Medical History',
    description: 'Doctors often lack access to a patient\u2019s full medical history, increasing the risk of misdiagnosis.',
  },
  {
    icon: Network,
    title: 'Poor Interoperability',
    description: 'Different healthcare systems cannot exchange data, creating silos that block continuity of care.',
  },
  {
    icon: Lock,
    title: 'Privacy and Access Risks',
    description: 'Sensitive medical data is often stored insecurely, with no patient control over who accesses it.',
  },
  {
    icon: Siren,
    title: 'Emergency Information Gaps',
    description: 'In emergencies, doctors lack immediate access to critical patient information like blood group or allergies.',
  },
];

const solutions = [
  {
    icon: Fingerprint,
    title: 'Single Digital Identity',
    description: 'Every patient receives a unique Health ID that links all their medical records across providers.',
  },
  {
    icon: Share2,
    title: 'Seamless Record Sharing',
    description: 'Patients can grant time-limited access to specific record categories for any authorized provider.',
  },
  {
    icon: Boxes,
    title: 'Blockchain Verification',
    description: 'Record hashes and audit entries are stored on a blockchain, ensuring tamper-evident verification.',
  },
  {
    icon: ShieldCheck,
    title: 'Patient-Controlled Privacy',
    description: 'Patients decide who sees what, with granular consent management and revocable access.',
  },
  {
    icon: KeyRound,
    title: 'Off-Chain Secure Storage',
    description: 'Medical documents are stored securely off-chain, while only hashes and metadata live on the blockchain.',
  },
  {
    icon: Activity,
    title: 'Complete Audit Trail',
    description: 'Every access, verification, and record event is logged, providing a full history of data interactions.',
  },
];

const networkNodes = [
  { icon: Hospital, label: 'Hospitals', color: 'from-accent-400 to-accent-600' },
  { icon: FlaskConical, label: 'Laboratories', color: 'from-cyan-400 to-accent-500' },
  { icon: Pill, label: 'Pharmacies', color: 'from-blue-400 to-accent-600' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy-800">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-accent-400/10 border border-accent-400/30 text-accent-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <ShieldCheck className="w-4 h-4" />
                Blockchain-Secured Healthcare Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Health Records.
                <br />
                <span className="gradient-text">One Secure Identity.</span>
              </h1>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-xl">
                Connecting hospitals, laboratories, and pharmacies through blockchain technology for
                secure, reliable, and seamless healthcare.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="gradient-purple text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="bg-white/5 border border-accent-400/30 text-accent-200 px-8 py-3.5 rounded-xl font-semibold hover:bg-accent-400/10 transition-all flex items-center justify-center gap-2"
                >
                  Explore How It Works
                  <ArrowDown className="w-5 h-5" />
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                {[
                  { value: '24', label: 'Medical Records' },
                  { value: '7', label: 'Healthcare Providers' },
                  { value: '100%', label: 'Blockchain Verified' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Network Illustration */}
            <div className="relative animate-fade-in">
              <div className="relative bg-navy-700/50 rounded-3xl p-8 border border-accent-400/20 card-glow">
                {/* Central patient node */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent-400/30 rounded-full blur-xl animate-glow" />
                    <div className="relative bg-gradient-to-br from-accent-400 to-accent-600 p-5 rounded-full shadow-2xl">
                      <Fingerprint className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-white font-semibold">Patient Digital Identity</p>
                    <p className="text-xs text-accent-200">HC-2024-008374</p>
                  </div>
                </div>

                {/* Connection lines */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {networkNodes.map((node, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="relative w-full flex justify-center">
                        {/* Connection line */}
                        <div className="absolute top-1/2 left-1/2 w-px h-8 bg-gradient-to-b from-accent-400/50 to-transparent -translate-x-1/2 -translate-y-full" />
                        <div className={`bg-gradient-to-br ${node.color} p-3 rounded-xl shadow-lg animate-float`} style={{ animationDelay: `${i * 0.5}s` }}>
                          <node.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-400 text-center">{node.label}</p>
                    </div>
                  ))}
                </div>

                {/* Blockchain layer */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Boxes className="w-4 h-4 text-accent-400" />
                    <span className="text-xs text-gray-400 font-medium">Blockchain Verification Layer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-navy-600 border border-accent-400/20 rounded-lg flex items-center justify-center">
                          <Database className="w-4 h-4 text-accent-300" />
                        </div>
                        {n < 4 && <div className="w-4 h-px bg-accent-400/40" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FileWarning className="w-4 h-4" />
              The Problem
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Challenges in Healthcare Today
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              The current healthcare system suffers from fragmented records, poor data sharing, and
              inadequate patient privacy controls.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="group bg-navy-800 border border-white/5 rounded-2xl p-6 hover:border-red-500/30 transition-all hover:shadow-xl"
              >
                <div className="bg-red-500/10 p-3 rounded-xl w-fit group-hover:bg-red-500/20 transition">
                  <problem.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{problem.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent-400/10 border border-accent-400/30 text-accent-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <ShieldCheck className="w-4 h-4" />
              The Solution
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              How <span className="gradient-text">HealthChain</span> Solves These Problems
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              A unified platform built on blockchain technology, giving patients full control over
              their healthcare data.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-navy-700 to-navy-800 border border-accent-400/20 rounded-2xl p-6 hover:border-accent-400/40 transition-all hover:shadow-xl hover:shadow-accent-400/10"
              >
                <div className="bg-gradient-to-br from-accent-400 to-accent-600 p-3 rounded-xl w-fit group-hover:scale-110 transition">
                  <solution.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{solution.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>

          {/* Architecture note */}
          <div className="mt-12 bg-navy-700/50 border border-accent-400/20 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-3 rounded-xl flex-shrink-0">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Hybrid Architecture: On-Chain + Off-Chain</h3>
                <p className="mt-2 text-gray-400 leading-relaxed">
                  HealthChain uses a hybrid storage model. Blockchain stores only record hashes,
                  consent records, and audit proofs — never actual medical documents. Medical files
                  are stored securely off-chain in encrypted storage. This ensures patient privacy
                  while providing tamper-evident verification.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {['Record Hashes', 'Consent Records', 'Audit Proofs', 'Access Logs'].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 bg-accent-400/10 text-accent-200 px-3 py-1.5 rounded-lg text-xs font-medium border border-accent-400/20">
                      <Check className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Experience the Future of Healthcare?
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Explore the patient dashboard, browse medical records, verify records on the blockchain,
            and manage your healthcare data — all in one place.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="gradient-purple text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              View Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="bg-white/5 border border-accent-400/30 text-accent-200 px-8 py-3.5 rounded-xl font-semibold hover:bg-accent-400/10 transition-all"
            >
              Try Demo Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
