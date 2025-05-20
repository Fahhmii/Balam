import MainLayout from "@/components/layout/main-layout"
import EmployeeTable from "@/components/employee/employee-table"

export default function AdminKaryawanPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Data Karyawan</h1>
      </div>

      <EmployeeTable />
    </MainLayout>
  )
}
