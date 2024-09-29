const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const link1 = await prisma.link.create({
    data: {
      title: 'Prisma Documentation',
      url: 'https://www.prisma.io/docs/',
      description: 'Official Prisma documentation for working with databases in Node.js and TypeScript',
      readTime: '5 min read',
      author: 'Prisma Team',
      tags: 'Database,ORM,Node.js'
    },
  })

  const link2 = await prisma.link.create({
    data: {
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/',
      description: 'Resources for developers, by developers',
      readTime: '3 min read',
      author: 'Mozilla',
      tags: 'Web Development,JavaScript,HTML,CSS'
    },
  })

  const link3 = await prisma.link.create({
    data: {
      title: 'Tailwind CSS',
      url: 'https://tailwindcss.com/',
      description: 'Rapidly build modern websites without ever leaving your HTML',
      readTime: '4 min read',
      author: 'Tailwind Labs',
      tags: 'CSS,Frontend,Utility-First'
    },
  })

  console.log({ link1, link2, link3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })