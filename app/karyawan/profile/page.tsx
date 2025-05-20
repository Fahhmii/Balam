import MainLayout from "@/components/layout/main-layout"
import ProfileForm from "@/components/profile/profile-form"

// Mock data - in a real app, this would come from an API or database
const karyawanData = {
  nama: "Budi Santoso",
  email: "budi.santoso@balamberlian.com",
  telepon: "081234567890",
  tanggalLahir: "1990-05-15",
  alamat: "Jl. Sudirman No. 123, Pekanbaru, Riau",
  jabatan: "Manajer Operasional",
}

export default function KaryawanProfilePage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl">
        <ProfileForm isAdmin={false} userData={karyawanData} />
      </div>
    </MainLayout>
  )
}
