import { createConnection } from 'typeorm';

export const createDatabaseConnection = async () => {
  return await createConnection({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    dropSchema: true,
    entities: ['src/entity/*.js'],
  });
};

export const cleanDatabase = async (connection) => {
  await connection.dropDatabase();
  return connection.synchronize(true);
};

export const closeDatabase = (connection) => connection.close();
