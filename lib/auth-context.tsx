"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Define the user type
type User = {
  id: string
  name: string
  role: "admin" | "karyawan"
  email: string
}

// Define the auth context type
type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("hrms_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  // Login function
  const login = async (username: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication logic
    if (username === "admin" && password === "admin123") {
      const adminUser = {
        id: "1",
        name: "Administrator",
        role: "admin" as const,
        email: "admin@balamberlian.com",
      }
      setUser(adminUser)
      localStorage.setItem("hrms_user", JSON.stringify(adminUser))
      setIsLoading(false)
      return { success: true, message: "Login berhasil" }
    } else if (username === "karyawan" && password === "karyawan123") {
      const employeeUser = {
        id: "2",
        name: "Budi Santoso",
        role: "karyawan" as const,
        email: "budi.santoso@balamberlian.com",
      }
      setUser(employeeUser)
      localStorage.setItem("hrms_user", JSON.stringify(employeeUser))
      setIsLoading(false)
      return { success: true, message: "Login berhasil" }
    } else {
      setIsLoading(false)
      return { success: false, message: "Username atau password salah" }
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("hrms_user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
