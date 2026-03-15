import React, { useEffect, useRef } from "react";

/**
 * Injects a real HTML comment node (<!-- ComponentName -->) into the DOM.
 *
 * Renders nothing (null). Uses the React fiber tree to locate the sibling
 * component's first DOM node, then inserts a comment before it.
 * Client-only — no SSR output, no hydration mismatch.
 */
export function JSSComment({ name }: { name: string }) {
  const fiberRef = useRef<any>(null);

  // Capture our fiber during render
  try {
    const internals = (React as any)
      .__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    fiberRef.current = internals?.ReactCurrentOwner?.current;
  } catch {}

  useEffect(() => {
    const fiber = fiberRef.current;
    if (!fiber) return;

    // Our sibling in the Fragment is the actual component
    const sibling = fiber.sibling;
    if (!sibling) return;

    // Walk down the sibling's fiber tree to find its first DOM node
    const hostNode = findFirstDOMNode(sibling);
    if (!hostNode?.parentNode) return;

    const comment = document.createComment(` ${name} `);
    hostNode.parentNode.insertBefore(comment, hostNode);

    return () => {
      comment.remove();
    };
  }, [name]);

  return null;
}

function findFirstDOMNode(fiber: any): Node | null {
  let current = fiber;
  while (current) {
    if (current.stateNode instanceof Node) {
      return current.stateNode;
    }
    if (current.child) {
      current = current.child;
      continue;
    }
    break;
  }
  return null;
}
