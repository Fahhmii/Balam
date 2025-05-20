import MainLayout from "@/components/layout/main-layout"
import LeaveApprovalTable from "@/components/leave/leave-approval-table"

export default function AdminCutiPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Persetujuan Cuti</h1>
      </div>

      <LeaveApprovalTable />
    </MainLayout>
  )
}
