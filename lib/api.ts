// Fungsi helper untuk memanggil API
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token")

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`/api/${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Terjadi kesalahan")
  }

  return data
}

// Contoh fungsi untuk login
export async function login(email: string, password: string) {
  return fetchAPI("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

// Contoh fungsi untuk mengambil data user
export async function getUsers() {
  return fetchAPI("users")
}

// Contoh fungsi untuk mengambil data absensi
export async function getAttendances(params: { startDate?: string; endDate?: string; userId?: string } = {}) {
  const queryParams = new URLSearchParams()

  if (params.startDate) queryParams.append("startDate", params.startDate)
  if (params.endDate) queryParams.append("endDate", params.endDate)
  if (params.userId) queryParams.append("userId", params.userId)

  const queryString = queryParams.toString()

  return fetchAPI(`attendances${queryString ? `?${queryString}` : ""}`)
}

// Contoh fungsi untuk check-in
export async function checkIn(userId: string) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  return fetchAPI("attendances", {
    method: "POST",
    body: JSON.stringify({
      userId,
      date: today.toISOString(),
      checkIn: now.toISOString(),
      status: "present",
    }),
  })
}

// Contoh fungsi untuk check-out
export async function checkOut(attendanceId: string) {
  const now = new Date()

  return fetchAPI(`attendances/${attendanceId}`, {
    method: "PUT",
    body: JSON.stringify({
      checkOut: now.toISOString(),
    }),
  })
}

// Contoh fungsi untuk mengajukan cuti
export async function requestLeave(data: {
  userId: string
  startDate: string
  endDate: string
  type: string
  reason: string
}) {
  return fetchAPI("leaves", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Contoh fungsi untuk menyetujui/menolak cuti
export async function approveLeave(leaveId: string, status: "APPROVED" | "REJECTED") {
  return fetchAPI(`leaves/approve/${leaveId}`, {
    method: "POST",
    body: JSON.stringify({ status }),
  })
}

// Contoh fungsi untuk mengambil slip gaji
export async function getPayrolls(params: { month?: number; year?: number; userId?: string } = {}) {
  const queryParams = new URLSearchParams()

  if (params.month) queryParams.append("month", params.month.toString())
  if (params.year) queryParams.append("year", params.year.toString())
  if (params.userId) queryParams.append("userId", params.userId)

  const queryString = queryParams.toString()

  return fetchAPI(`payrolls${queryString ? `?${queryString}` : ""}`)
}
