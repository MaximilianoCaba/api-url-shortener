import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';
import { createDatabaseConnection, closeDatabase, cleanDatabase } from './utils/database';

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

let connection;
beforeAll(async () => {
  connection = await createDatabaseConnection();
});

beforeEach(async () => {
  await cleanDatabase(connection);
});

afterAll(async () => {
  await closeDatabase(connection);
});
