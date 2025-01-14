import { FastifyInstance } from 'fastify';
import pick from '../utils/pick';
import { useAuth } from '../hooks/users/useAuth';

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', useAuth);

  fastify.get('/', async (request, reply) => {
    const queryValue = request.query as { [key: string]: string };

    const posts = await fastify.prisma.post.findMany({
      where: {
        caption: {
          contains: queryValue?.q,
        },
      },
    });

    const _posts = posts.map((post) =>
      pick(post, 'id', 'caption', 'description', 'image')
    );

    return reply.code(200).send({
      data: _posts,
      success: true,
    });
  });

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: number };

    const post = await fastify.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return reply.code(404).send({
        data: 'Post not found',
        success: false,
      });
    }

    return reply.code(200).send({
      data: pick(post, 'id', 'caption', 'description', 'image'),
      success: true,
    });
  });

  fastify.post('/', async (request, reply) => {
    const { userId, caption, description, image } = request.body as {
      userId: number;
      caption: string;
      description: string;
      image: string;
    };

    const post = await fastify.prisma.post.create({
      data: {
        userId,
        caption,
        description,
        image,
      },
    });

    return reply.code(200).send({
      data: post,
      success: true,
    });
  });
}
