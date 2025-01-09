import fastifyCors from '@fastify/cors';
import fastify, { FastifyInstance } from 'fastify';
import prismaPlugin from './plugins/prisma';
import authRoutes from './routes/auth';
import testRoutes from './routes/test';

const server: FastifyInstance = fastify({
  logger: true,
});

// Register plugins
server.register(prismaPlugin);
server.register(fastifyCors);

// Register routes
server.register(testRoutes, { prefix: '/api/v1/test' });
server.register(authRoutes, { prefix: '/api/v1/auth' });

async function runServer() {
  try {
    await server.listen({ port: 3001 });
  } catch (err: unknown) {
    server.log.error(err);
    process.exit(1);
  }
}

runServer();
