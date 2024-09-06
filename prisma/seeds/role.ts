import {prisma} from '~/utils/db.server';

export async function seedRole() {
  const roleCount = await prisma.role.count();

  if (roleCount > 0) {
    console.log(`👑 There are already ${roleCount} roles in the database.`);
    return;
  }

  console.time('👑 Created roles...');

  await prisma.role.create({
    data: {
      name: 'admin',
      permissions: {
        connect: await prisma.permission.findMany({
          select: {id: true},
          where: {access: 'any'},
        }),
      },
    },
  });

  await prisma.role.create({
    data: {
      name: 'user',
      permissions: {
        connect: await prisma.permission.findMany({
          select: {id: true},
          where: {access: 'own'},
        }),
      },
    },
  });

  console.timeEnd('👑 Created roles...');
}
