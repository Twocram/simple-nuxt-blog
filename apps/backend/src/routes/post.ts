import { FastifyInstance } from 'fastify';

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (req, rep) => {
    return rep.send({
      message: 'Hello world',
    });
  });
}
