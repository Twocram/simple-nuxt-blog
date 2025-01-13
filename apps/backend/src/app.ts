import fastifyCors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastify, { FastifyInstance } from 'fastify';
import prismaPlugin from './plugins/prisma';
import typesPlugin from './plugins/types';
import authRoutes from './routes/auth';
import testRoutes from './routes/test';
import postRoutes from './routes/post';
import uploadRoutes from './routes/upload';

const server: FastifyInstance = fastify({
  logger: true,
});

// Register plugins
server.register(prismaPlugin);
server.register(typesPlugin);
server.register(fastifyCors);
server.register(multipart);
// Register routes
server.register(testRoutes, { prefix: '/api/v1/test' });
server.register(authRoutes, { prefix: '/api/v1/auth' });
server.register(uploadRoutes, { prefix: '/api/v1/upload' });
server.register(postRoutes, { prefix: '/api/v1/post' });

async function runServer() {
  try {
    await server.listen({ port: 3001 });
  } catch (err: unknown) {
    server.log.error(err);
    process.exit(1);
  }
}

runServer();
