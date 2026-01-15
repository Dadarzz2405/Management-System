import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ClipboardCheck, 
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Download
} from 'lucide-react';

// Mock data
const mockSessions = [
  { id: 1, title: 'Kajian Rutin Jumat - 19 Jan 2024', date: '2024-01-19' },
  { id: 2, title: 'Kajian Ahad Pagi - 14 Jan 2024', date: '2024-01-14' },
  { id: 3, title: 'Buka Puasa Bersama - 10 Jan 2024', date: '2024-01-10' },
];

const mockAttendance = [
  { id: 1, name: 'Ahmad Fadli', division: 'Dakwah', status: 'hadir' },
  { id: 2, name: 'Siti Nurhaliza', division: 'Keputrian', status: 'hadir' },
  { id: 3, name: 'Muhammad Rizki', division: 'Pengurus Inti', status: 'izin' },
  { id: 4, name: 'Fatimah Zahra', division: 'Humas', status: 'hadir' },
  { id: 5, name: 'Umar Hakim', division: 'Pembina', status: 'hadir' },
  { id: 6, name: 'Aisyah Rahmah', division: 'Dakwah', status: 'sakit' },
  { id: 7, name: 'Ibrahim Malik', division: 'Dakwah', status: 'hadir' },
  { id: 8, name: 'Khadijah Putri', division: 'Keputrian', status: 'alpha' },
];

const statusOptions = [
  { value: 'hadir', label: 'Hadir', icon: CheckCircle2, color: 'text-green-600' },
  { value: 'izin', label: 'Izin', icon: Clock, color: 'text-blue-600' },
  { value: 'sakit', label: 'Sakit', icon: AlertCircle, color: 'text-yellow-600' },
  { value: 'alpha', label: 'Alpha', icon: XCircle, color: 'text-red-600' },
];

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

export default function Attendance() {
  const [selectedSession, setSelectedSession] = useState<string>('1');
  const [attendanceData, setAttendanceData] = useState(mockAttendance);

  const handleStatusChange = (memberId: number, newStatus: string) => {
    setAttendanceData((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, status: newStatus } : member
      )
    );
  };

  const stats = {
    hadir: attendanceData.filter((a) => a.status === 'hadir').length,
    izin: attendanceData.filter((a) => a.status === 'izin').length,
    sakit: attendanceData.filter((a) => a.status === 'sakit').length,
    alpha: attendanceData.filter((a) => a.status === 'alpha').length,
  };

  const attendanceRate = Math.round((stats.hadir / attendanceData.length) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Absensi</h1>
            <p className="text-muted-foreground">
              Kelola absensi kegiatan Rohis
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Session Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Pilih Kegiatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedSession} onValueChange={setSelectedSession}>
              <SelectTrigger className="w-full sm:w-96">
                <SelectValue placeholder="Pilih kegiatan" />
              </SelectTrigger>
              <SelectContent>
                {mockSessions.map((session) => (
                  <SelectItem key={session.id} value={session.id.toString()}>
                    {session.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{attendanceRate}%</p>
                  <p className="text-sm text-muted-foreground">Kehadiran</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {statusOptions.map((option) => (
            <Card key={option.value}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted`}>
                    <option.icon className={`h-5 w-5 ${option.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats[option.value as keyof typeof stats]}</p>
                    <p className="text-sm text-muted-foreground">{option.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Absensi</CardTitle>
            <CardDescription>
              Klik pada status untuk mengubah kehadiran
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Divisi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ubah Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((member, index) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell className="text-muted-foreground">{member.division}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(member.status)}`}>
                          {member.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={member.status}
                          onValueChange={(value) => handleStatusChange(member.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center gap-2">
                                  <option.icon className={`h-4 w-4 ${option.color}`} />
                                  {option.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
