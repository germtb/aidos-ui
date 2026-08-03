import React from "react";

import {
  Avatar,
  AvatarStack,
  Badge,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ProgressBar,
  ProgressCircle,
  Row,
  Tabs,
  TextPairing,
  Toolbar,
} from "../../../src";

const noop = () => {};

export function CompleteInterface() {
  return (
    <Card material="aurora" variant="floating" padding="xlarge" gap="xlarge">
      <Toolbar
        headline="Atlas workspace"
        body="Product planning · 8 collaborators"
        leading={<Avatar name="Atlas workspace" size="large" />}
        actions={
          <IconButton
            aria-label="Workspace options"
            icon="ellipsis"
            color="secondary"
            bare
            onClick={noop}
          />
        }
      />

      <Tabs
        aria-controls="workspace-preview"
        variant="segmented"
        tabs={[
          { label: "Overview", selected: true, onClick: noop },
          { label: "Activity", onClick: noop },
          { label: "Files", onClick: noop },
        ]}
      />

      <Row gap="large" align="stretch" wrap>
        <Card grow basis={320} padding="xlarge">
          <TextPairing
            headline="Launch preparation"
            body="12 of 16 milestones complete"
            headlineBold
            headlineAddOn={<Badge size="small" color="highlight" />}
          />
          <ProgressBar
            progress={0.75}
            aria-label="Launch preparation progress"
          />
          <Row align="center" justify="space-between" gap="medium" wrap>
            <AvatarStack>
              <Avatar name="Maya Chen" size="small" />
              <Avatar name="Noah Williams" size="small" />
              <Avatar name="Iris Okafor" size="small" />
            </AvatarStack>
            <Button
              color="primary"
              icon="arrow-right"
              iconPosition="right"
              onClick={noop}
            >
              Open project
            </Button>
          </Row>
        </Card>

        <Card grow basis={320} variant="tonal" padding="xlarge">
          <TextPairing
            headline="Today"
            body="A focused view of what needs attention"
            headlineBold
          />
          <List ariaLabel="Today's progress" navigation={false} gap="large">
            <ListItem
              addOn={
                <ProgressCircle
                  progress={1}
                  size="small"
                  aria-label="Complete"
                />
              }
              headline="Review visual language"
              body="Completed by Maya"
              headlineBold
            />
            <ListItem
              addOn={
                <ProgressCircle
                  progress={0.62}
                  size="small"
                  aria-label="62 percent complete"
                />
              }
              headline="Prepare release notes"
              body="Due this afternoon"
              headlineBold
            />
            <ListItem
              addOn={
                <ProgressCircle
                  progress={0.2}
                  size="small"
                  color="warning"
                  aria-label="20 percent complete"
                />
              }
              headline="Validate package output"
              body="Waiting on review"
              headlineBold
            />
          </List>
        </Card>
      </Row>
    </Card>
  );
}
