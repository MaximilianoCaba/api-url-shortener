import { createConnection } from 'typeorm';

const baseDir = process.env.PROCESS_ENV === 'production' ? 'dist' : 'src';

export default async () => {
  try {
    const connection = await createConnection({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      port: 3306,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.TYPEORM_SYNCHRONIZE || false,
      entities: [`${baseDir}/entity/*.{ts,js}`],
      subscribers: [`${baseDir}/subscribers/*.{ts,js}`],
      timezone: 'Z',
    });
    return Promise.resolve(connection);
  } catch (ex) {
    console.error('Cannot connect database: ', ex);
  }
};
