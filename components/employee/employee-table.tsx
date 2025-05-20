"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Edit, MoreHorizontal, Search, Trash2, UserPlus } from "lucide-react"

// Mock data - Indonesian names and Riau addresses
const employees = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi.santoso@balamberlian.com",
    phone: "081234567890",
    position: "Manajer Operasional",
    department: "Operasional",
    joinDate: "15/01/2023",
    address: "Jl. Sudirman No. 123, Pekanbaru, Riau",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Dewi Lestari",
    email: "dewi.lestari@balamberlian.com",
    phone: "081234567891",
    position: "Staff Administrasi",
    department: "Administrasi",
    joinDate: "05/03/2022",
    address: "Jl. Ahmad Yani No. 45, Pekanbaru, Riau",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Ahmad Rizki",
    email: "ahmad.rizki@balamberlian.com",
    phone: "081234567892",
    position: "Staff Keuangan",
    department: "Keuangan",
    joinDate: "10/06/2023",
    address: "Jl. Hang Tuah No. 78, Pekanbaru, Riau",
    status: "Aktif",
  },
  {
    id: 4,
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@balamberlian.com",
    phone: "081234567893",
    position: "Staff HR",
    department: "HR",
    joinDate: "20/04/2023",
    address: "Jl. Diponegoro No. 56, Pekanbaru, Riau",
    status: "Aktif",
  },
  {
    id: 5,
    name: "Rudi Hermawan",
    email: "rudi.hermawan@balamberlian.com",
    phone: "081234567894",
    position: "Supervisor Produksi",
    department: "Produksi",
    joinDate: "01/02/2022",
    address: "Jl. Riau No. 112, Dumai, Riau",
    status: "Aktif",
  },
  {
    id: 6,
    name: "Rina Wati",
    email: "rina.wati@balamberlian.com",
    phone: "081234567895",
    position: "Staff Administrasi",
    department: "Administrasi",
    joinDate: "15/05/2023",
    address: "Jl. Soekarno Hatta No. 23, Pekanbaru, Riau",
    status: "Aktif",
  },
  {
    id: 7,
    name: "Agus Setiawan",
    email: "agus.setiawan@balamberlian.com",
    phone: "081234567896",
    position: "Staff Produksi",
    department: "Produksi",
    joinDate: "10/03/2023",
    address: "Jl. Thamrin No. 67, Bengkalis, Riau",
    status: "Aktif",
  },
  {
    id: 8,
    name: "Maya Sari",
    email: "maya.sari@balamberlian.com",
    phone: "081234567897",
    position: "Staff Keuangan",
    department: "Keuangan",
    joinDate: "05/04/2023",
    address: "Jl. Gatot Subroto No. 89, Pekanbaru, Riau",
    status: "Aktif",
  },
]

