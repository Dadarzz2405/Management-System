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
  Building2, 
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

// Mock data
const mockDivisions = [
  {
    id: 1,
    name: 'Pengurus Inti',
    description: 'Pengurus inti yang mengkoordinasi seluruh kegiatan Rohis',
    memberCount: 5,
    color: 'bg-purple-500',
  },
  {
    id: 2,
    name: 'Dakwah',
    description: 'Divisi yang bertanggung jawab atas kegiatan dakwah dan kajian',
    memberCount: 12,
    color: 'bg-green-500',
  },
  {
    id: 3,
    name: 'Keputrian',
    description: 'Divisi khusus untuk kegiatan dan pembinaan anggota putri',
    memberCount: 15,
    color: 'bg-pink-500',
  },
  {
    id: 4,
    name: 'Humas',
    description: 'Divisi hubungan masyarakat dan publikasi kegiatan',
    memberCount: 8,
    color: 'bg-blue-500',
  },
  {
    id: 5,
    name: 'Pembina',
    description: 'Guru pembina yang membimbing kegiatan Rohis',
    memberCount: 3,
    color: 'bg-amber-500',
  },
];

export default function Divisions() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Divisi</h1>
            <p className="text-muted-foreground">
              Kelola divisi dan struktur organisasi Rohis
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Divisi
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah Divisi Baru</DialogTitle>
                <DialogDescription>
                  Isi detail divisi di bawah ini.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Divisi</Label>
                  <Input id="name" placeholder="Masukkan nama divisi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea id="description" placeholder="Deskripsi divisi" />
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
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Building2 className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{mockDivisions.length}</p>
                  <p className="text-muted-foreground">Total Divisi</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold">
                    {mockDivisions.reduce((sum, d) => sum + d.memberCount, 0)}
                  </p>
                  <p className="text-muted-foreground">Total Anggota</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Divisions Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockDivisions.map((division) => (
            <Card key={division.id} className="overflow-hidden">
              <div className={`h-2 ${division.color}`} />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${division.color}`} />
                      {division.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {division.description}
                    </CardDescription>
                  </div>
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{division.memberCount}</span>
                  <span className="text-muted-foreground">anggota</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
