import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, ClipboardCheck, TrendingUp, Clock, Building2 } from 'lucide-react';

// Mock data - will be replaced with API calls
const mockStats = {
  totalMembers: 45,
  totalSessions: 12,
  upcomingSessions: 3,
  attendanceRate: 87,
  totalDivisions: 4,
};

const upcomingEvents = [
  { id: 1, title: 'Kajian Rutin Jumat', date: '2024-01-19', time: '13:00', location: 'Musholla' },
  { id: 2, title: 'Rapat Koordinasi', date: '2024-01-21', time: '15:30', location: 'Ruang Rapat' },
  { id: 3, title: 'Mentoring Kelompok A', date: '2024-01-22', time: '10:00', location: 'Aula' },
];

const recentAttendance = [
  { id: 1, name: 'Ahmad Fadli', session: 'Kajian Rutin', status: 'hadir', date: '2024-01-15' },
  { id: 2, name: 'Siti Nurhaliza', session: 'Kajian Rutin', status: 'hadir', date: '2024-01-15' },
  { id: 3, name: 'Muhammad Rizki', session: 'Kajian Rutin', status: 'izin', date: '2024-01-15' },
  { id: 4, name: 'Fatimah Zahra', session: 'Kajian Rutin', status: 'hadir', date: '2024-01-15' },
];

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  subtitle,
  trend,
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string | number; 
  subtitle?: string;
  trend?: string;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className="text-sm text-primary flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'hadir':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'izin':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'sakit':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'alpha':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'pembina' || user?.role === 'ketua';

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Assalamu'alaikum, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Selamat datang di Rohis Management System
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            label="Total Anggota"
            value={mockStats.totalMembers}
            subtitle="Anggota aktif"
          />
          <StatCard
            icon={Calendar}
            label="Total Kegiatan"
            value={mockStats.totalSessions}
            subtitle="Bulan ini"
          />
          <StatCard
            icon={Clock}
            label="Kegiatan Mendatang"
            value={mockStats.upcomingSessions}
            subtitle="Minggu ini"
          />
          <StatCard
            icon={ClipboardCheck}
            label="Tingkat Kehadiran"
            value={`${mockStats.attendanceRate}%`}
            trend="+5% dari bulan lalu"
          />
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Kegiatan Mendatang
              </CardTitle>
              <CardDescription>
                Jadwal kegiatan yang akan datang
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <span className="text-xs font-medium">
                        {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'short' })}
                      </span>
                      <span className="text-lg font-bold">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.time} • {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Attendance (Admin only) */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                  Absensi Terbaru
                </CardTitle>
                <CardDescription>
                  Catatan kehadiran terakhir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAttendance.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{record.name}</p>
                          <p className="text-xs text-muted-foreground">{record.session}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats for Members */}
          {!isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Statistik Anda
                </CardTitle>
                <CardDescription>
                  Ringkasan kehadiran Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">10</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Hadir</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Izin</p>
                  </div>
                  <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">Sakit</p>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">0</p>
                    <p className="text-sm text-red-700 dark:text-red-300">Alpha</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
