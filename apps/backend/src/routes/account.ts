import type { FastifyInstance } from 'fastify';
import { useAuth } from '../hooks/users/useAuth';
import pick from '../utils/pick';

export default async function accountRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', useAuth);

  fastify.get('/', async (request, reply) => {
    const user = await fastify.prisma.user.findUnique({
      where: {
        id: request.user.id,
      },
    });

    if (!user) {
      return reply.code(404).send({
        data: 'User not found',
        success: false,
      });
    }

    return reply.code(200).send({
      data: pick(user, 'id', 'email'),
      success: true,
    });
  });
}
