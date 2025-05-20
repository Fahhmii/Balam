"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react"

// Mock data - in a real app, this would come from an API or database
const salarySlips = [
  {
    id: 1,
    month: "Mei 2025",
    payDate: "28/05/2025",
    basicSalary: 8500000,
    allowances: 2000000,
    deductions: 500000,
    totalSalary: 10000000,
  },
  {
    id: 2,
    month: "April 2025",
    payDate: "28/04/2025",
    basicSalary: 8500000,
    allowances: 2000000,
    deductions: 500000,
    totalSalary: 10000000,
  },
  {
    id: 3,
    month: "Maret 2025",
    payDate: "28/03/2025",
    basicSalary: 8500000,
    allowances: 2000000,
    deductions: 500000,
    totalSalary: 10000000,
  },
  {
    id: 4,
    month: "Februari 2025",
    payDate: "28/02/2025",
    basicSalary: 8500000,
    allowances: 2000000,
    deductions: 500000,
    totalSalary: 10000000,
  },
]

export default function SalaryTable() {
  const [selectedSlip, setSelectedSlip] = useState(null)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Slip Gaji</CardTitle>
        <CardDescription>Riwayat slip gaji Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Bulan</th>
                <th className="text-left p-2">Tanggal Pembayaran</th>
                <th className="text-left p-2">Total Gaji</th>
                <th className="text-left p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {salarySlips.map((slip) => (
                <tr key={slip.id} className="border-b">
                  <td className="p-2">{slip.month}</td>
                  <td className="p-2">{slip.payDate}</td>
                  <td className="p-2">{formatCurrency(slip.totalSalary)}</td>
                  <td className="p-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => setSelectedSlip(slip)}
                        >
                          <Eye className="h-4 w-4" />
                          <span>Detail</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Detail Slip Gaji - {slip.month}</DialogTitle>
                          <DialogDescription>Rincian slip gaji Anda untuk bulan {slip.month}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-2 border-b pb-2">
                            <span className="font-medium">Nama</span>
                            <span>Budi Santoso</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 border-b pb-2">
                            <span className="font-medium">Jabatan</span>
                            <span>Manajer Operasional</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 border-b pb-2">
                            <span className="font-medium">Departemen</span>
                            <span>Operasional</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 border-b pb-2">
                            <span className="font-medium">Gaji Pokok</span>
                            <span>{formatCurrency(slip.basicSalary)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 border-b pb-2">
                            <span className="font-medium">Tunjangan</span>
                            <span>{formatCurrency(slip.allowances)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 border-b pb-2">
                            <span className="font-medium">Potongan</span>
                            <span>{formatCurrency(slip.deductions)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 font-bold">
                            <span>Total Gaji</span>
                            <span>{formatCurrency(slip.totalSalary)}</span>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline">Cetak Slip Gaji</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
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
