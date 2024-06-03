import fetch from "node-fetch";
import { Client } from "@elastic/elasticsearch";
export const client = new Client({ node: "http://localhost:9200" });

await client.indices.delete({
  index: "users",
});
