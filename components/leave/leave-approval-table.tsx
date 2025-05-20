"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Check, Search, X } from "lucide-react"

// Mock data - in a real app, this would come from an API or database
const leaveRequests = [
  {
    id: 1,
    employeeName: "Budi Santoso",
    employeeId: "EMP001",
    department: "Operasional",
    submissionDate: "10/05/2025",
    startDate: "15/06/2025",
    endDate: "18/06/2025",
    duration: "4 hari",
    reason: "Acara Keluarga",
    status: "Menunggu",
    statusClass: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 2,
    employeeName: "Dewi Lestari",
    employeeId: "EMP002",
    department: "Administrasi",
    submissionDate: "12/05/2025",
    startDate: "20/06/2025",
    endDate: "25/06/2025",
    duration: "6 hari",
    reason: "Liburan",
    status: "Menunggu",
    statusClass: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 3,
    employeeName: "Ahmad Rizki",
    employeeId: "EMP003",
    department: "Keuangan",
    submissionDate: "08/05/2025",
    startDate: "10/06/2025",
    endDate: "12/06/2025",
    duration: "3 hari",
    reason: "Sakit",
    status: "Menunggu",
    statusClass: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 4,
    employeeName: "Rudi Hermawan",
    employeeId: "EMP005",
    department: "Produksi",
    submissionDate: "05/05/2025",
    startDate: "01/06/2025",
    endDate: "02/06/2025",
    duration: "2 hari",
    reason: "Urusan Pribadi",
    status: "Disetujui",
    statusClass: "bg-green-100 text-green-800",
  },
  {
    id: 5,
    employeeName: "Siti Nurhaliza",
    employeeId: "EMP004",
    department: "HR",
    submissionDate: "01/05/2025",
    startDate: "15/05/2025",
    endDate: "17/05/2025",
    duration: "3 hari",
    reason: "Acara Keluarga",
    status: "Ditolak",
    statusClass: "bg-red-100 text-red-800",
    rejectionReason: "Jadwal bertepatan dengan periode sibuk",
  },
]

export default function LeaveApprovalTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const filteredRequests = leaveRequests.filter(
    (request) =>
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingRequests = filteredRequests.filter((request) => request.status === "Menunggu")
  const approvedRequests = filteredRequests.filter((request) => request.status === "Disetujui")
  const rejectedRequests = filteredRequests.filter((request) => request.status === "Ditolak")

  const handleApprove = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to approve the leave request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Pengajuan cuti disetujui",
        description: `Pengajuan cuti ${selectedRequest.employeeName} telah disetujui`,
      })

      setIsApproveDialogOpen(false)
    } catch (error) {
      toast({
        title: "Gagal menyetujui pengajuan cuti",
        description: "Terjadi kesalahan saat memproses persetujuan",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to reject the leave request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Pengajuan cuti ditolak",
        description: `Pengajuan cuti ${selectedRequest.employeeName} telah ditolak`,
      })

      setIsRejectDialogOpen(false)
      setRejectionReason("")
    } catch (error) {
      toast({
        title: "Gagal menolak pengajuan cuti",
        description: "Terjadi kesalahan saat memproses penolakan",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openApproveDialog = (request) => {
    setSelectedRequest(request)
    setIsApproveDialogOpen(true)
  }

  const openRejectDialog = (request) => {
    setSelectedRequest(request)
    setIsRejectDialogOpen(true)
  }

  const renderLeaveTable = (requests) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Nama Karyawan</th>
            <th className="text-left p-2">Departemen</th>
            <th className="text-left p-2">Tanggal Pengajuan</th>
            <th className="text-left p-2">Tanggal Cuti</th>
            <th className="text-left p-2">Durasi</th>
            <th className="text-left p-2">Alasan</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-4 text-center text-muted-foreground">
                Tidak ada data pengajuan cuti
              </td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr key={request.id} className="border-b">
                <td className="p-2">{request.employeeName}</td>
                <td className="p-2">{request.department}</td>
                <td className="p-2">{request.submissionDate}</td>
                <td className="p-2">
                  {request.startDate} - {request.endDate}
                </td>
                <td className="p-2">{request.duration}</td>
                <td className="p-2">{request.reason}</td>
                <td className="p-2">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${request.statusClass}`}>
                    {request.status}
                  </span>
                </td>
                <td className="p-2">
                  {request.status === "Menunggu" ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 bg-green-500 text-white hover:bg-green-600"
                        onClick={() => openApproveDialog(request)}
                      >
                        <Check className="h-3 w-3" />
                        <span>Setujui</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-600"
                        onClick={() => openRejectDialog(request)}
                      >
                        <X className="h-3 w-3" />
                        <span>Tolak</span>
                      </Button>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {request.status === "Ditolak" && request.rejectionReason
                        ? `Alasan: ${request.rejectionReason}`
                        : "-"}
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Persetujuan Cuti</CardTitle>
            <CardDescription>Kelola pengajuan cuti karyawan</CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari pengajuan cuti..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">
              Menunggu{" "}
              <span className="ml-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                {pendingRequests.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Disetujui{" "}
              <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                {approvedRequests.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Ditolak{" "}
              <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">
                {rejectedRequests.length}
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="mt-4">
            {renderLeaveTable(pendingRequests)}
          </TabsContent>
          <TabsContent value="approved" className="mt-4">
            {renderLeaveTable(approvedRequests)}
          </TabsContent>
          <TabsContent value="rejected" className="mt-4">
            {renderLeaveTable(rejectedRequests)}
          </TabsContent>
        </Tabs>

        {/* Approve Dialog */}
        <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Setujui Pengajuan Cuti</DialogTitle>
              <DialogDescription>
                Anda akan menyetujui pengajuan cuti dari {selectedRequest?.employeeName}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Nama Karyawan:</span>
                  <span>{selectedRequest?.employeeName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Departemen:</span>
                  <span>{selectedRequest?.department}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Tanggal Cuti:</span>
                  <span>
                    {selectedRequest?.startDate} - {selectedRequest?.endDate}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Durasi:</span>
                  <span>{selectedRequest?.duration}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Alasan:</span>
                  <span>{selectedRequest?.reason}</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                Batal
              </Button>
              <Button
                type="button"
                onClick={handleApprove}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600"
              >
                {isLoading ? "Memproses..." : "Setujui"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tolak Pengajuan Cuti</DialogTitle>
              <DialogDescription>
                Anda akan menolak pengajuan cuti dari {selectedRequest?.employeeName}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Nama Karyawan:</span>
                  <span>{selectedRequest?.employeeName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Tanggal Cuti:</span>
                  <span>
                    {selectedRequest?.startDate} - {selectedRequest?.endDate}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Alasan Cuti:</span>
                  <span>{selectedRequest?.reason}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rejectionReason">Alasan Penolakan</Label>
                <Textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Berikan alasan penolakan pengajuan cuti"
                  required
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Batal
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleReject}
                disabled={isLoading || !rejectionReason.trim()}
              >
                {isLoading ? "Memproses..." : "Tolak"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
