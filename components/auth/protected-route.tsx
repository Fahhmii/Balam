"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export default function ProtectedRoute({
  children,
  requiredRole = null,
}: {
  children: React.ReactNode
  requiredRole?: "admin" | "karyawan" | null
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && requiredRole && user?.role !== requiredRole) {
      // Redirect to appropriate dashboard if user doesn't have required role
      if (user?.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/karyawan/dashboard")
      }
    }
  }, [user, isLoading, router, requiredRole])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole && user.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}
