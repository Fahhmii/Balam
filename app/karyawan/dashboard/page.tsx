"use client"

import ProtectedRoute from "@/components/auth/protected-route"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardCheck, Calendar, DollarSign, Bell } from "lucide-react"

export default function KaryawanDashboardPage() {
  return (
    <ProtectedRoute requiredRole="karyawan">
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Karyawan</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status Kehadiran</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Hadir</div>
              <p className="text-xs text-muted-foreground">Jam masuk: 07:55</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sisa Cuti</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8 hari</div>
              <p className="text-xs text-muted-foreground">Dari total 12 hari</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gaji Bulan Ini</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 8.500.000</div>
              <p className="text-xs text-muted-foreground">Dibayarkan pada 28/05/2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pengumuman</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Pengumuman baru</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="kehadiran">
            <TabsList>
              <TabsTrigger value="kehadiran">Kehadiran</TabsTrigger>
              <TabsTrigger value="cuti">Pengajuan Cuti</TabsTrigger>
              <TabsTrigger value="pengumuman">Pengumuman</TabsTrigger>
            </TabsList>
            <TabsContent value="kehadiran" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Kehadiran</CardTitle>
                  <CardDescription>Riwayat kehadiran 7 hari terakhir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Tanggal</th>
                          <th className="text-left p-2">Jam Masuk</th>
                          <th className="text-left p-2">Jam Keluar</th>
                          <th className="text-left p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">20/05/2025</td>
                          <td className="p-2">07:55</td>
                          <td className="p-2">16:30</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Hadir
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">19/05/2025</td>
                          <td className="p-2">08:05</td>
                          <td className="p-2">16:45</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Hadir
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">18/05/2025</td>
                          <td className="p-2">08:00</td>
                          <td className="p-2">16:30</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Hadir
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">17/05/2025</td>
                          <td className="p-2">-</td>
                          <td className="p-2">-</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                              Tidak Hadir
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">16/05/2025</td>
                          <td className="p-2">07:45</td>
                          <td className="p-2">16:30</td>
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
                  <CardDescription>Riwayat pengajuan cuti Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Tanggal Pengajuan</th>
                          <th className="text-left p-2">Tanggal Mulai</th>
                          <th className="text-left p-2">Tanggal Selesai</th>
                          <th className="text-left p-2">Alasan</th>
                          <th className="text-left p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">10/05/2025</td>
                          <td className="p-2">15/06/2025</td>
                          <td className="p-2">18/06/2025</td>
                          <td className="p-2">Acara Keluarga</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Menunggu
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">15/04/2025</td>
                          <td className="p-2">01/05/2025</td>
                          <td className="p-2">03/05/2025</td>
                          <td className="p-2">Liburan</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Disetujui
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">05/03/2025</td>
                          <td className="p-2">10/03/2025</td>
                          <td className="p-2">12/03/2025</td>
                          <td className="p-2">Sakit</td>
                          <td className="p-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Disetujui
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pengumuman" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pengumuman Terbaru</CardTitle>
                  <CardDescription>Pengumuman penting dari perusahaan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold">Libur Hari Raya Idul Fitri 2025</h3>
                      <p className="text-sm text-muted-foreground mb-2">Diposting pada: 15/05/2025</p>
                      <p className="text-sm">
                        Diberitahukan kepada seluruh karyawan PT Balam Berlian Sawit bahwa libur Hari Raya Idul Fitri
                        2025 akan berlangsung dari tanggal 1 Juni hingga 7 Juni 2025. Seluruh karyawan diharapkan
                        kembali bekerja pada tanggal 8 Juni 2025.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold">Rapat Evaluasi Kinerja Semester I</h3>
                      <p className="text-sm text-muted-foreground mb-2">Diposting pada: 10/05/2025</p>
                      <p className="text-sm">
                        Rapat evaluasi kinerja semester I akan dilaksanakan pada tanggal 25 Juni 2025 pukul 09.00 WIB di
                        Ruang Rapat Utama. Seluruh kepala departemen dan supervisor wajib hadir.
                      </p>
                    </div>
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
