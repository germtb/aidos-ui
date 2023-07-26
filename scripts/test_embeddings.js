import { pipeline } from "@xenova/transformers";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootdir = path.join(__dirname, "..");
const __public = path.join(__rootdir, "public");

const index = await fs
  .readFile(path.join(__public, "index.json"), "utf-8")
  .then((data) => JSON.parse(data).index);

const generateEmbeddings = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

const query = "how to install";

const queryEmbeddings = await generateEmbeddings(query, {
  normalize: true,
  pooling: "mean",
}).then((embedding) => embedding.data);

function dot(xs, ys) {
  let sum = 0;

  for (let i = 0; i < xs.length; i++) {
    sum += xs[i] * ys[i];
  }

  return sum;
}

const results = index
  .map((element) => {
    return {
      ...element,
      dot: dot(queryEmbeddings, element.embedding),
    };
  })
  .sort((a, b) => b.dot - a.dot)
  .slice(0, 5);

console.log({ results });
