import { FastifyInstance } from 'fastify';

export default async function testRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (_, reply) => {
    reply.code(200).send({
      message: 'API is working',
    });
  });
}
