import bcrypt from 'bcryptjs';

import {prisma} from '~/utils/db.server';

export async function seedUser() {
  const userCount = await prisma.user.count();

  if (userCount > 0) {
    console.log(`👤 There are already ${userCount} users in the database.`);
    return;
  }

  console.time('👤 Created users...');

  await prisma.user.create({
    select: {id: true},
    data: {
      email: 'admin@admin.com',
      username: 'admin',
      name: 'Administrateur',
      password: {create: {hash: bcrypt.hashSync('4dm1n1234', 10)}},
      roles: {connect: [{name: 'admin'}, {name: 'user'}]},
    },
  });

  console.timeEnd('👤 Created users...');
}
