import assert from "node:assert/strict";
import test from "node:test";
import { unified } from "unified";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkTextComponentChildren from "../docs/remark-text-component-children.mjs";

function transform(source) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkTextComponentChildren);
  const tree = processor.parse(source);
  return processor.runSync(tree);
}

test("unwraps plain multiline text inside text controls", () => {
  for (const component of ["Button", "Link"]) {
    const tree = transform(`<${component}>\n  Styled text\n</${component}>`);
    const element = tree.children[0];

    assert.equal(element.type, "mdxJsxFlowElement");
    assert.deepEqual(
      element.children.map(({ type, value }) => ({ type, value })),
      [{ type: "text", value: "Styled text" }],
    );
  }
});

test("preserves paragraphs inside layout components", () => {
  const tree = transform("<Card>\n  Document paragraph\n</Card>");
  const element = tree.children[0];

  assert.equal(element.children[0].type, "paragraph");
});

test("rejects rich Markdown labels instead of emitting invalid control content", () => {
  assert.throws(
    () => transform("<Button>\n  **Rich text**\n</Button>"),
    /Button labels cannot contain Markdown formatting/,
  );
});
