import Fastify from 'fastify';
import client from './pg';

const app = Fastify({
  logger: true,
});

async function runServer() {
  try {
    await app.listen({ port: 3000 });
    client.connect();
  } catch (err: unknown) {
    app.log.error(err);
    process.exit(1);
  }
}

runServer();
