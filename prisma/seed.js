const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const link1 = await prisma.link.create({
    data: {
      title: 'Prisma Documentation',
      url: 'https://www.prisma.io/docs/',
      description: 'Official Prisma documentation'
    },
  })

  const link2 = await prisma.link.create({
    data: {
      title: 'SQLite Homepage',
      url: 'https://www.sqlite.org/index.html',
      description: 'SQLite database engine'
    },
  })

  console.log({ link1, link2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })