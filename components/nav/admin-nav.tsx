"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, ClipboardCheck, Calendar, DollarSign, Briefcase, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Data Karyawan",
    href: "/admin/karyawan",
    icon: Users,
  },
  {
    title: "Absensi",
    href: "/admin/absensi",
    icon: ClipboardCheck,
  },
  {
    title: "Persetujuan Cuti",
    href: "/admin/cuti",
    icon: Calendar,
  },
  {
    title: "Kelola Penggajian",
    href: "/admin/penggajian",
    icon: DollarSign,
  },
  {
    title: "Rekrutmen",
    href: "/admin/rekrutmen",
    icon: Briefcase,
  },
  {
    title: "Pengumuman",
    href: "/admin/pengumuman",
    icon: Bell,
  },
  {
    title: "Profil Saya",
    href: "/admin/profile",
    icon: User,
  },
]

export function AdminNav() {
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
