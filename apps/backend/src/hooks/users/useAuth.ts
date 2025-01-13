import { preHandlerHookHandler } from 'fastify';

export const useAuth: preHandlerHookHandler = async (request, reply) => {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    return reply.code(401).send({
      data: 'Unauthorized',
      success: false,
    });
  }

  try {
    const user = await request.server.prisma.user.findUnique({
      where: {
        token,
      },

      select: {
        id: true,
      },
    });

    if (!user) {
      return reply.code(401).send({
        data: 'Wrong token',
        success: false,
      });
    }

    request.user = user;
  } catch (err) {
    console.error('useAuth error', err);
    return reply.code(500).send({
      data: 'Internal server error',
      success: false,
    });
  }
};
