# Inisialisasi Prisma
npx prisma init

# Setelah membuat schema.prisma, buat migrasi
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Seed database (opsional)
npx prisma db seed
