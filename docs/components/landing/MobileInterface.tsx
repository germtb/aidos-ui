import React from "react";

import {
  Avatar,
  Card,
  Column,
  Icon,
  IconButton,
  List,
  ListItem,
  ProgressBar,
  Row,
  Span,
  TabBar,
  TextPairing,
  Toolbar,
} from "../../../src";
import { PreviewFrame } from "./PreviewFrame";

const noop = () => {};

export function MobileInterface() {
  return (
    <PreviewFrame
      label="Mobile workspace preview"
      height={650}
      maxWidth={420}
      header={
        <Toolbar
          headline="Field notes"
          body="Monday, August 3"
          headlineSize="medium"
          leading={<Avatar name="Maya Chen" />}
          actions={
            <>
              <IconButton
                aria-label="Notifications"
                icon="bell"
                color="secondary"
                bare
                onClick={noop}
              />
              <IconButton
                aria-label="Settings"
                icon="settings"
                color="secondary"
                bare
                onClick={noop}
              />
            </>
          }
          actionsGap="small"
        />
      }
    >
      <Column grow gap="large" padding="large" surface="primary">
        <TextPairing
          headline="Good morning, Maya"
          body="Here is what is moving today."
          headlineSize="xlarge"
          headlineBold
        />

        <Card material="dawn" padding="xlarge">
          <Toolbar
            headline="Weekly focus"
            body="Three field reports left to review"
            headlineSize="medium"
            actions={
              <Span size="large" color="highlight" bold>
                68%
              </Span>
            }
          />
          <ProgressBar progress={0.68} aria-label="Weekly focus progress" />
        </Card>

        <Row gap="medium" align="stretch">
          <Card grow variant="tonal" gap="small">
            <Icon icon="map" size="large" color="highlight" />
            <TextPairing
              headline="12 places"
              body="4 newly mapped"
              headlineBold
            />
          </Card>
          <Card grow variant="tonal" gap="small">
            <Icon icon="images" size="large" color="highlight" />
            <TextPairing
              headline="86 photos"
              body="Ready to organize"
              headlineBold
            />
          </Card>
        </Row>

        <Card gap="medium">
          <List ariaLabel="Upcoming survey" navigation={false}>
            <ListItem
              addOn={
                <Icon icon="calendar-days" size="large" color="secondary" />
              }
              headline="Coastal survey"
              body="Today at 14:30 · North trail"
              headlineBold
              outerAddOn={
                <IconButton
                  aria-label="Open survey"
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

      <Column padding="large" surface="primary">
        <TabBar
          variant="floating"
          tabs={[
            { label: "Today", icon: "house", href: "#mobile", selected: true },
            { label: "Explore", icon: "compass", href: "#mobile" },
            { label: "Profile", icon: "user", href: "#mobile" },
          ]}
        />
      </Column>
    </PreviewFrame>
  );
}
