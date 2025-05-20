"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ProfileForm({ isAdmin = false, userData }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userData)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to update the profile
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profil berhasil diperbarui",
        description: "Data profil Anda telah disimpan",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Gagal memperbarui profil",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData(userData)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Saya</CardTitle>
        <CardDescription>Lihat dan perbarui informasi profil Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              disabled={!isEditing || isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing || isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="telepon">Nomor HP</Label>
            <Input
              id="telepon"
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              disabled={!isEditing || isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
            <Input
              id="tanggalLahir"
              name="tanggalLahir"
              type="date"
              value={formData.tanggalLahir}
              onChange={handleChange}
              disabled={!isEditing || isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="alamat">Alamat</Label>
            <Textarea
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              disabled={!isEditing || isLoading}
              required
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jabatan">Jabatan</Label>
            <Input
              id="jabatan"
              name="jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              disabled={!isAdmin || !isEditing || isLoading}
              required
              readOnly={!isAdmin}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => router.push(isAdmin ? "/admin/dashboard" : "/karyawan/dashboard")}>
              Kembali
            </Button>
            <Button onClick={() => setIsEditing(true)}>Edit Profil</Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
