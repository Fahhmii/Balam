"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import ProtectedRoute from "@/components/auth/protected-route"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Eye, Plus, Search, User } from "lucide-react"

export default function AdminRekrutmenPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    description: "",
    requirements: "",
    salary: "",
    closingDate: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Job listings with Indonesian locations
  const jobListings = [
    {
      id: 1,
      title: "Staff Administrasi",
      department: "Administrasi",
      location: "Pekanbaru, Riau",
      type: "Full-time",
      postedDate: "10/05/2025",
      closingDate: "10/06/2025",
      applicants: 8,
      status: "Aktif",
      statusClass: "bg-green-100 text-green-800",
      description:
        "PT Balam Berlian Sawit membutuhkan Staff Administrasi untuk mengelola dokumen dan administrasi perusahaan.",
      requirements:
        "Pendidikan minimal D3/S1 jurusan Administrasi Bisnis atau setara. Pengalaman minimal 1 tahun di bidang administrasi.",
      salary: "Rp 4.500.000 - Rp 6.000.000",
    },
    {
      id: 2,
      title: "Supervisor Produksi",
      department: "Produksi",
      location: "Dumai, Riau",
      type: "Full-time",
      postedDate: "05/05/2025",
      closingDate: "05/06/2025",
      applicants: 5,
      status: "Aktif",
      statusClass: "bg-green-100 text-green-800",
      description:
        "PT Balam Berlian Sawit membutuhkan Supervisor Produksi untuk mengawasi proses produksi di pabrik kelapa sawit.",
      requirements:
        "Pendidikan minimal S1 Teknik Industri atau setara. Pengalaman minimal 3 tahun di bidang produksi kelapa sawit.",
      salary: "Rp 7.000.000 - Rp 9.000.000",
    },
    {
      id: 3,
      title: "Staff Keuangan",
      department: "Keuangan",
      location: "Pekanbaru, Riau",
      type: "Full-time",
      postedDate: "01/05/2025",
      closingDate: "01/06/2025",
      applicants: 12,
      status: "Aktif",
      statusClass: "bg-green-100 text-green-800",
      description: "PT Balam Berlian Sawit membutuhkan Staff Keuangan untuk mengelola keuangan perusahaan.",
      requirements: "Pendidikan minimal S1 Akuntansi. Pengalaman minimal 2 tahun di bidang keuangan atau akuntansi.",
      salary: "Rp 5.000.000 - Rp 7.000.000",
    },
    {
      id: 4,
      title: "Manajer HR",
      department: "HR",
      location: "Pekanbaru, Riau",
      type: "Full-time",
      postedDate: "15/04/2025",
      closingDate: "15/05/2025",
      applicants: 6,
      status: "Ditutup",
      statusClass: "bg-red-100 text-red-800",
      description: "PT Balam Berlian Sawit membutuhkan Manajer HR untuk mengelola sumber daya manusia perusahaan.",
      requirements:
        "Pendidikan minimal S1 Psikologi atau Manajemen SDM. Pengalaman minimal 5 tahun di bidang HR, dengan 2 tahun sebagai manajer.",
      salary: "Rp 12.000.000 - Rp 15.000.000",
    },
  ]

  // Applicants with Indonesian names
  const applicants = [
    {
      id: 1,
      jobId: 1,
      name: "Agus Setiawan",
      email: "agus.setiawan@gmail.com",
      phone: "081234567890",
      education: "S1 Administrasi Bisnis, Universitas Riau",
      experience: "2 tahun sebagai Staff Administrasi di PT Sawit Makmur",
      appliedDate: "12/05/2025",
      status: "Screening",
      statusClass: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 2,
      jobId: 1,
      name: "Rina Fitriani",
      email: "rina.fitriani@gmail.com",
      phone: "081234567891",
      education: "D3 Administrasi Bisnis, Politeknik Caltex Riau",
      experience: "1 tahun sebagai Admin di PT Indah Kiat",
      appliedDate: "13/05/2025",
      status: "Interview",
      statusClass: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      jobId: 2,
      name: "Hendra Gunawan",
      email: "hendra.gunawan@gmail.com",
      phone: "081234567892",
      education: "S1 Teknik Industri, Institut Teknologi Bandung",
      experience: "4 tahun sebagai Supervisor Produksi di PT Sinar Mas",
      appliedDate: "07/05/2025",
      status: "Interview",
      statusClass: "bg-blue-100 text-blue-800",
    },
    {
      id: 4,
      jobId: 3,
      name: "Maya Sari",
      email: "maya.sari@gmail.com",
      phone: "081234567893",
      education: "S1 Akuntansi, Universitas Indonesia",
      experience: "3 tahun sebagai Staff Keuangan di PT Bank Riau Kepri",
      appliedDate: "03/05/2025",
      status: "Ditolak",
      statusClass: "bg-red-100 text-red-800",
    },
    {
      id: 5,
      jobId: 3,
      name: "Dodi Pratama",
      email: "dodi.pratama@gmail.com",
      phone: "081234567894",
      education: "S1 Akuntansi, Universitas Riau",
      experience: "2 tahun sebagai Akuntan di KAP Tanubrata",
      appliedDate: "05/05/2025",
      status: "Diterima",
      statusClass: "bg-green-100 text-green-800",
    },
  ]

  const filteredJobs = jobListings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddJob = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Lowongan kerja berhasil ditambahkan",
        description: `Lowongan untuk posisi ${formData.title} telah dipublikasikan`,
      })

      setIsAddDialogOpen(false)
      // Reset form
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "",
        description: "",
        requirements: "",
        salary: "",
        closingDate: "",
      })
    } catch (error) {
      toast({
        title: "Gagal menambahkan lowongan kerja",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openViewDialog = (job) => {
    setSelectedJob(job)
    setIsViewDialogOpen(true)
  }

  const openApplicantDialog = (applicant) => {
    setSelectedApplicant(applicant)
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Rekrutmen</h1>
        </div>

        {/* Rest of the component remains the same */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Lowongan Kerja</CardTitle>
                <CardDescription>Kelola lowongan kerja PT Balam Berlian Sawit</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari lowongan..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      <span>Tambah Lowongan</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Tambah Lowongan Kerja</DialogTitle>
                      <DialogDescription>Isi form berikut untuk menambahkan lowongan kerja baru</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddJob} className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Judul Posisi</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="department">Departemen</Label>
                          <Select
                            value={formData.department}
                            onValueChange={(value) => setFormData({ ...formData, department: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih departemen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Administrasi">Administrasi</SelectItem>
                              <SelectItem value="Keuangan">Keuangan</SelectItem>
                              <SelectItem value="HR">HR</SelectItem>
                              <SelectItem value="Produksi">Produksi</SelectItem>
                              <SelectItem value="Operasional">Operasional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="location">Lokasi</Label>
                          <Select
                            value={formData.location}
                            onValueChange={(value) => setFormData({ ...formData, location: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih lokasi" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pekanbaru, Riau">Pekanbaru, Riau</SelectItem>
                              <SelectItem value="Dumai, Riau">Dumai, Riau</SelectItem>
                              <SelectItem value="Siak, Riau">Siak, Riau</SelectItem>
                              <SelectItem value="Bengkalis, Riau">Bengkalis, Riau</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="type">Tipe Pekerjaan</Label>
                          <Select
                            value={formData.type}
                            onValueChange={(value) => setFormData({ ...formData, type: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tipe" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-time">Full-time</SelectItem>
                              <SelectItem value="Part-time">Part-time</SelectItem>
                              <SelectItem value="Kontrak">Kontrak</SelectItem>
                              <SelectItem value="Magang">Magang</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Deskripsi Pekerjaan</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          required
                          rows={3}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="requirements">Persyaratan</Label>
                        <Textarea
                          id="requirements"
                          value={formData.requirements}
                          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                          required
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="salary">Kisaran Gaji</Label>
                          <Input
                            id="salary"
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            placeholder="Rp 5.000.000 - Rp 7.000.000"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="closingDate">Tanggal Penutupan</Label>
                          <Input
                            id="closingDate"
                            type="date"
                            value={formData.closingDate}
                            onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Batal
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Menyimpan..." : "Simpan"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="jobs">
              <TabsList>
                <TabsTrigger value="jobs">Lowongan Kerja</TabsTrigger>
                <TabsTrigger value="applicants">Pelamar</TabsTrigger>
              </TabsList>
              <TabsContent value="jobs" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Posisi</th>
                        <th className="text-left p-2">Departemen</th>
                        <th className="text-left p-2">Lokasi</th>
                        <th className="text-left p-2">Tipe</th>
                        <th className="text-left p-2">Tanggal Posting</th>
                        <th className="text-left p-2">Tanggal Tutup</th>
                        <th className="text-left p-2">Pelamar</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJobs.map((job) => (
                        <tr key={job.id} className="border-b">
                          <td className="p-2">{job.title}</td>
                          <td className="p-2">{job.department}</td>
                          <td className="p-2">{job.location}</td>
                          <td className="p-2">{job.type}</td>
                          <td className="p-2">{job.postedDate}</td>
                          <td className="p-2">{job.closingDate}</td>
                          <td className="p-2">{job.applicants}</td>
                          <td className="p-2">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${job.statusClass}`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => openViewDialog(job)}
                            >
                              <Eye className="h-3 w-3" />
                              <span>Detail</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="applicants" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Nama</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Posisi yang Dilamar</th>
                        <th className="text-left p-2">Tanggal Melamar</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicants.map((applicant) => {
                        const job = jobListings.find((j) => j.id === applicant.jobId)
                        return (
                          <tr key={applicant.id} className="border-b">
                            <td className="p-2">{applicant.name}</td>
                            <td className="p-2">{applicant.email}</td>
                            <td className="p-2">{job ? job.title : "Unknown"}</td>
                            <td className="p-2">{applicant.appliedDate}</td>
                            <td className="p-2">
                              <span className={`inline-block px-2 py-1 text-xs rounded-full ${applicant.statusClass}`}>
                                {applicant.status}
                              </span>
                            </td>
                            <td className="p-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                    onClick={() => openApplicantDialog(applicant)}
                                  >
                                    <User className="h-3 w-3" />
                                    <span>Profil</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Profil Pelamar</DialogTitle>
                                    <DialogDescription>Detail informasi pelamar {applicant.name}</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                      <span className="font-medium">Nama</span>
                                      <span>{applicant.name}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                      <span className="font-medium">Email</span>
                                      <span>{applicant.email}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                      <span className="font-medium">Telepon</span>
                                      <span>{applicant.phone}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                      <span className="font-medium">Posisi yang Dilamar</span>
                                      <span>{job ? job.title : "Unknown"}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                      <span className="font-medium">Tanggal Melamar</span>
                                      <span>{applicant.appliedDate}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                      <span className="font-medium">Pendidikan</span>
                                      <span>{applicant.education}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                      <span className="font-medium">Pengalaman</span>
                                      <span>{applicant.experience}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                      <span className="font-medium">Status</span>
                                      <span
                                        className={`inline-block px-2 py-1 text-xs rounded-full ${applicant.statusClass}`}
                                      >
                                        {applicant.status}
                                      </span>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Select defaultValue={applicant.status}>
                                      <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Ubah status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Screening">Screening</SelectItem>
                                        <SelectItem value="Interview">Interview</SelectItem>
                                        <SelectItem value="Diterima">Diterima</SelectItem>
                                        <SelectItem value="Ditolak">Ditolak</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <Button>Simpan Perubahan</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>

            {/* View Job Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Detail Lowongan Kerja</DialogTitle>
                  <DialogDescription>Informasi lengkap lowongan {selectedJob?.title}</DialogDescription>
                </DialogHeader>
                {selectedJob && (
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Posisi</span>
                      <span>{selectedJob.title}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Departemen</span>
                      <span>{selectedJob.department}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Lokasi</span>
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Tipe</span>
                      <span>{selectedJob.type}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Tanggal Posting</span>
                      <span>{selectedJob.postedDate}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Tanggal Tutup</span>
                      <span>{selectedJob.closingDate}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Jumlah Pelamar</span>
                      <span>{selectedJob.applicants}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Status</span>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${selectedJob.statusClass}`}>
                        {selectedJob.status}
                      </span>
                    </div>
                    <div className="grid gap-2 border-b pb-2">
                      <span className="font-medium">Deskripsi Pekerjaan</span>
                      <p className="text-sm">{selectedJob.description}</p>
                    </div>
                    <div className="grid gap-2 border-b pb-2">
                      <span className="font-medium">Persyaratan</span>
                      <p className="text-sm">{selectedJob.requirements}</p>
                    </div>
                    <div className="grid gap-2">
                      <span className="font-medium">Kisaran Gaji</span>
                      <p className="text-sm">{selectedJob.salary}</p>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Tutup
                  </Button>
                  <Select defaultValue={selectedJob?.status}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ubah status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                      <SelectItem value="Ditutup">Ditutup</SelectItem>
                    </SelectContent>
                  </Select>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </MainLayout>
    </ProtectedRoute>
  )
}
