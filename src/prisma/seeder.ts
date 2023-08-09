import { PrismaClient } from '@prisma/client';
import SEEDERS from './seeder-scripts.constants';
import process = require('node:process');

(() => {
  const prisma = new PrismaClient();

  async function main() {
    console.log('🌰 Seeding... 🌵');

    for (const seeder of SEEDERS) {
      const seederGuard = seeder.guard;
      const SeederConstructor = seeder.constructor;
      if (seederGuard !== undefined) {
        const guards = Array.isArray(seederGuard) ? seederGuard : [seederGuard];
        const isAllowed = guards.every((guard) => guard(process));
        if (!isAllowed) {
          console.log(`☢️ ⚠️ 🚧\tSkipping ${SeederConstructor.name}`);
          continue;
        }
      }

      console.log(`🌱🌿♻️\tExecuting ${SeederConstructor.name}`);

      const seederInstance = new SeederConstructor(prisma);
      try {
        await seederInstance.seed();
      } catch (error) {
        console.error(
          `❌❗⛔\tError executing ${SeederConstructor.name}`,
          error,
        );
      }
    }
  }

  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
})();
