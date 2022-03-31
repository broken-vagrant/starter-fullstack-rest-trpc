import { prisma } from '../context';

export default async () => {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
};
