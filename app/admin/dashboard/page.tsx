"use client"

import ProtectedRoute from "@/components/auth/protected-route"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, ClipboardCheck, Calendar, DollarSign, Briefcase, Bell } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Karyawan</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+2 karyawan baru bulan ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kehadiran Hari Ini</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">93% dari total karyawan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pengajuan Cuti</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Menunggu persetujuan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Penggajian Bulan Ini</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 225.000.000</div>
              <p className="text-xs text-muted-foreground">+5% dari bulan lalu</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lowongan Aktif</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">12 pelamar baru</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pengumuman</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Pengumuman aktif</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="karyawan">
            <TabsList>
              <TabsTrigger value="karyawan">Data Karyawan</TabsTrigger>
              <TabsTrigger value="absensi">Absensi Hari Ini</TabsTrigger>
              <TabsTrigger value="cuti">Pengajuan Cuti</TabsTrigger>
            </TabsList>
            <TabsContent value="karyawan" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Data Karyawan Terbaru</CardTitle>
                  <CardDescription>Daftar 5 karyawan yang terakhir diperbarui</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Nama</th>
                          <th className="text-left p-2">Jabatan</th>
                          <th className="text-left p-2">Departemen</th>
                          <th className="text-left p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Budi Santoso</td>
                          <td className="p-2">Manajer Operasional</td>
                          <td className="p-2">Operasional</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Aktif
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Dewi Lestari</td>
                          <td className="p-2">Staff Administrasi</td>
                          <td className="p-2">Administrasi</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Aktif
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Ahmad Rizki</td>
                          <td className="p-2">Staff Keuangan</td>
                          <td className="p-2">Keuangan</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Aktif
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Siti Nurhaliza</td>
                          <td className="p-2">Staff HR</td>
                          <td className="p-2">HR</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Aktif
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">Rudi Hermawan</td>
                          <td className="p-2">Supervisor Produksi</td>
                          <td className="p-2">Produksi</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Aktif
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="absensi" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Absensi Hari Ini</CardTitle>
                  <CardDescription>Data kehadiran karyawan hari ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Nama</th>
                          <th className="text-left p-2">Jam Masuk</th>
                          <th className="text-left p-2">Jam Keluar</th>
                          <th className="text-left p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Budi Santoso</td>
                          <td className="p-2">07:55</td>
                          <td className="p-2">16:30</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Hadir
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Dewi Lestari</td>
                          <td className="p-2">08:05</td>
                          <td className="p-2">16:45</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Hadir
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Ahmad Rizki</td>
                          <td className="p-2">08:00</td>
                          <td className="p-2">16:30</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Hadir
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Siti Nurhaliza</td>
                          <td className="p-2">-</td>
                          <td className="p-2">-</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Cuti
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">Rudi Hermawan</td>
                          <td className="p-2">07:45</td>
                          <td className="p-2">-</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Hadir
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cuti" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pengajuan Cuti</CardTitle>
                  <CardDescription>Daftar pengajuan cuti yang menunggu persetujuan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Nama</th>
                          <th className="text-left p-2">Tanggal Mulai</th>
                          <th className="text-left p-2">Tanggal Selesai</th>
                          <th className="text-left p-2">Alasan</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Budi Santoso</td>
                          <td className="p-2">15/06/2025</td>
                          <td className="p-2">18/06/2025</td>
                          <td className="p-2">Acara Keluarga</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Menunggu
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <button className="px-2 py-1 text-xs bg-green-500 text-white rounded">Setujui</button>
                              <button className="px-2 py-1 text-xs bg-red-500 text-white rounded">Tolak</button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Dewi Lestari</td>
                          <td className="p-2">20/06/2025</td>
                          <td className="p-2">25/06/2025</td>
                          <td className="p-2">Liburan</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Menunggu
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <button className="px-2 py-1 text-xs bg-green-500 text-white rounded">Setujui</button>
                              <button className="px-2 py-1 text-xs bg-red-500 text-white rounded">Tolak</button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">Ahmad Rizki</td>
                          <td className="p-2">10/06/2025</td>
                          <td className="p-2">12/06/2025</td>
                          <td className="p-2">Sakit</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Menunggu
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <button className="px-2 py-1 text-xs bg-green-500 text-white rounded">Setujui</button>
                              <button className="px-2 py-1 text-xs bg-red-500 text-white rounded">Tolak</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
