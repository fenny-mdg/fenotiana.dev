import {prisma} from '~/utils/db.server';

export async function seedPermission() {
  const permissionCount = await prisma.permission.count();

  if (permissionCount > 0) {
    console.log(
      `🔑 There are already ${permissionCount} permissions in the database.`,
    );
    return;
  }

  console.time('🔑 Created permissions...');

  const entities = ['user', 'task', 'script', 'log', 'execution'];
  const actions = ['create', 'read', 'update', 'delete'];
  const accesses = ['own', 'any'] as const;

  for (const entity of entities) {
    for (const action of actions) {
      for (const access of accesses) {
        await prisma.permission.create({data: {entity, action, access}});
      }
    }
  }
  console.timeEnd('🔑 Created permissions...');
}
