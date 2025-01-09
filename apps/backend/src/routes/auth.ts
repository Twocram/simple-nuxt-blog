import { FastifyInstance } from 'fastify';
import { generateHash } from '../utils/generateHash';
import { uid } from 'uid/secure';
import pick from '../utils/pick';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const existUser = await fastify.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existUser) {
      return reply.code(401).send({
        data: 'User already exists',
      });
    }

    const _password = await generateHash(password);
    const token = uid(40);

    await fastify.prisma.user.create({
      data: {
        email,
        password: _password,
        token,
      },
    });
  });

  fastify.get('/login', async (request, reply) => {
    const { email } = request.body as { email: string };

    const existUser = await fastify.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existUser) {
      return reply.code(401).send({
        data: 'User does not exist',
      });
    }

    return reply.code(200).send({
      data: pick(existUser, 'token'),
    });
  });
}
