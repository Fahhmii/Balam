import MainLayout from "@/components/layout/main-layout"
import SalaryTable from "@/components/salary/salary-table"

export default function KaryawanGajiPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Slip Gaji Saya</h1>
      </div>

      <SalaryTable />
    </MainLayout>
  )
}
