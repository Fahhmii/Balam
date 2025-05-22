import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Buat admin
  const adminPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@bbs.com" },
    update: {},
    create: {
      email: "admin@bbs.com",
      password: adminPassword,
      name: "Admin BBS",
      role: "ADMIN",
      position: "Administrator",
      department: "IT",
      joinDate: new Date("2020-01-01"),
      phoneNumber: "081234567890",
      address: "Jl. Sudirman No. 123, Pekanbaru, Riau",
    },
  })

  // Buat beberapa karyawan
  const employeePassword = await bcrypt.hash("karyawan123", 10)

  const employee1 = await prisma.user.upsert({
    where: { email: "budi@bbs.com" },
    update: {},
    create: {
      email: "budi@bbs.com",
      password: employeePassword,
      name: "Budi Santoso",
      role: "EMPLOYEE",
      position: "Manajer Operasional",
      department: "Operasional",
      joinDate: new Date("2021-03-15"),
      phoneNumber: "081234567891",
      address: "Jl. Ahmad Yani No. 45, Pekanbaru, Riau",
    },
  })

  const employee2 = await prisma.user.upsert({
    where: { email: "dewi@bbs.com" },
    update: {},
    create: {
      email: "dewi@bbs.com",
      password: employeePassword,
      name: "Dewi Lestari",
      role: "EMPLOYEE",
      position: "Staff Keuangan",
      department: "Keuangan",
      joinDate: new Date("2022-01-10"),
      phoneNumber: "081234567892",
      address: "Jl. Diponegoro No. 78, Pekanbaru, Riau",
    },
  })

  const employee3 = await prisma.user.upsert({
    where: { email: "agus@bbs.com" },
    update: {},
    create: {
      email: "agus@bbs.com",
      password: employeePassword,
      name: "Agus Wijaya",
      role: "EMPLOYEE",
      position: "Staff Produksi",
      department: "Produksi",
      joinDate: new Date("2021-07-22"),
      phoneNumber: "081234567893",
      address: "Jl. Gajah Mada No. 12, Pekanbaru, Riau",
    },
  })

  console.log({ admin, employee1, employee2, employee3 })

  // Buat beberapa data absensi
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // Absensi untuk Budi
  await prisma.attendance.createMany({
    data: [
      {
        userId: employee1.id,
        date: yesterday,
        checkIn: new Date(yesterday.setHours(8, 0, 0)),
        checkOut: new Date(yesterday.setHours(17, 0, 0)),
        status: "present",
      },
      {
        userId: employee1.id,
        date: today,
        checkIn: new Date(today.setHours(8, 15, 0)),
        status: "present",
      },
    ],
    skipDuplicates: true,
  })

  // Buat beberapa pengajuan cuti
  await prisma.leave.create({
    data: {
      userId: employee2.id,
      startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
      type: "ANNUAL",
      reason: "Liburan keluarga",
      status: "PENDING",
    },
  })

  // Buat beberapa slip gaji
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1
  const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear

  await prisma.payroll.createMany({
    data: [
      {
        userId: employee1.id,
        month: lastMonth,
        year: lastMonthYear,
        basicSalary: 8000000,
        allowances: 1500000,
        deductions: 500000,
        overtimePay: 750000,
        totalSalary: 9750000,
        paymentDate: new Date(lastMonthYear, lastMonth - 1, 28),
        paymentStatus: "paid",
      },
      {
        userId: employee2.id,
        month: lastMonth,
        year: lastMonthYear,
        basicSalary: 6500000,
        allowances: 1000000,
        deductions: 400000,
        overtimePay: 0,
        totalSalary: 7100000,
        paymentDate: new Date(lastMonthYear, lastMonth - 1, 28),
        paymentStatus: "paid",
      },
      {
        userId: employee3.id,
        month: lastMonth,
        year: lastMonthYear,
        basicSalary: 5500000,
        allowances: 800000,
        deductions: 350000,
        overtimePay: 500000,
        totalSalary: 6450000,
        paymentDate: new Date(lastMonthYear, lastMonth - 1, 28),
        paymentStatus: "paid",
      },
    ],
    skipDuplicates: true,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
