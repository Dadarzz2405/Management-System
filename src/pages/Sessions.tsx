import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Edit, 
  Trash2,
  Users,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

// Mock data
const mockSessions = [
  {
    id: 1,
    title: 'Kajian Rutin Jumat',
    description: 'Kajian mingguan membahas fiqih ibadah',
    date: '2024-01-19',
    time: '13:00',
    location: 'Musholla',
    attendees: 35,
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Rapat Koordinasi',
    description: 'Rapat koordinasi pengurus untuk kegiatan bulan depan',
    date: '2024-01-21',
    time: '15:30',
    location: 'Ruang Rapat',
    attendees: 12,
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Mentoring Kelompok A',
    description: 'Sesi mentoring untuk kelompok A',
    date: '2024-01-22',
    time: '10:00',
    location: 'Aula',
    attendees: 8,
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Kajian Ahad Pagi',
    description: 'Kajian rutin ahad pagi tentang akhlak',
    date: '2024-01-14',
    time: '08:00',
    location: 'Musholla',
    attendees: 42,
    status: 'completed',
  },
  {
    id: 5,
    title: 'Buka Puasa Bersama',
    description: 'Acara buka puasa bersama anggota Rohis',
    date: '2024-01-10',
    time: '17:30',
    location: 'Halaman Sekolah',
    attendees: 50,
    status: 'completed',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'ongoing':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'completed':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'Akan Datang';
    case 'ongoing':
      return 'Berlangsung';
    case 'completed':
      return 'Selesai';
    default:
      return status;
  }
};

export default function Sessions() {
  const { user } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const isAdmin = user?.role === 'admin' || user?.role === 'pembina' || user?.role === 'ketua';

  const upcomingSessions = mockSessions.filter((s) => s.status === 'upcoming');
  const pastSessions = mockSessions.filter((s) => s.status === 'completed');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kegiatan</h1>
            <p className="text-muted-foreground">
              {isAdmin ? 'Kelola jadwal kegiatan Rohis' : 'Lihat jadwal kegiatan Rohis'}
            </p>
          </div>
          {isAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Kegiatan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Tambah Kegiatan Baru</DialogTitle>
                  <DialogDescription>
                    Isi detail kegiatan di bawah ini.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Kegiatan</Label>
                    <Input id="title" placeholder="Masukkan judul kegiatan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea id="description" placeholder="Deskripsi kegiatan" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Tanggal</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Waktu</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input id="location" placeholder="Lokasi kegiatan" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Simpan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Upcoming Sessions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Kegiatan Mendatang</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="overflow-hidden">
                <div className="h-2 bg-primary" />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {session.description}
                      </CardDescription>
                    </div>
                    {isAdmin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="-mr-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(session.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{session.time} WIB</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{session.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium">{session.attendees} peserta</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(session.status)}`}>
                      {getStatusLabel(session.status)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Sessions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Kegiatan Selesai</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastSessions.map((session) => (
              <Card key={session.id} className="opacity-75 hover:opacity-100 transition-opacity">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {session.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(session.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{session.attendees} peserta</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(session.status)}`}>
                      {getStatusLabel(session.status)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
