import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import z from "zod";

export async function pollResults(app: FastifyInstance) {
  app.get(
    "/polls/:pollId/results",
    { websocket: true },
    (connection, request) => {
      // Increver apenas nas mensagens publicada  no canal comID da enquente ('pillId')
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      });
      const { pollId } = getPollParams.parse(request.params);

      voting.subscribe(pollId, (message) => {
        connection.socket.send(JSON.stringify(message));
      });
    }
  );
}

// Pub/sub - Publish Subscribers -  padrão de projetos para eventos
// publico mensagens numa lista
// dividir essa mensagens em canais "chats"
