import { Link } from 'react-router-dom';
import { Fingerprint, Github, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300 border-t border-accent-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-accent-400 to-accent-600 p-2 rounded-lg">
                <Fingerprint className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Health<span className="gradient-text">Chain</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A blockchain-based healthcare identity and medical records system connecting
              hospitals, laboratories, and pharmacies through a single secure digital identity.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="bg-white/5 hover:bg-accent-400/20 p-2 rounded-lg transition">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/5 hover:bg-accent-400/20 p-2 rounded-lg transition">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/5 hover:bg-accent-400/20 p-2 rounded-lg transition">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Project Objectives */}
          <div>
            <h4 className="text-white font-semibold mb-4">Project Objectives</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Reduce repeated medical tests</li>
              <li>Enable seamless record sharing</li>
              <li>Prevent medical record fraud</li>
              <li>Protect patient privacy and data</li>
              <li>Provide emergency access to critical data</li>
            </ul>
          </div>

          {/* Privacy & Security */}
          <div>
            <h4 className="text-white font-semibold mb-4">Privacy and Security</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/access" className="hover:text-accent-200 transition">
                  Access Control
                </Link>
              </li>
              <li>
                <Link to="/blockchain" className="hover:text-accent-200 transition">
                  Blockchain Verification
                </Link>
              </li>
              <li>Off-chain medical document storage</li>
              <li>Patient-controlled consent management</li>
              <li>Audit logging for all access events</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-400" />
                healthchain@project.edu
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-400" />
                +91 80 2345 6789
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-400" />
                Bengaluru, Karnataka, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2024 HealthChain — Blockchain-Based Healthcare Identity and Medical Records System.
          </p>
          <p className="text-xs text-gray-600">
            College Project Prototype — All data shown is fictional. Blockchain, authentication, and
            record sharing are simulated for demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
