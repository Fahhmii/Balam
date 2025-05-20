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
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Download, Eye, Plus, Printer, Search } from "lucide-react"

export default function AdminPenggajianPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("Mei 2025")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedSalary, setSelectedSalary] = useState(null)
  const [formData, setFormData] = useState({
    employeeId: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    paymentDate: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Indonesian employee names and data
  const employees = [
    { id: "EMP001", name: "Budi Santoso", position: "Manajer Operasional", department: "Operasional" },
    { id: "EMP002", name: "Dewi Lestari", position: "Staff Administrasi", department: "Administrasi" },
    { id: "EMP003", name: "Ahmad Rizki", position: "Staff Keuangan", department: "Keuangan" },
    { id: "EMP004", name: "Siti Nurhaliza", position: "Staff HR", department: "HR" },
    { id: "EMP005", name: "Rudi Hermawan", position: "Supervisor Produksi", department: "Produksi" },
    { id: "EMP006", name: "Rina Wati", position: "Staff Administrasi", department: "Administrasi" },
  ]

  const salaryData = [
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "Budi Santoso",
      position: "Manajer Operasional",
      department: "Operasional",
      month: "Mei 2025",
      paymentDate: "28/05/2025",
      basicSalary: 8500000,
      allowances: 2000000,
      deductions: 500000,
      totalSalary: 10000000,
      status: "Dibayar",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      employeeId: "EMP002",
      employeeName: "Dewi Lestari",
      position: "Staff Administrasi",
      department: "Administrasi",
      month: "Mei 2025",
      paymentDate: "28/05/2025",
      basicSalary: 5500000,
      allowances: 1000000,
      deductions: 500000,
      totalSalary: 6000000,
      status: "Dibayar",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      employeeId: "EMP003",
      employeeName: "Ahmad Rizki",
      position: "Staff Keuangan",
      department: "Keuangan",
      month: "Mei 2025",
      paymentDate: "28/05/2025",
      basicSalary: 5500000,
      allowances: 1000000,
      deductions: 500000,
      totalSalary: 6000000,
      status: "Dibayar",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      employeeId: "EMP004",
      employeeName: "Siti Nurhaliza",
      position: "Staff HR",
      department: "HR",
      month: "Mei 2025",
      paymentDate: "28/05/2025",
      basicSalary: 5500000,
      allowances: 1000000,
      deductions: 500000,
      totalSalary: 6000000,
      status: "Dibayar",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 5,
      employeeId: "EMP005",
      employeeName: "Rudi Hermawan",
      position: "Supervisor Produksi",
      department: "Produksi",
      month: "Mei 2025",
      paymentDate: "28/05/2025",
      basicSalary: 6500000,
      allowances: 1500000,
      deductions: 500000,
      totalSalary: 7500000,
      status: "Dibayar",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      id: 6,
      employeeId: "EMP006",
      employeeName: "Rina Wati",
      position: "Staff Administrasi",
      department: "Administrasi",
      month: "Mei 2025",
      paymentDate: "28/05/2025",
      basicSalary: 5500000,
      allowances: 1000000,
      deductions: 500000,
      totalSalary: 6000000,
      status: "Dibayar",
      statusClass: "bg-green-100 text-green-800",
    },
  ]

  const filteredSalary = salaryData.filter(
    (record) =>
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleAddSalary = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const selectedEmployee = employees.find((emp) => emp.id === formData.employeeId)

      if (!selectedEmployee) {
        throw new Error("Karyawan tidak ditemukan")
      }

      // Calculate total salary
      const basicSalary = Number.parseInt(formData.basicSalary) || 0
      const allowances = Number.parseInt(formData.allowances) || 0
      const deductions = Number.parseInt(formData.deductions) || 0
      const totalSalary = basicSalary + allowances - deductions

      // In a real app, you would update the state with the new data
      // For this demo, we'll just show a success message

      toast({
        title: "Slip gaji berhasil dibuat",
        description: `Slip gaji untuk ${selectedEmployee.name} telah dibuat`,
      })

      setIsAddDialogOpen(false)
      // Reset form
      setFormData({
        employeeId: "",
        basicSalary: "",
        allowances: "",
        deductions: "",
        paymentDate: "",
      })
    } catch (error) {
      toast({
        title: "Gagal membuat slip gaji",
        description: error.message || "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openViewDialog = (record) => {
    setSelectedSalary(record)
    setIsViewDialogOpen(true)
  }

  const handlePrintSalarySlip = () => {
    toast({
      title: "Mencetak slip gaji",
      description: `Slip gaji ${selectedSalary.employeeName} sedang dicetak`,
    })
    setIsViewDialogOpen(false)
  }

  const handleExportData = () => {
    toast({
      title: "Data penggajian diunduh",
      description: `Data penggajian untuk bulan ${selectedMonth} telah diunduh`,
    })
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Penggajian</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Data Penggajian</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Pilih bulan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mei 2025">Mei 2025</SelectItem>
                      <SelectItem value="April 2025">April 2025</SelectItem>
                      <SelectItem value="Maret 2025">Maret 2025</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      <span>Buat Slip Gaji</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Buat Slip Gaji Baru</DialogTitle>
                      <DialogDescription>Isi form berikut untuk membuat slip gaji baru</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddSalary} className="space-y-4 py-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="employeeId">Karyawan</Label>
                          <Select
                            value={formData.employeeId}
                            onValueChange={(value) => setFormData({ ...formData, employeeId: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih karyawan" />
                            </SelectTrigger>
                            <SelectContent>
                              {employees.map((employee) => (
                                <SelectItem key={employee.id} value={employee.id}>
                                  {employee.name} - {employee.position}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="paymentDate">Tanggal Pembayaran</Label>
                          <Input
                            id="paymentDate"
                            type="date"
                            value={formData.paymentDate}
                            onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="basicSalary">Gaji Pokok</Label>
                          <Input
                            id="basicSalary"
                            type="number"
                            value={formData.basicSalary}
                            onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })}
                            placeholder="Masukkan gaji pokok"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="allowances">Tunjangan</Label>
                          <Input
                            id="allowances"
                            type="number"
                            value={formData.allowances}
                            onChange={(e) => setFormData({ ...formData, allowances: e.target.value })}
                            placeholder="Masukkan tunjangan"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="deductions">Potongan</Label>
                          <Input
                            id="deductions"
                            type="number"
                            value={formData.deductions}
                            onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                            placeholder="Masukkan potongan"
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
            <Tabs defaultValue="current">
              <TabsList>
                <TabsTrigger value="current">Bulan Ini</TabsTrigger>
                <TabsTrigger value="previous">Bulan Lalu</TabsTrigger>
                <TabsTrigger value="history">Riwayat</TabsTrigger>
              </TabsList>
              <TabsContent value="current" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Nama</th>
                        <th className="text-left p-2">Jabatan</th>
                        <th className="text-left p-2">Departemen</th>
                        <th className="text-left p-2">Gaji Pokok</th>
                        <th className="text-left p-2">Tunjangan</th>
                        <th className="text-left p-2">Potongan</th>
                        <th className="text-left p-2">Total Gaji</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSalary.map((record) => (
                        <tr key={record.id} className="border-b">
                          <td className="p-2">{record.employeeName}</td>
                          <td className="p-2">{record.position}</td>
                          <td className="p-2">{record.department}</td>
                          <td className="p-2">{formatCurrency(record.basicSalary)}</td>
                          <td className="p-2">{formatCurrency(record.allowances)}</td>
                          <td className="p-2">{formatCurrency(record.deductions)}</td>
                          <td className="p-2">{formatCurrency(record.totalSalary)}</td>
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
                              onClick={() => openViewDialog(record)}
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
              <TabsContent value="previous" className="mt-4">
                <div className="flex items-center justify-center p-8">
                  <p className="text-muted-foreground">Data penggajian bulan lalu tersedia di tab Bulan Ini</p>
                </div>
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <div className="flex items-center justify-center p-8">
                  <p className="text-muted-foreground">Riwayat penggajian tersedia di tab Bulan Ini</p>
                </div>
              </TabsContent>
            </Tabs>

            {/* View Salary Slip Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Detail Slip Gaji</DialogTitle>
                  <DialogDescription>
                    Slip gaji {selectedSalary?.employeeName} untuk bulan {selectedSalary?.month}
                  </DialogDescription>
                </DialogHeader>
                {selectedSalary && (
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Nama</span>
                      <span>{selectedSalary.employeeName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Jabatan</span>
                      <span>{selectedSalary.position}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Departemen</span>
                      <span>{selectedSalary.department}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Bulan</span>
                      <span>{selectedSalary.month}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Tanggal Pembayaran</span>
                      <span>{selectedSalary.paymentDate}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Gaji Pokok</span>
                      <span>{formatCurrency(selectedSalary.basicSalary)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Tunjangan</span>
                      <span>{formatCurrency(selectedSalary.allowances)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b pb-2">
                      <span className="font-medium">Potongan</span>
                      <span>{formatCurrency(selectedSalary.deductions)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-bold">
                      <span>Total Gaji</span>
                      <span>{formatCurrency(selectedSalary.totalSalary)}</span>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Tutup
                  </Button>
                  <Button type="button" onClick={handlePrintSalarySlip} className="flex items-center gap-1">
                    <Printer className="h-4 w-4" />
                    <span>Cetak</span>
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
