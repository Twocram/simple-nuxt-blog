import {FastifyInstance} from "fastify";
import fastify from "fastify";
import authRoutes from "./routes/auth";
import testRoutes from "./routes/test";
import prismaPlugin from "./plugins/prisma";

const server: FastifyInstance = fastify({
    logger: true
})

// Register plugins
server.register(prismaPlugin)

// Register routes
server.register(testRoutes, {prefix: '/api/v1/test'})
server.register(authRoutes, {prefix: '/api/v1/auth'})

async function runServer() {
    try {
        await server.listen({port: 3000})
    } catch (err: unknown) {
        server.log.error(err)
        process.exit(1)
    }
}

runServer()