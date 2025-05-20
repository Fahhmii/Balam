import MainLayout from "@/components/layout/main-layout"
import LeaveRequestForm from "@/components/leave/leave-request-form"
import LeaveRequestTable from "@/components/leave/leave-request-table"

export default function KaryawanCutiPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Pengajuan Cuti</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <LeaveRequestForm />
        <LeaveRequestTable />
      </div>
    </MainLayout>
  )
}
