import { FastifyInstance } from 'fastify';
import fs from 'node:fs';
import pump from 'pump';

export default async function uploadRoutes(fastify: FastifyInstance) {
  fastify.post('/', async (request, reply) => {
    const file = await request.file();

    if (!file) {
      return reply.code(400).send({
        data: 'No file uploaded',
        success: false,
      });
    }

    const _file = await fastify.prisma.file.create({
      data: {
        name: file.filename,
        extension: file.mimetype,
        url: file.filename,
      },
    });

    const storedFile = fs.createWriteStream(
      `./uploads/${_file.id}-${file.filename}`
    );

    pump(file.file, storedFile);

    const fileURL = `${request.protocol}://${request.headers.host}/uploads/${_file.id}-${file.filename}`;

    return reply.code(200).send({
      data: fileURL,
      success: true,
    });
  });
}
