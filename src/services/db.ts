import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | undefined = undefined

console.log('init db connection')

async function getClient(): Promise<PrismaClient> {
  if (prisma) return prisma
  console.log('init client connection')
  const client = new PrismaClient()
  await client.$connect()
  return client
}

export default async () => {
  prisma = await getClient()
  return prisma
}
