"use client"

import { useState } from "react"
import ProtectedRoute from "@/components/auth/protected-route"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Clock, ClockIcon as ClockIn, ClockIcon as ClockOut } from "lucide-react"

export default function KaryawanKehadiranPage() {
  const [attendance, setAttendance] = useState({
    status: "Belum Absen", // "Belum Absen", "Hadir", "Pulang"
    clockIn: null,
    clockOut: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock attendance history data with Indonesian dates
  const attendanceHistory = [
    {
      date: "20/05/2025",
      clockIn: "07:55",
      clockOut: "16:30",
      status: "Hadir",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      date: "19/05/2025",
      clockIn: "08:05",
      clockOut: "16:45",
      status: "Hadir",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      date: "18/05/2025",
      clockIn: "08:00",
      clockOut: "16:30",
      status: "Hadir",
      statusClass: "bg-green-100 text-green-800",
    },
    {
      date: "17/05/2025",
      clockIn: "-",
      clockOut: "-",
      status: "Tidak Hadir",
      statusClass: "bg-red-100 text-red-800",
    },
    {
      date: "16/05/2025",
      clockIn: "07:45",
      clockOut: "16:30",
      status: "Hadir",
      statusClass: "bg-green-100 text-green-800",
    },
  ]

  const handleClockIn = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const now = new Date()
      const timeString = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })

      setAttendance({
        status: "Hadir",
        clockIn: timeString,
        clockOut: null,
      })

      toast({
        title: "Absen Masuk Berhasil",
        description: `Anda telah absen masuk pada pukul ${timeString}`,
      })
    } catch (error) {
      toast({
        title: "Gagal Absen Masuk",
        description: "Terjadi kesalahan saat mencatat absen masuk",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClockOut = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const now = new Date()
      const timeString = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })

      setAttendance((prev) => ({
        ...prev,
        status: "Pulang",
        clockOut: timeString,
      }))

      toast({
        title: "Absen Pulang Berhasil",
        description: `Anda telah absen pulang pada pukul ${timeString}`,
      })
    } catch (error) {
      toast({
        title: "Gagal Absen Pulang",
        description: "Terjadi kesalahan saat mencatat absen pulang",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute requiredRole="karyawan">
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Kehadiran Saya</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Absensi Hari Ini</CardTitle>
              <CardDescription>Catat kehadiran Anda hari ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-6 py-4">
                <div className="flex items-center justify-center w-32 h-32 rounded-full bg-primary/10">
                  <Clock className="h-16 w-16 text-primary" />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-1">Status: {attendance.status}</h3>
                  {attendance.clockIn && (
                    <p className="text-sm text-muted-foreground">Jam Masuk: {attendance.clockIn}</p>
                  )}
                  {attendance.clockOut && (
                    <p className="text-sm text-muted-foreground">Jam Pulang: {attendance.clockOut}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleClockIn}
                    disabled={isLoading || attendance.status !== "Belum Absen"}
                    className="flex items-center gap-2"
                  >
                    <ClockIn className="h-4 w-4" />
                    Absen Masuk
                  </Button>
                  <Button
                    onClick={handleClockOut}
                    disabled={isLoading || attendance.status !== "Hadir"}
                    className="flex items-center gap-2"
                  >
                    <ClockOut className="h-4 w-4" />
                    Absen Pulang
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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
                    {attendanceHistory.map((record, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{record.date}</td>
                        <td className="p-2">{record.clockIn}</td>
                        <td className="p-2">{record.clockOut}</td>
                        <td className="p-2">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${record.statusClass}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
