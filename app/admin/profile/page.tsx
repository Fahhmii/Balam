import MainLayout from "@/components/layout/main-layout"
import ProfileForm from "@/components/profile/profile-form"

// Mock data - in a real app, this would come from an API or database
const adminData = {
  nama: "Administrator",
  email: "admin@balamberlian.com",
  telepon: "081234567899",
  tanggalLahir: "1985-01-01",
  alamat: "Jl. Raya Sawit No. 123, Pekanbaru, Riau",
  jabatan: "HR Manager",
}

export default function AdminProfilePage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl">
        <ProfileForm isAdmin={true} userData={adminData} />
      </div>
    </MainLayout>
  )
}
