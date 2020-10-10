import { createClient } from "urql";

export const client = createClient({
  url: "http://localhost:4000/graphql",
  requestPolicy: "cache-and-network",
  fetchOptions: {
    credentials: "include"
  }
});
