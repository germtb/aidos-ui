import React, { useState } from "react";
import {
  BaseList,
  BaseView,
  Button,
  Column,
  ContextualActions,
  Disclosure,
  Icon,
  IconButton,
  List,
  ListButtonItem,
  Menu,
  MenuItem,
  MenuSeparator,
  PopoverTrigger,
  Row,
  Span,
  Text,
  useListReorder,
} from "../../src";

const initialGroups = [
  {
    id: "atlas",
    label: "Atlas",
    items: [
      { id: "navigation", label: "Refine sidebar navigation" },
      { id: "release", label: "Prepare the next release" },
    ],
  },
  {
    id: "website",
    label: "Website",
    items: [
      { id: "landing", label: "Polish the landing page" },
      { id: "accessibility", label: "Review keyboard accessibility" },
    ],
  },
  { id: "ideas", label: "Ideas", items: [] },
  {
    id: "recent",
    label: "Recent",
    items: [
      { id: "notes", label: "Quick notes" },
      { id: "research", label: "Research a new direction" },
    ],
  },
];

export function GroupedReorderDemo() {
  const [groups, setGroups] = useState(initialGroups);
  const [selected, select] = useState("navigation");
  const [collapsed, collapse] = useState<string[]>([]);
  const reorder = useListReorder(groups, (id, { groupId, beforeId }) => {
    setGroups((groups) => {
      const item = groups
        .flatMap((group) => group.items)
        .find((item) => item.id === id)!;
      return groups.map((group) => {
        const items = group.items.filter((item) => item.id !== id);
        if (group.id === groupId)
          items.splice(
            beforeId === null
              ? items.length
              : items.findIndex((item) => item.id === beforeId),
            0,
            item,
          );
        return { ...group, items };
      });
    });
    collapse((ids) => ids.filter((id) => id !== groupId));
  });
  return (
    <Column gap="medium" jss={{ maxWidth: 420 }}>
      <Column
        ref={reorder.ref}
        gap="small"
        aria-label="Reorderable conversations"
        jss={{
          maxHeight: 400,
          overflowY: "auto",
          overscrollBehavior: "contain",
          padding: 8,
          background: "var(--primary-background)",
          borderRadius: "var(--border-radius-m)",
        }}
      >
        {reorder.groups.map((group) => {
          const expanded = !collapsed.includes(group.id);
          const panelId = `reorder-demo-${group.id}`;
          return (
            <Column key={group.id} {...reorder.groupProps(group.id)} gap="none">
              <List ariaLabel={group.label} gap="none">
                <ListButtonItem
                  headline={group.label}
                  headlineBold
                  size="xsmall"
                  icon={
                    group.id === "recent"
                      ? "clock"
                      : expanded
                        ? "folder-open"
                        : "folder"
                  }
                  iconSize="small"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() =>
                    collapse((ids) =>
                      expanded
                        ? [...ids, group.id]
                        : ids.filter((id) => id !== group.id),
                    )
                  }
                  addOn={
                    <Row gap="small" align="center" padding={["none", "small"]}>
                      <Span size="small" color="secondary">
                        {group.items.length}
                      </Span>
                      <Icon
                        icon="chevron-right"
                        size="small"
                        color="secondary"
                        jss={{
                          transform: expanded ? "rotate(90deg)" : "none",
                          transition: "transform 180ms ease",
                          "@media (prefers-reduced-motion: reduce)": {
                            transition: "none",
                          },
                        }}
                      />
                    </Row>
                  }
                />
                <Disclosure
                  id={panelId}
                  tag="li"
                  role="rowgroup"
                  expanded={expanded}
                >
                  <BaseList role="presentation" gap="none">
                    {group.items.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <BaseView
                          tag="li"
                          role="presentation"
                          {...reorder.slotProps(group.id, item.id)}
                        />
                        <ListButtonItem
                          {...reorder.itemProps(item.id)}
                          headline={item.label}
                          size="xsmall"
                          indent={16}
                          selected={selected === item.id}
                          onClick={() => select(item.id)}
                          addOn={
                            <ContextualActions>
                              <PopoverTrigger
                                ariaLabel={`Move ${item.label}`}
                                placement="right"
                                content={({ close }) => {
                                  const move = (
                                    groupId: string,
                                    beforeId: string | null,
                                  ) => {
                                    close();
                                    reorder.move(item.id, {
                                      groupId,
                                      beforeId,
                                    });
                                  };
                                  return (
                                    <Menu
                                      label="Move conversation"
                                      onClose={close}
                                    >
                                      <MenuItem
                                        icon="arrow-up"
                                        disabled={index === 0}
                                        onClick={() =>
                                          move(
                                            group.id,
                                            group.items[index - 1].id,
                                          )
                                        }
                                      >
                                        Move up
                                      </MenuItem>
                                      <MenuItem
                                        icon="arrow-down"
                                        disabled={
                                          index === group.items.length - 1
                                        }
                                        onClick={() =>
                                          move(
                                            group.id,
                                            group.items[index + 2]?.id ?? null,
                                          )
                                        }
                                      >
                                        Move down
                                      </MenuItem>
                                      <MenuSeparator />
                                      {groups.map((target) => (
                                        <MenuItem
                                          key={target.id}
                                          icon={
                                            target.id === "recent"
                                              ? "clock"
                                              : "folder"
                                          }
                                          disabled={target.id === group.id}
                                          onClick={() => move(target.id, null)}
                                        >
                                          {target.id === "recent"
                                            ? "Move out to Recent"
                                            : `Move to ${target.label}`}
                                        </MenuItem>
                                      ))}
                                    </Menu>
                                  );
                                }}
                              >
                                {({ toggle, expanded }) => (
                                  <IconButton
                                    bare
                                    color="secondary"
                                    size="xsmall"
                                    icon="ellipsis"
                                    aria-label={`Move ${item.label}`}
                                    aria-haspopup="menu"
                                    aria-expanded={expanded}
                                    onClick={() => toggle()}
                                  />
                                )}
                              </PopoverTrigger>
                            </ContextualActions>
                          }
                        />
                      </React.Fragment>
                    ))}
                    <BaseView
                      tag="li"
                      role="presentation"
                      {...reorder.slotProps(group.id, null)}
                    />
                    {!group.items.length && (
                      <li role="row">
                        <Text
                          role="gridcell"
                          size="small"
                          color="secondary"
                          jss={{ padding: "8px 16px" }}
                        >
                          Drop a conversation here
                        </Text>
                      </li>
                    )}
                  </BaseList>
                </Disclosure>
              </List>
            </Column>
          );
        })}
      </Column>
      <Text size="small" color="secondary" ellipsis={false}>
        Drag within a project to reorder. Drop onto another project—or Recent—to
        move it. Empty and collapsed projects accept drops too.
      </Text>
      <Text size="small" color="secondary" ellipsis={false}>
        Alt+Shift+Up/Down reorders; Alt+Shift+Left/Right changes groups. Escape
        cancels a drag. The row menu offers the same moves.
      </Text>
      <Text role="status" size="small" color="secondary" ellipsis={false}>
        {reorder.announcement ||
          "Select a conversation without changing its order."}
      </Text>
      <Button
        bare
        color="secondary"
        size="small"
        jss={{ alignSelf: "flex-start" }}
        onClick={() => {
          setGroups(initialGroups);
          select("navigation");
          collapse([]);
        }}
      >
        Reset list
      </Button>
    </Column>
  );
}
