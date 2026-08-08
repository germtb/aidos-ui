import React from "react";

import {
  Avatar,
  AvatarStack,
  Badge,
  Button,
  Card,
  Column,
  Icon,
  IconButton,
  Link,
  List,
  ListItem,
  ListLinkItem,
  NavigationSplitView,
  ProgressBar,
  ProgressCircle,
  Row,
  Span,
  TextInput,
  TextPairing,
  Toolbar,
} from "../../../src";
import { PreviewFrame } from "./PreviewFrame";

const noop = () => {};

export function DesktopInterface() {
  return (
    <PreviewFrame label="Desktop workspace preview" height={500} desktopOnly>
      <NavigationSplitView
        navigationWidth="240px"
        navigationInset="0px"
        jss={{ height: "100%", minHeight: 0, overflow: "hidden" }}
        compactHeader={
          <Toolbar
            padding="large"
            headline="Atlas"
            body="Launch workspace"
            headlineSize="medium"
            actions={
              <IconButton
                aria-label="Workspace menu"
                icon="ellipsis"
                color="secondary"
                bare
                onClick={noop}
              />
            }
          />
        }
        navigation={
          <Card
            material="aurora"
            variant="flat"
            padding="none"
            gap="none"
            jss={{ height: "100%" }}
          >
            <Column padding="large" gap="large">
              <Toolbar
                headline="Atlas"
                body="Launch workspace"
                headlineSize="medium"
                leading={<Avatar name="Atlas" size="small" />}
                actions={
                  <IconButton
                    aria-label="Add workspace item"
                    icon="plus"
                    color="secondary"
                    bare
                    onClick={noop}
                  />
                }
              />
              <TextInput
                placeholder="Search workspace"
                value=""
                onValueChange={noop}
                addOn={<Icon icon="search" size="medium" color="secondary" />}
              />
            </Column>

            <List ariaLabel="Workspace navigation" padding={["none", "large"]}>
              <ListLinkItem
                href="#desktop-overview"
                headline="Overview"
                icon="layout-dashboard"
                selected
              />
              <ListLinkItem
                href="#desktop-overview"
                headline="Projects"
                body="8 active"
                icon="folder"
              />
              <ListLinkItem
                href="#desktop-overview"
                headline="Field reports"
                body="3 need review"
                icon="map"
              />
              <ListLinkItem
                href="#desktop-overview"
                headline="Team"
                body="8 collaborators"
                icon="users"
              />
            </List>

            <Column padding="large">
              <Card variant="tonal" gap="medium">
                <TextPairing
                  headline="Release readiness"
                  body="12 of 16 milestones"
                  headlineBold
                />
                <ProgressBar progress={0.75} aria-label="Release readiness" />
              </Card>
            </Column>
          </Card>
        }
      >
        <Column
          id="desktop-overview"
          grow
          gap="xlarge"
          padding="xlarge"
          surface="primary"
          jss={{ height: "100%" }}
        >
          <Toolbar
            headline="Launch overview"
            body="Monday, August 3 · Updated 4 minutes ago"
            actions={
              <>
                <IconButton
                  aria-label="Share workspace"
                  icon="share-2"
                  color="secondary"
                  bare
                  onClick={noop}
                />
                <Button color="primary" icon="plus" onClick={noop}>
                  New task
                </Button>
              </>
            }
          />

          <Row gap="large" align="stretch" wrap>
            <Card grow basis={220} material="dawn" padding="xlarge">
              <TextPairing
                headline="This week"
                body="The launch is moving steadily"
                headlineBold
              />
              <List ariaLabel="Weekly progress" navigation={false}>
                <ListItem
                  addOn={
                    <ProgressCircle
                      progress={0.75}
                      size="medium"
                      aria-label="75 percent complete"
                    />
                  }
                  headline="75%"
                  headlineSize="xlarge"
                  body="4 milestones remaining"
                  headlineBold
                />
              </List>
            </Card>

            <Card grow basis={220} variant="tonal" padding="xlarge">
              <TextPairing
                headline="Team pulse"
                body="Everyone has checked in"
                headlineBold
              />
              <AvatarStack>
                <Avatar name="Maya Chen" size="medium" />
                <Avatar name="Noah Williams" size="medium" />
                <Avatar name="Iris Okafor" size="medium" />
                <Avatar name="Leo Martin" size="medium" />
              </AvatarStack>
              <Span color="secondary">6 updates shared today</Span>
            </Card>
          </Row>

          <Card padding="xlarge">
            <Toolbar
              headline="Needs attention"
              body="Two items could affect the release"
              headlineSize="medium"
              align="flex-start"
              actions={
                <Link color="primary" href="#desktop-overview" bare>
                  View all
                </Link>
              }
            />
            <List
              ariaLabel="Items needing attention"
              navigation={false}
              gap="large"
            >
              <ListItem
                icon="circle-alert"
                iconSize="large"
                headline="Validate package output"
                body="Waiting for a second review"
                headlineBold
                addOn={<Badge size="medium" color="warning" />}
              />
              <ListItem
                icon="clock"
                iconSize="large"
                headline="Finalize field notes"
                body="Due today at 16:00"
                headlineBold
                addOn={
                  <IconButton
                    aria-label="Open field notes"
                    icon="chevron-right"
                    color="secondary"
                    bare
                    onClick={noop}
                  />
                }
              />
            </List>
          </Card>
        </Column>
      </NavigationSplitView>
    </PreviewFrame>
  );
}
