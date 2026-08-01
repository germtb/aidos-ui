const textComponents = new Set(["Button", "Link"]);

function normalizeTextComponent(node, file) {
  if (
    node.type !== "mdxJsxFlowElement" ||
    !textComponents.has(node.name)
  ) {
    return;
  }

  const paragraphs = node.children.filter((child) => child.type === "paragraph");
  if (paragraphs.length === 0) {
    return;
  }

  if (node.children.length !== 1) {
    file.fail(`${node.name} must have a single text label`, node);
  }

  const [paragraph] = node.children;
  if (paragraph.children.some((child) => child.type !== "text")) {
    file.fail(`${node.name} labels cannot contain Markdown formatting`, node);
  }

  node.children = paragraph.children;
}

function visit(node, file) {
  normalizeTextComponent(node, file);
  node.children?.forEach((child) => visit(child, file));
}

export default function remarkTextComponentChildren() {
  return (tree, file) => visit(tree, file);
}
