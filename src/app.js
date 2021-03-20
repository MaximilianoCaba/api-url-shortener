import apiRoutes from './routes';
import fastify from 'fastify';
import databaseConfig from './config/databaseConfig';
import * as dotenv from 'dotenv';
import fastifySwagger from 'fastify-swagger';
import swaggerSpec from './config/swaggerSpecConfig';
import swStats from 'swagger-stats';
import middleware from 'middie';

if (process.env.PROCESS_ENV !== 'production') {
  dotenv.config();
}

const start = async () => {
  const server = fastify();
  try {
    await server.register(middleware);
    server.register(fastifySwagger, swaggerSpec);
    server.register(swStats.getFastifyPlugin, { swaggerSpec });
    server.register(apiRoutes);
    await server.listen(3004);
    console.log('Server start in port: ' + 3004);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

databaseConfig().then(async () => {
  start();
});
