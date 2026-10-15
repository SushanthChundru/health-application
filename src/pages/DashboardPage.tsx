import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Share2,
  KeyRound,
  Boxes,
  Droplet,
  Calendar,
  FlaskConical,
  Pill,
  Activity,
  User,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Clock,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import { useApp } from '@/context/AppContext';
import {
  mockPatient,
  mockRecords,
  mockAppointments,
  mockActivities,
  mockCurrentPrescriptions,
} from '@/data/mockData';

export default function DashboardPage() {
  const { user, showToast } = useApp();
  const recentRecords = mockRecords.slice(0, 4);
  const upcomingAppointments = mockAppointments.filter((a) => a.status === 'Upcoming');
  const recentLabs = mockRecords.filter((r) => r.category === 'Laboratory Reports').slice(0, 3);

  const quickActions = [
    { label: 'View Medical Records', icon: FileText, path: '/records', color: 'from-accent-400 to-accent-600' },
    { label: 'Share Records', icon: Share2, path: '/access', color: 'from-cyan-400 to-accent-500' },
    { label: 'Manage Access', icon: KeyRound, path: '/access', color: 'from-purple-400 to-purple-600' },
    { label: 'Blockchain Verification', icon: Boxes, path: '/blockchain', color: 'from-teal-400 to-accent-500' },
  ];

  return (
    <div className="min-h-screen bg-navy-800">
      <PageHeader
        title="Patient Dashboard"
        subtitle="Your complete healthcare overview — records, appointments, prescriptions, and activity, all in one place."
        icon={<LayoutDashboard className="w-8 h-8 text-white" />}
      >
        {/* Demo notice */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-center gap-2 text-sm text-amber-200">
          <Clock className="w-4 h-4 flex-shrink-0" />
          Showing fictional sample patient data for demonstration purposes.
          {!user && (
            <Link to="/login" className="underline font-medium hover:text-amber-100">
              Login for personalized view
            </Link>
          )}
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Patient Profile Card */}
        <div className="bg-gradient-to-br from-navy-700 to-navy-800 border border-accent-400/20 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-400/30 rounded-full blur-lg" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {mockPatient.name.charAt(0)}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{mockPatient.name}</h2>
                <p className="text-sm text-accent-200 font-medium">Health ID: {mockPatient.healthId}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Droplet className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-gray-400">Blood Group: {mockPatient.bloodGroup}</span>
                </div>
              </div>
            </div>

            {/* Profile details */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: User, label: 'Age', value: `${mockPatient.age} years` },
                { icon: User, label: 'Gender', value: mockPatient.gender },
                { icon: Phone, label: 'Phone', value: mockPatient.phone },
                { icon: Mail, label: 'Email', value: mockPatient.email },
              ].map((item, i) => (
                <div key={i} className="bg-navy-600/50 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <item.icon className="w-3 h-3" />
                    {item.label}
                  </div>
                  <p className="text-sm text-white font-medium truncate">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              {mockPatient.address}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Records', value: mockPatient.totalRecords, icon: FileText, color: 'text-accent-400' },
            { label: 'Upcoming Appointments', value: upcomingAppointments.length, icon: Calendar, color: 'text-green-400' },
            { label: 'Lab Reports', value: recentLabs.length, icon: FlaskConical, color: 'text-cyan-400' },
            { label: 'Active Prescriptions', value: mockCurrentPrescriptions.length, icon: Pill, color: 'text-purple-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-navy-700/50 border border-white/5 rounded-xl p-4 hover:border-accent-400/30 transition">
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              to={action.path}
              onClick={() => showToast(`Navigating to ${action.label}...`, 'info')}
              className="group bg-navy-700/50 border border-white/5 rounded-xl p-4 hover:border-accent-400/30 transition-all hover:shadow-lg"
            >
              <div className={`bg-gradient-to-br ${action.color} p-2.5 rounded-lg w-fit group-hover:scale-110 transition`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <p className="mt-3 text-sm font-medium text-white">{action.label}</p>
              <ArrowRight className="w-4 h-4 text-gray-500 mt-2 group-hover:text-accent-400 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* Recent Records + Appointments */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Records */}
          <div className="bg-navy-700/50 border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Recent Medical Visits</h3>
              <Link to="/records" className="text-sm text-accent-200 hover:text-accent-100 flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentRecords.map((record) => (
                <div key={record.id} className="bg-navy-600/50 rounded-xl p-4 hover:bg-navy-600/80 transition cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{record.diagnosisOrTest}</p>
                      <p className="text-xs text-gray-500 mt-1">{record.providerName} • {record.doctorName}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{record.date}</p>
                    </div>
                    <StatusBadge status={record.verificationStatus} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-navy-700/50 border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Upcoming Appointments</h3>
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="bg-navy-600/50 rounded-xl p-4 border-l-4 border-accent-400/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{apt.reason}</p>
                      <p className="text-xs text-gray-400 mt-1">{apt.doctorName}</p>
                      <p className="text-xs text-gray-500">{apt.hospitalName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-accent-200">{apt.date}</p>
                      <p className="text-xs text-gray-500">{apt.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lab Reports + Prescriptions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Lab Reports */}
          <div className="bg-navy-700/50 border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Recent Laboratory Reports</h3>
            <div className="space-y-3">
              {recentLabs.map((lab) => (
                <div key={lab.id} className="flex items-center gap-3 bg-navy-600/50 rounded-xl p-4">
                  <div className="bg-cyan-500/20 p-2 rounded-lg">
                    <FlaskConical className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{lab.diagnosisOrTest}</p>
                    <p className="text-xs text-gray-500">{lab.providerName} • {lab.date}</p>
                  </div>
                  <StatusBadge status={lab.verificationStatus} />
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptions */}
          <div className="bg-navy-700/50 border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Current Prescriptions</h3>
            <div className="space-y-3">
              {mockCurrentPrescriptions.map((presc) => (
                <div key={presc.id} className="flex items-center gap-3 bg-navy-600/50 rounded-xl p-4">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Pill className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{presc.diagnosisOrTest}</p>
                    <p className="text-xs text-gray-500">{presc.doctorName} • {presc.date}</p>
                  </div>
                  <StatusBadge status={presc.verificationStatus} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-navy-700/50 border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Healthcare Activity</h3>
          <div className="space-y-3">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4">
                <div className="bg-accent-400/10 p-2.5 rounded-lg">
                  <activity.icon className="w-4 h-4 text-accent-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(activity.timestamp).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
                <Activity className="w-4 h-4 text-gray-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
