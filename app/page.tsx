"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [isRedirecting, setIsRedirecting] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redirect based on user role
        if (user.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/karyawan/dashboard")
        }
      } else {
        router.push("/login")
      }
      setIsRedirecting(false)
    }
  }, [user, isLoading, router])

  if (isRedirecting) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return null
}
