import { SeederGuard } from './abstract.seeder';

export const isNotProductionGuard: SeederGuard = (process) =>
  process.env.NODE_ENV !== 'production';
