"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data - in a real app, this would come from an API or database
const leaveRequests = [
  {
    id: 1,
    submissionDate: "10/05/2025",
    startDate: "15/06/2025",
    endDate: "18/06/2025",
    reason: "Acara Keluarga",
    status: "Menunggu",
    statusClass: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 2,
    submissionDate: "15/04/2025",
    startDate: "01/05/2025",
    endDate: "03/05/2025",
    reason: "Liburan",
    status: "Disetujui",
    statusClass: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    submissionDate: "05/03/2025",
    startDate: "10/03/2025",
    endDate: "12/03/2025",
    reason: "Sakit",
    status: "Disetujui",
    statusClass: "bg-green-100 text-green-800",
  },
  {
    id: 4,
    submissionDate: "10/02/2025",
    startDate: "15/02/2025",
    endDate: "16/02/2025",
    reason: "Urusan Pribadi",
    status: "Ditolak",
    statusClass: "bg-red-100 text-red-800",
  },
]

export default function LeaveRequestTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Pengajuan Cuti</CardTitle>
        <CardDescription>Daftar pengajuan cuti yang telah Anda ajukan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Tanggal Pengajuan</th>
                <th className="text-left p-2">Tanggal Cuti</th>
                <th className="text-left p-2">Alasan</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id} className="border-b">
                  <td className="p-2">{request.submissionDate}</td>
                  <td className="p-2">
                    {request.startDate} - {request.endDate}
                  </td>
                  <td className="p-2">{request.reason}</td>
                  <td className="p-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${request.statusClass}`}>
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
