import fastify from "fastify";
import cookie from "@fastify/cookie";
import { createPoll } from "./rotes/create-poll";
import { getPoll } from "./rotes/get-poll";
import { voteOnPoll } from "./rotes/vote-on-poll";
import fastifyWebsocket from "@fastify/websocket";
import { pollResults } from "./ws/poll-results";

const app = fastify();

app.register(cookie, {
  secret: "poll-app-nlw",
  hook: "onRequest",
});

app.register(fastifyWebsocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running");
});
