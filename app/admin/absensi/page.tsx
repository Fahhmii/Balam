"use client"

import { useState } from "react"
import ProtectedRoute from "@/components/auth/protected-route"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Download, Edit, Search } from "lucide-react"

export default function AdminAbsensiPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedAttendance, setSelectedAttendance] = useState(null)
  const [formData, setFormData] = useState({
    clockIn: "",
    clockOut: "",
    status: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Indonesian employee names and data
  const attendanceData = [
    {
      id: 1,
      name: "Budi Santoso",
      position: "Manajer Operasional",
      department: "Operasional",
      clockIn: "07:45",
      clockOut: "16:30",
      status: "Hadir",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      name: "Dewi Lestari",
      position: "Staff Administrasi",
      department: "Administrasi",
      clockIn: "07:55",
      clockOut: "16:30",
      status: "Hadir",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      name: "Ahmad Rizki",
      position: "Staff Keuangan",
      department: "Keuangan",
      clockIn: "08:05",
      clockOut: "16:45",
      status: "Hadir",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      name: "Siti Nurhaliza",
      position: "Staff HR",
      department: "HR",
      clockIn: "-",
      clockOut: "-",
      status: "Cuti",
      statusClass: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 5,
      name: "Rudi Hermawan",
      position: "Supervisor Produksi",
      department: "Produksi",
      clockIn: "08:00",
      clockOut: "16:30",
      status: "Hadir",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 6,
      name: "Rina Wati",
      position: "Staff Administrasi",
      department: "Administrasi",
      clockIn: "-",
      clockOut: "-",
      status: "Tidak Hadir",
      statusClass: "bg-red-100 text-red-800",
    },
  ]

  const filteredAttendance = attendanceData.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditAttendance = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the attendance data in the UI
      const updatedAttendanceData = attendanceData.map((record) => {
        if (record.id === selectedAttendance.id) {
          return {
            ...record,
            clockIn: formData.clockIn || "-",
            clockOut: formData.clockOut || "-",
            status: formData.status,
            statusClass:
              formData.status === "Hadir"
                ? "bg-green-100 text-green-800"
                : formData.status === "Cuti"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800",
          }
        }
        return record
      })

      // In a real app, you would update the state with the new data
      // For this demo, we'll just show a success message

      toast({
        title: "Data absensi berhasil diperbarui",
        description: `Absensi untuk ${selectedAttendance.name} telah diperbarui`,
      })

      setIsEditDialogOpen(false)
    } catch (error) {
      toast({
        title: "Gagal memperbarui data absensi",
        description: "Terjadi kesalahan saat menyimpan perubahan",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openEditDialog = (record) => {
    setSelectedAttendance(record)
    setFormData({
      clockIn: record.clockIn !== "-" ? record.clockIn : "",
      clockOut: record.clockOut !== "-" ? record.clockOut : "",
      status: record.status,
    })
    setIsEditDialogOpen(true)
  }

  const handleExportData = () => {
    toast({
      title: "Data absensi diunduh",
      description: `Data absensi untuk tanggal ${selectedDate} telah diunduh`,
    })
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Absensi</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Data Absensi</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-[180px]"
                  />
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari karyawan..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={handleExportData} className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList>
                <TabsTrigger value="today">Hari Ini</TabsTrigger>
                <TabsTrigger value="week">Minggu Ini</TabsTrigger>
                <TabsTrigger value="month">Bulan Ini</TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Nama</th>
                        <th className="text-left p-2">Jabatan</th>
                        <th className="text-left p-2">Departemen</th>
                        <th className="text-left p-2">Jam Masuk</th>
                        <th className="text-left p-2">Jam Keluar</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendance.map((record) => (
                        <tr key={record.id} className="border-b">
                          <td className="p-2">{record.name}</td>
                          <td className="p-2">{record.position}</td>
                          <td className="p-2">{record.department}</td>
                          <td className="p-2">{record.clockIn}</td>
                          <td className="p-2">{record.clockOut}</td>
                          <td className="p-2">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${record.statusClass}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => openEditDialog(record)}
                            >
                              <Edit className="h-3 w-3" />
                              <span>Edit</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="week" className="mt-4">
                <div className="flex items-center justify-center p-8">
                  <p className="text-muted-foreground">Data absensi minggu ini tersedia di tab Hari Ini</p>
                </div>
              </TabsContent>
              <TabsContent value="month" className="mt-4">
                <div className="flex items-center justify-center p-8">
                  <p className="text-muted-foreground">Data absensi bulan ini tersedia di tab Hari Ini</p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Edit Attendance Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Data Absensi</DialogTitle>
                  <DialogDescription>
                    Edit data absensi untuk {selectedAttendance?.name} pada tanggal {selectedDate}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditAttendance} className="space-y-4 py-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="clockIn">Jam Masuk</Label>
                      <Input
                        id="clockIn"
                        type="time"
                        value={formData.clockIn}
                        onChange={(e) => setFormData({ ...formData, clockIn: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="clockOut">Jam Keluar</Label>
                      <Input
                        id="clockOut"
                        type="time"
                        value={formData.clockOut}
                        onChange={(e) => setFormData({ ...formData, clockOut: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hadir">Hadir</SelectItem>
                          <SelectItem value="Tidak Hadir">Tidak Hadir</SelectItem>
                          <SelectItem value="Cuti">Cuti</SelectItem>
                          <SelectItem value="Sakit">Sakit</SelectItem>
                          <SelectItem value="Izin">Izin</SelectItem>
                        </SelectContent>
                      </Select>
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
          </CardContent>
        </Card>
      </MainLayout>
    </ProtectedRoute>
  )
}
