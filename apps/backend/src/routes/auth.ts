import { FastifyInstance } from 'fastify';
import { uid } from 'uid/secure';
import { generateHash } from '../utils/generateHash';

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
      return reply.code(200).send({
        data: 'User already exists',
        success: false,
      });
    }

    const _password = await generateHash(password);
    const token = uid(40);

    const user = await fastify.prisma.user.create({
      data: {
        email,
        password: _password,
        token,
      },
    });

    return reply.code(200).send({
      data: user.token,
      success: true,
    });
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const existUser = await fastify.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existUser) {
      return reply.code(200).send({
        data: 'Email or password is incorrect',
        success: false,
      });
    }

    const _password = await generateHash(password);

    if (!_password.equals(existUser.password)) {
      return reply.code(200).send({
        data: 'Email or password is incorrect',
        success: false,
      });
    }

    return reply.code(200).send({
      data: existUser.token,
      success: true,
    });
  });
}
