import { PrismaClient } from '@prisma/client';

export type SeederConstructor = new (db: PrismaClient) => AbstractSeeder;

export abstract class AbstractSeeder {
  protected db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }
  abstract seed(): Promise<void>;
}

export type SeederGuard = (process: NodeJS.Process) => boolean;

export type SeederEntry = {
  guard?: SeederGuard | SeederGuard[];
  constructor: SeederConstructor;
};
