import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import prisma from "./prisma"

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string
    email: string
    role: string
  }
}

// Middleware untuk autentikasi
export async function authMiddleware(req: AuthenticatedRequest, res: NextApiResponse, next: () => void) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Token tidak ditemukan" })
    }

    const token = authHeader.split(" ")[1]
    const secret = process.env.JWT_SECRET

    if (!secret) {
      console.error("JWT_SECRET tidak ditemukan di environment variables")
      return res.status(500).json({ error: "Internal Server Error" })
    }

    const decoded = jwt.verify(token, secret) as {
      id: string
      email: string
      role: string
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    })

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User tidak ditemukan" })
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    }

    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    return res.status(401).json({ error: "Unauthorized: Token tidak valid" })
  }
}

// Middleware untuk otorisasi admin
export function adminMiddleware(req: AuthenticatedRequest, res: NextApiResponse, next: () => void) {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden: Akses hanya untuk admin" })
  }

  next()
}

// Middleware untuk validasi akses data pribadi
export function ownerOrAdminMiddleware(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void,
  resourceUserId: string,
) {
  if (req.user?.role !== "ADMIN" && req.user?.id !== resourceUserId) {
    return res.status(403).json({ error: "Forbidden: Anda tidak memiliki akses ke data ini" })
  }

  next()
}

// Helper untuk menjalankan middleware secara berurutan
export function runMiddleware(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  middlewares: Array<(req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => void>,
) {
  return new Promise((resolve, reject) => {
    const runMiddlewareRecursive = (index: number) => {
      if (index === middlewares.length) {
        resolve(true)
        return
      }

      middlewares[index](req, res, () => {
        runMiddlewareRecursive(index + 1)
      })
    }

    runMiddlewareRecursive(0)
  })
}

// Fungsi helper untuk menggabungkan middleware (tetap dipertahankan untuk kompatibilitas)
export function withMiddleware(...middlewares: any[]) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      for (const middleware of middlewares) {
        await new Promise<void>((resolve, reject) => {
          middleware(req, res, (result: any) => {
            if (result instanceof Error) {
              return reject(result)
            }
            return resolve()
          })
        })
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
