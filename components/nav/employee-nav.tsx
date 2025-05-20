"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ClipboardCheck, Calendar, DollarSign, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/karyawan/dashboard",
    icon: BarChart3,
  },
  {
    title: "Kehadiran Saya",
    href: "/karyawan/kehadiran",
    icon: ClipboardCheck,
  },
  {
    title: "Pengajuan Cuti",
    href: "/karyawan/cuti",
    icon: Calendar,
  },
  {
    title: "Slip Gaji Saya",
    href: "/karyawan/gaji",
    icon: DollarSign,
  },
  {
    title: "Profil Saya",
    href: "/karyawan/profile",
    icon: User,
  },
]

export function EmployeeNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-1 px-2">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
