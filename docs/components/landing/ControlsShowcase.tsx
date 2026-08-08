import React from "react";

import {
  Badge,
  Button,
  Card,
  Icon,
  Link,
  List,
  ListItem,
  Row,
  TextInput,
  TextPairing,
} from "../../../src";

const noop = () => {};

export function ControlsShowcase() {
  return (
    <Row gap="large" align="stretch" wrap>
      <Card grow basis={320} variant="tonal" padding="xlarge">
        <TextPairing
          headline="Find anything"
          body="Inputs support add-ons, validation, and accessible focus treatment."
          headlineBold
        />
        <TextInput
          placeholder="Search projects"
          value=""
          onValueChange={noop}
          addOn={<Icon icon="search" size="medium" color="secondary" />}
        />
        <TextInput
          placeholder="Invite by email"
          value=""
          onValueChange={noop}
          addOn={<Icon icon="mail" size="medium" color="secondary" />}
        />
        <Row gap="medium" justify="flex-end" wrap>
          <Button color="secondary" bare onClick={noop}>
            Cancel
          </Button>
          <Button color="primary" icon="send" onClick={noop}>
            Send invite
          </Button>
        </Row>
      </Card>

      <Card grow basis={320} padding="xlarge">
        <TextPairing
          headline="Useful defaults"
          body="Every component remains adjustable through typed props and JSS composition."
          headlineBold
        />
        <List ariaLabel="Library defaults" navigation={false} gap="medium">
          <ListItem
            headline="Keyboard navigation"
            headlineColor="secondary"
            addOn={<Badge size="medium" color="highlight" />}
          />
          <ListItem
            headline="Light and dark themes"
            headlineColor="secondary"
            addOn={<Badge size="medium" color="highlight" />}
          />
          <ListItem
            headline="Responsive primitives"
            headlineColor="secondary"
            addOn={<Badge size="medium" color="highlight" />}
          />
        </List>
        <Link color="primary" href="/Button" icon="component" bare>
          Browse component APIs
        </Link>
      </Card>
    </Row>
  );
}