export default function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [employeeList, setEmployeeList] = useState(employees)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    joinDate: "",
    address: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const filteredEmployees = employeeList.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddEmployee = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a new employee object
      const newEmployee = {
        id: employeeList.length + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        department: formData.department,
        joinDate: formData.joinDate,
        address: formData.address,
        status: "Aktif",
      }

      // Update the employee list
      setEmployeeList([...employeeList, newEmployee])

      toast({
        title: "Karyawan berhasil ditambahkan",
        description: "Data karyawan baru telah disimpan",
      })

      setIsAddDialogOpen(false)
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        joinDate: "",
        address: "",
      })
    } catch (error) {
      toast({
        title: "Gagal menambahkan karyawan",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditEmployee = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the employee in the list
      const updatedEmployeeList = employeeList.map((emp) => {
        if (emp.id === selectedEmployee.id) {
          return {
            ...emp,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            position: formData.position,
            department: formData.department,
            joinDate: formData.joinDate,
            address: formData.address,
          }
        }
        return emp
      })

      // Update the state
      setEmployeeList(updatedEmployeeList)

      toast({
        title: "Data karyawan berhasil diperbarui",
        description: "Perubahan data karyawan telah disimpan",
      })

      setIsEditDialogOpen(false)
    } catch (error) {
      toast({
        title: "Gagal memperbarui data karyawan",
        description: "Terjadi kesalahan saat menyimpan perubahan",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEmployee = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Remove the employee from the list
      const updatedEmployeeList = employeeList.filter((emp) => emp.id !== selectedEmployee.id)

      // Update the state
      setEmployeeList(updatedEmployeeList)

      toast({
        title: "Karyawan berhasil dihapus",
        description: "Data karyawan telah dihapus dari sistem",
      })

      setIsDeleteDialogOpen(false)
    } catch (error) {
      toast({
        title: "Gagal menghapus karyawan",
        description: "Terjadi kesalahan saat menghapus data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const openEditDialog = (employee) => {
    setSelectedEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      department: employee.department,
      joinDate: employee.joinDate,
      address: employee.address,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (employee) => {
    setSelectedEmployee(employee)
    setIsDeleteDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Data Karyawan</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  <span>Tambah Karyawan</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Tambah Karyawan Baru</DialogTitle>
                  <DialogDescription>Isi form berikut untuk menambahkan karyawan baru</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddEmployee} className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Nomor HP</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="joinDate">Tanggal Bergabung</Label>
                      <Input
                        id="joinDate"
                        name="joinDate"
                        type="date"
                        value={formData.joinDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="position">Jabatan</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("position", value)}
                        defaultValue={formData.position}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jabatan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Staff Administrasi">Staff Administrasi</SelectItem>
                          <SelectItem value="Staff Keuangan">Staff Keuangan</SelectItem>
                          <SelectItem value="Staff HR">Staff HR</SelectItem>
                          <SelectItem value="Staff Produksi">Staff Produksi</SelectItem>
                          <SelectItem value="Supervisor Produksi">Supervisor Produksi</SelectItem>
                          <SelectItem value="Manajer Operasional">Manajer Operasional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="department">Departemen</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("department", value)}
                        defaultValue={formData.department}
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
                  <div className="grid gap-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Masukkan alamat lengkap di Riau"
                    />
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Nama</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Jabatan</th>
                <th className="text-left p-2">Departemen</th>
                <th className="text-left p-2">Tanggal Bergabung</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="p-2">{employee.name}</td>
                  <td className="p-2">{employee.email}</td>
                  <td className="p-2">{employee.position}</td>
                  <td className="p-2">{employee.department}</td>
                  <td className="p-2">{employee.joinDate}</td>
                  <td className="p-2">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Aksi</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(employee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(employee)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Hapus</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Employee Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Data Karyawan</DialogTitle>
              <DialogDescription>Edit data karyawan {selectedEmployee?.name}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditEmployee} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nama Lengkap</Label>
                  <Input id="edit-name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-phone">Nomor HP</Label>
                  <Input id="edit-phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-joinDate">Tanggal Bergabung</Label>
                  <Input
                    id="edit-joinDate"
                    name="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-position">Jabatan</Label>
                  <Select value={formData.position} onValueChange={(value) => handleSelectChange("position", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Staff Administrasi">Staff Administrasi</SelectItem>
                      <SelectItem value="Staff Keuangan">Staff Keuangan</SelectItem>
                      <SelectItem value="Staff HR">Staff HR</SelectItem>
                      <SelectItem value="Staff Produksi">Staff Produksi</SelectItem>
                      <SelectItem value="Supervisor Produksi">Supervisor Produksi</SelectItem>
                      <SelectItem value="Manajer Operasional">Manajer Operasional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-department">Departemen</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
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
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Alamat</Label>
                <Textarea
                  id="edit-address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                />
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

        {/* Delete Employee Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Hapus Karyawan</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus data karyawan {selectedEmployee?.name}?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Tindakan ini tidak dapat dibatalkan. Data karyawan akan dihapus secara permanen dari sistem.
              </p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Batal
              </Button>
              <Button type="button" variant="destructive" onClick={handleDeleteEmployee} disabled={isLoading}>
                {isLoading ? "Menghapus..." : "Hapus"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
