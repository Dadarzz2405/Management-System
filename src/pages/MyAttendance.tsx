import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  TrendingUp
} from 'lucide-react';

// Mock data for member's own attendance history
const mockMyAttendance = [
  { id: 1, session: 'Kajian Rutin Jumat', date: '2024-01-19', status: 'hadir', notes: '' },
  { id: 2, session: 'Kajian Ahad Pagi', date: '2024-01-14', status: 'hadir', notes: '' },
  { id: 3, session: 'Rapat Koordinasi', date: '2024-01-12', status: 'izin', notes: 'Ada acara keluarga' },
  { id: 4, session: 'Buka Puasa Bersama', date: '2024-01-10', status: 'hadir', notes: '' },
  { id: 5, session: 'Kajian Rutin Jumat', date: '2024-01-05', status: 'hadir', notes: '' },
  { id: 6, session: 'Mentoring Kelompok', date: '2024-01-03', status: 'sakit', notes: 'Demam' },
  { id: 7, session: 'Kajian Ahad Pagi', date: '2023-12-31', status: 'hadir', notes: '' },
  { id: 8, session: 'Kajian Rutin Jumat', date: '2023-12-29', status: 'hadir', notes: '' },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'hadir':
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    case 'izin':
      return <Clock className="h-5 w-5 text-blue-600" />;
    case 'sakit':
      return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    case 'alpha':
      return <XCircle className="h-5 w-5 text-red-600" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
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

export default function MyAttendance() {
  const stats = {
    hadir: mockMyAttendance.filter((a) => a.status === 'hadir').length,
    izin: mockMyAttendance.filter((a) => a.status === 'izin').length,
    sakit: mockMyAttendance.filter((a) => a.status === 'sakit').length,
    alpha: mockMyAttendance.filter((a) => a.status === 'alpha').length,
    total: mockMyAttendance.length,
  };

  const attendanceRate = Math.round((stats.hadir / stats.total) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Riwayat Absensi</h1>
          <p className="text-muted-foreground">
            Lihat catatan kehadiran Anda di berbagai kegiatan
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="md:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{attendanceRate}%</p>
                  <p className="text-sm text-muted-foreground">Kehadiran</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.hadir}</p>
                  <p className="text-sm text-muted-foreground">Hadir</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.izin}</p>
                  <p className="text-sm text-muted-foreground">Izin</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.sakit}</p>
                  <p className="text-sm text-muted-foreground">Sakit</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <XCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.alpha}</p>
                  <p className="text-sm text-muted-foreground">Alpha</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Riwayat Kehadiran
            </CardTitle>
            <CardDescription>
              Catatan kehadiran Anda di setiap kegiatan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kegiatan</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Keterangan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMyAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.session}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(record.date).toLocaleDateString('id-ID', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(record.status)}`}>
                            {record.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {record.notes || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
