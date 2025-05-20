"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2, Mail } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const result = await login(username, password)

      if (result.success) {
        toast({
          title: "Login berhasil",
          description: "Selamat datang di HRMS PT Balam Berlian Sawit",
        })

        // The router.push is not needed here as the useEffect in the root page will handle redirection
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    }
  }

  const handleGoogleLogin = () => {
    toast({
      title: "Login dengan Google",
      description: "Fitur login dengan Google sedang dalam pengembangan",
    })
  }

  const handleMicrosoftLogin = () => {
    toast({
      title: "Login dengan Microsoft",
      description: "Fitur login dengan Microsoft sedang dalam pengembangan",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="w-32 h-32 mb-4 relative flex items-center justify-center bg-primary/10 rounded-full">
          <span className="text-4xl font-bold text-primary">BBS</span>
        </div>
        <CardTitle className="text-2xl font-bold text-center">HRMS</CardTitle>
        <CardDescription className="text-center">PT Balam Berlian Sawit</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Atau login dengan</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" onClick={handleGoogleLogin} disabled={isLoading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 mr-2"
              style={{ fill: "#4285F4" }}
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
          <Button variant="outline" type="button" onClick={handleMicrosoftLogin} disabled={isLoading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              className="h-5 w-5 mr-2"
              style={{ fill: "#00A4EF" }}
            >
              <path d="M0 0h10.931v10.931H0z" fill="#f25022" />
              <path d="M12.069 0H23v10.931H12.069z" fill="#7fba00" />
              <path d="M0 12.069h10.931V23H0z" fill="#00a4ef" />
              <path d="M12.069 12.069H23V23H12.069z" fill="#ffb900" />
            </svg>
            Microsoft
          </Button>
        </div>

        <div className="mt-4">
          <Button variant="ghost" className="w-full" type="button" disabled={isLoading}>
            <Mail className="mr-2 h-4 w-4" />
            Login dengan Email
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-xs text-center text-muted-foreground mt-4">
          Untuk demo: <br />
          Admin: username "admin", password "admin123" <br />
          Karyawan: username "karyawan", password "karyawan123"
        </p>
      </CardFooter>
    </Card>
  )
}
