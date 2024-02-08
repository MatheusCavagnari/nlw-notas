import fastify from "fastify";
import cookie from "@fastify/cookie";
import { createPoll } from "./rotes/create-poll";
import { getPoll } from "./rotes/get-poll";
import { voteOnPoll } from "./rotes/vote-on-poll";

const app = fastify();

app.register(cookie, {
  secret: "poll-app-nlw",
  hook: "onRequest",
});

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running");
});
