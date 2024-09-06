import {prisma} from '~/utils/db.server.ts';
import {seedPermission} from './seeds/permission.ts';
import {seedRole} from './seeds/role.ts';
import {seedUser} from './seeds/user.ts';

async function seed() {
  console.log('🌱 Seeding...');
  console.time(`🌱 Database has been seeded`);

  await seedPermission();
  await seedRole();
  await seedUser();

  console.timeEnd(`🌱 Database has been seeded`);
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/*
eslint
	@typescript-eslint/no-unused-vars: "off",
*/
