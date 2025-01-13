import { FastifyInstance } from 'fastify';

export default async function uploadRoutes(fastify: FastifyInstance) {
  fastify.post('/', async (request, reply) => {
    return reply.code(200).send({
      data: 'File uploaded',
      success: true,
    });
  });
}
