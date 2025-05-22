import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token tidak valid" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string
      email: string
      role: string
    }

    // Tambahkan informasi user ke request
    req.user = decoded

    next()
  } catch (error) {
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
