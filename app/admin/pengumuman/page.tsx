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
import { Bell, Edit, Eye, Plus, Search, Trash2 } from "lucide-react"

export default function AdminPengumumanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    publishDate: "",
    expireDate: "",
    audience: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Announcements data
  const announcements = [
    {
      id: 1,
      title: "Libur Hari Raya Idul Fitri 2025",
      category: "Libur",
      content:
        "Diberitahukan kepada seluruh karyawan PT Balam Berlian Sawit bahwa libur Hari Raya Idul Fitri 2025 akan berlangsung dari tanggal 1 Juni hingga 7 Juni 2025. Seluruh karyawan diharapkan kembali bekerja pada tanggal 8 Juni 2025.",
      publishDate: "15/05/2025",
      expireDate: "08/06/2025",
      audience: "Semua Karyawan",
      status: "Aktif",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      title: "Rapat Evaluasi Kinerja Semester I",
      category: "Rapat",
      content:
        "Rapat evaluasi kinerja semester I akan dilaksanakan pada tanggal 25 Juni 2025 pukul 09.00 WIB di Ruang Rapat Utama. Seluruh kepala departemen dan supervisor wajib hadir.",
      publishDate: "10/05/2025",
      expireDate: "25/06/2025",
      audience: "Kepala Departemen, Supervisor",
      status: "Aktif",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      title: "Pemeliharaan Sistem HRMS",
      category: "Sistem",
      content:
        "Sistem HRMS akan mengalami pemeliharaan pada tanggal 22 Mei 2025 pukul 18.00 - 22.00 WIB. Selama waktu tersebut, sistem tidak dapat diakses. Mohon maaf atas ketidaknyamanannya.",
      publishDate: "18/05/2025",
      expireDate: "22/05/2025",
      audience: "Semua Karyawan",
      status: "Aktif",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      title: "Program Kesehatan Karyawan",
      category: "Kesehatan",
      content:
        "PT Balam Berlian Sawit akan mengadakan program pemeriksaan kesehatan gratis untuk seluruh karyawan pada tanggal 5-6 Juni 2025. Silakan mendaftar di bagian HR paling lambat tanggal 1 Juni 2025.",
      publishDate: "05/05/2025",
      expireDate: "06/06/2025",
      audience: "Semua Karyawan",
      status: "Aktif",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 5,
      title: "Perubahan Jam Kerja Selama Ramadhan",
      category: "Jam Kerja",
      content:
        "Selama bulan Ramadhan, jam kerja akan disesuaikan menjadi pukul 08.00 - 16.00 WIB. Perubahan ini berlaku mulai tanggal 1 April hingga 1 Mei 2025.",
      publishDate: "25/03/2025",
      expireDate: "01/05/2025",
      audience: "Semua Karyawan",
      status: "Kedaluwarsa",
      statusClass: "bg-red-100 text-red-800",
    },
  ]

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.audience.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeAnnouncements = filteredAnnouncements.filter((a) => a.status === "Aktif")
  const expiredAnnouncements = filteredAnnouncements.filter((a) => a.status === "Kedaluwarsa")

  const handleAddAnnouncement = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Pengumuman berhasil ditambahkan",
        description: `Pengumuman "${formData.title}" telah dipublikasikan`,
      })

      setIsAddDialogOpen(false)
      // Reset form
      setFormData({
        title: "",
        category: "",
        content: "",
        publishDate: "",
        expireDate: "",
        audience: "",
      })
    } catch (error) {
      toast({
        title: "Gagal menambahkan pengumuman",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditAnnouncement = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Pengumuman berhasil diperbarui",
        description: `Pengumuman "${selectedAnnouncement.title}" telah diperbarui`,
      })

      setIsEditDialogOpen(false)
    } catch (error) {
      toast({
        title: "Gagal memperbarui pengumuman",
        description: "Terjadi kesalahan saat menyimpan perubahan",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAnnouncement = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Pengumuman berhasil dihapus",
        description: `Pengumuman "${selectedAnnouncement.title}" telah dihapus`,
      })

      setIsDeleteDialogOpen(false)
    } catch (error) {
      toast({
        title: "Gagal menghapus pengumuman",
        description: "Terjadi kesalahan saat menghapus data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openViewDialog = (announcement) => {
    setSelectedAnnouncement(announcement)
    setIsViewDialogOpen(true)
  }

  const openEditDialog = (announcement) => {
    setSelectedAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      category: announcement.category,
      content: announcement.content,
      publishDate: announcement.publishDate,
      expireDate: announcement.expireDate,
      audience: announcement.audience,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (announcement) => {
    setSelectedAnnouncement(announcement)
    setIsDeleteDialogOpen(true)
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Pengumuman</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Kelola Pengumuman</CardTitle>
                <CardDescription>Kelola pengumuman untuk karyawan PT Balam Berlian Sawit</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari pengumuman..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      <span>Tambah Pengumuman</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Tambah Pengumuman Baru</DialogTitle>
                      <DialogDescription>Isi form berikut untuk menambahkan pengumuman baru</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddAnnouncement} className="space-y-4 py-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Judul Pengumuman</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="category">Kategori</Label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) => setFormData({ ...formData, category: value })}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih kategori" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Libur">Libur</SelectItem>
                                <SelectItem value="Rapat">Rapat</SelectItem>
                                <SelectItem value="Sistem">Sistem</SelectItem>
                                <SelectItem value="Kesehatan">Kesehatan</SelectItem>
                                <SelectItem value="Jam Kerja">Jam Kerja</SelectItem>
                                <SelectItem value="Lainnya">Lainnya</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="audience">Ditujukan Untuk</Label>
                            <Select
                              value={formData.audience}
                              onValueChange={(value) => setFormData({ ...formData, audience: value })}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih audiens" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Semua Karyawan">Semua Karyawan</SelectItem>
                                <SelectItem value="Kepala Departemen">Kepala Departemen</SelectItem>
                                <SelectItem value="Supervisor">Supervisor</SelectItem>
                                <SelectItem value="Staff">Staff</SelectItem>
                                <SelectItem value="Kepala Departemen, Supervisor">
                                  Kepala Departemen, Supervisor
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="publishDate">Tanggal Publikasi</Label>
                            <Input
                              id="publishDate"
                              type="date"
                              value={formData.publishDate}
                              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="expireDate">Tanggal Kedaluwarsa</Label>
                            <Input
                              id="expireDate"
                              type="date"
                              value={formData.expireDate}
                              onChange={(e) => setFormData({ ...formData, expireDate: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="content">Isi Pengumuman</Label>
                          <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                            rows={5}
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
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">Aktif</TabsTrigger>
                <TabsTrigger value="expired">Kedaluwarsa</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Judul</th>
                        <th className="text-left p-2">Kategori</th>
                        <th className="text-left p-2">Tanggal Publikasi</th>
                        <th className="text-left p-2">Tanggal Kedaluwarsa</th>
                        <th className="text-left p-2">Ditujukan Untuk</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeAnnouncements.map((announcement) => (
                        <tr key={announcement.id} className="border-b">
                          <td className="p-2">{announcement.title}</td>
                          <td className="p-2">{announcement.category}</td>
                          <td className="p-2">{announcement.publishDate}</td>
                          <td className="p-2">{announcement.expireDate}</td>
                          <td className="p-2">{announcement.audience}</td>
                          <td className="p-2">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${announcement.statusClass}`}>
                              {announcement.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => openViewDialog(announcement)}
                              >
                                <Eye className="h-3 w-3" />
                                <span>Lihat</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => openEditDialog(announcement)}
                              >
                                <Edit className="h-3 w-3" />
                                <span>Edit</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 text-red-500 hover:text-red-700"
                                onClick={() => openDeleteDialog(announcement)}
                              >
                                <Trash2 className="h-3 w-3" />
                                <span>Hapus</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="expired" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Judul</th>
                        <th className="text-left p-2">Kategori</th>
                        <th className="text-left p-2">Tanggal Publikasi</th>
                        <th className="text-left p-2">Tanggal Kedaluwarsa</th>
                        <th className="text-left p-2">Ditujukan Untuk</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expiredAnnouncements.map((announcement) => (
                        <tr key={announcement.id} className="border-b">
                          <td className="p-2">{announcement.title}</td>
                          <td className="p-2">{announcement.category}</td>
                          <td className="p-2">{announcement.publishDate}</td>
                          <td className="p-2">{announcement.expireDate}</td>
                          <td className="p-2">{announcement.audience}</td>
                          <td className="p-2">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${announcement.statusClass}`}>
                              {announcement.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => openViewDialog(announcement)}
                              >
                                <Eye className="h-3 w-3" />
                                <span>Lihat</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 text-red-500 hover:text-red-700"
                                onClick={() => openDeleteDialog(announcement)}
                              >
                                <Trash2 className="h-3 w-3" />
                                <span>Hapus</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>

            {/* View Announcement Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Detail Pengumuman</DialogTitle>
                  <DialogDescription>Informasi lengkap pengumuman</DialogDescription>
                </DialogHeader>
                {selectedAnnouncement && (
                  <div className="space-y-4 py-4">
                    <div className="grid gap-2 border-b pb-2">
                      <span className="font-medium text-lg">{selectedAnnouncement.title}</span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Bell className="h-4 w-4" />
                        <span>{selectedAnnouncement.category}</span>
                        <span>•</span>
                        <span>Publikasi: {selectedAnnouncement.publishDate}</span>
                      </div>
                    </div>
                    <div className="grid gap-2 border-b pb-2">
                      <span className="font-medium">Ditujukan Untuk</span>
                      <p className="text-sm">{selectedAnnouncement.audience}</p>
                    </div>
                    <div className="grid gap-2 border-b pb-2">
                      <span className="font-medium">Isi Pengumuman</span>
                      <p className="text-sm">{selectedAnnouncement.content}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Tanggal Kedaluwarsa</span>
                      <span>{selectedAnnouncement.expireDate}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium">Status</span>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${selectedAnnouncement.statusClass}`}
                      >
                        {selectedAnnouncement.status}
                      </span>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Tutup
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Edit Announcement Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Pengumuman</DialogTitle>
                  <DialogDescription>Edit informasi pengumuman</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditAnnouncement} className="space-y-4 py-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-title">Judul Pengumuman</Label>
                      <Input
                        id="edit-title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-category">Kategori</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Libur">Libur</SelectItem>
                            <SelectItem value="Rapat">Rapat</SelectItem>
                            <SelectItem value="Sistem">Sistem</SelectItem>
                            <SelectItem value="Kesehatan">Kesehatan</SelectItem>
                            <SelectItem value="Jam Kerja">Jam Kerja</SelectItem>
                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-audience">Ditujukan Untuk</Label>
                        <Select
                          value={formData.audience}
                          onValueChange={(value) => setFormData({ ...formData, audience: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih audiens" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Semua Karyawan">Semua Karyawan</SelectItem>
                            <SelectItem value="Kepala Departemen">Kepala Departemen</SelectItem>
                            <SelectItem value="Supervisor">Supervisor</SelectItem>
                            <SelectItem value="Staff">Staff</SelectItem>
                            <SelectItem value="Kepala Departemen, Supervisor">Kepala Departemen, Supervisor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-publishDate">Tanggal Publikasi</Label>
                        <Input
                          id="edit-publishDate"
                          type="date"
                          value={formData.publishDate}
                          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-expireDate">Tanggal Kedaluwarsa</Label>
                        <Input
                          id="edit-expireDate"
                          type="date"
                          value={formData.expireDate}
                          onChange={(e) => setFormData({ ...formData, expireDate: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-content">Isi Pengumuman</Label>
                      <Textarea
                        id="edit-content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        rows={5}
                      />
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Delete Announcement Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Hapus Pengumuman</DialogTitle>
                  <DialogDescription>
                    Apakah Anda yakin ingin menghapus pengumuman "{selectedAnnouncement?.title}"?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Tindakan ini tidak dapat dibatalkan. Pengumuman akan dihapus secara permanen dari sistem.
                  </p>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="button" variant="destructive" onClick={handleDeleteAnnouncement} disabled={isLoading}>
                    {isLoading ? "Menghapus..." : "Hapus"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </MainLayout>
    </ProtectedRoute>
  )
}
