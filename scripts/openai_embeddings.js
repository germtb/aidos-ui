import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootdir = path.join(__dirname, "..");
const __pages = path.join(__rootdir, "src", "pages");
const __target = path.join(__rootdir, "src", "docs");

const configuration = new Configuration({
  organization: "org-Q89d8tyY2MChQVFEbhp27pB3",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const files = await fs.readdir(__pages);

const index = [];

for (const file of files) {
  if (path.extname(file) !== ".mdx") {
    continue;
  }

  const filepath = path.join(__pages, file);
  const filename = path.parse(file).name;
  const content = await fs.readFile(filepath, "utf-8");
  const sections = parseContent(content);

  const embeddings = await Promise.all(
    sections.map(async ({ text, heading, headingDepth }) => {
      const embedding = await openai
        .createEmbedding({
          model: "text-embedding-ada-002",
          input: text,
        })
        .then((response) => response.data[0].embedding);

      return {
        heading,
        headingDepth,
        filename,
        embedding: Array.from(embedding.data),
      };
    })
  );

  index.push(...embeddings);
}

await fs.writeFile(
  path.join(__target, "searchIndex.ts"),
  `export const index = ${JSON.stringify({ index })}`
);

function parseChildren(children) {
  const result = [];

  for (const node of children) {
    if (node.type === "text") {
      result.push(node.value);
    } else if (node.type === "inlineCode") {
      result.push(node.value);
    } else if (node.type === "link") {
      result.push(parseChildren(node.children));
    }
  }

  return result.join(" ");
}

function parseContent(content) {
  const ast = unified().use(remarkParse).use(remarkMdx).parse(content);
  const result = [];
  let headingDepth = 1;
  let heading = "";

  for (const node of ast.children) {
    if (node.type === "paragraph") {
      result.push({
        text: heading + ": " + parseChildren(node.children),
        heading,
        headingDepth,
      });
    } else if (node.type === "heading") {
      headingDepth = node.depth;
      heading = parseChildren(node.children);
    }
  }

  return result;
}
