import React, { useContext, useState } from "react";

import { RootView } from "./RootView";
import { ListRow } from "./ListRow";
import { Sublist } from "./Sublist";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Text } from "./Text";
import { TextPairing } from "./TextPairing";
import { Icon } from "./Icon";
import { TextInput } from "./TextInput";
import { Checkbox } from "./Checkbox";
import { List } from "./List";
import { ListSpacer } from "./ListSpacer";
import { CenteredListRow } from "./CenteredListRow";

import { ListPressableRow } from "./ListPressableRow";
import { Dialog, useDialog } from "./Dialog";
import { Row } from "./Row";
import { DarkModeContext } from "./DarkMode";
import { Popover, PopoverTrigger } from "./Popover";
import { Tooltip } from "./Tooltip";
import { Link } from "./Link";
import { getBackground, withMedia } from "./jss";
import { Calendar } from "./Calendar";
import { Box } from "./Box";
import { Badge } from "./Badge";

function ExampleDialog({ close }) {
  const darkMode = useContext(DarkModeContext);
  return (
    <Dialog close={close} label="Example">
      <Row padding="medium" align="center" justify="space-between">
        <Text>Dark mode</Text>
        <Checkbox
          size="medium"
          checked={darkMode.enabled}
          onClick={() => darkMode.toggle()}
        />
      </Row>
    </Dialog>
  );
}

export function DesignBook() {
  const dialog = useDialog<void>(
    ({ close }) => <ExampleDialog close={close} />,
    { closeOnOutsideClick: true }
  );

  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(true);
  const [checkbox3, setCheckbox3] = useState(true);
  const [checkbox4, setCheckbox4] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [checkbox6, setCheckbox6] = useState(false);

  return (
    <RootView>
      <List navigation={false} ariaLabel="Design book">
        <ListSpacer />
        <Sublist label="Button" initialState={{ collapsed: false }}>
          <CenteredListRow gap="medium">
            <Button
              label="Positive button"
              color="positive"
              onPress={() => {
                dialog.open();
              }}
            />
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <PopoverTrigger
              PopoverComponent={({ close }) => {
                return (
                  <Popover close={close}>
                    <List navigation={false} ariaLabel="Popover ">
                      <ListPressableRow
                        gap="medium"
                        addOn={
                          <Icon
                            size="medium"
                            color="primary"
                            icon="fa-address-book"
                          />
                        }
                        headline="Option 1"
                        onClick={() => {}}
                      ></ListPressableRow>
                      <ListPressableRow
                        gap="medium"
                        addOn={
                          <Icon
                            size="medium"
                            color="primary"
                            icon="fa-adjust"
                          />
                        }
                        headline="Option 2"
                        onClick={() => {}}
                        withDivider={false}
                      ></ListPressableRow>
                    </List>
                  </Popover>
                );
              }}
            >
              {({ toggle }) => (
                <Button
                  style={{ position: "relative" }}
                  label="Secondary button"
                  color="secondary"
                  onPress={() => {
                    toggle(undefined);
                  }}
                />
              )}
            </PopoverTrigger>
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <PopoverTrigger
              PopoverComponent={({ close }) => {
                return (
                  <Popover close={close}>
                    <List ariaLabel="Popover ">
                      <ListPressableRow
                        gap="medium"
                        addOn={
                          <Icon
                            size="medium"
                            color="primary"
                            icon="fa-address-book"
                          />
                        }
                        headline="Option 1"
                        onClick={() => {}}
                      ></ListPressableRow>
                      <ListPressableRow
                        gap="medium"
                        addOn={
                          <Icon
                            size="medium"
                            color="primary"
                            icon="fa-adjust"
                          />
                        }
                        headline="Option 2"
                        onClick={() => {}}
                        withDivider={false}
                      ></ListPressableRow>
                    </List>
                  </Popover>
                );
              }}
            >
              {({ toggle }) => (
                <Button
                  label="Negative button"
                  color="negative"
                  onPress={() => {
                    toggle(undefined);
                  }}
                />
              )}
            </PopoverTrigger>
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Tooltip content="Tooltip here">
              <Button
                label="Disabled button"
                color="positive"
                onPress={() => {}}
                disabled={true}
              />
            </Tooltip>
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Button
              bare={true}
              label="Bare positive button"
              color="positive"
              onPress={() => {}}
            />
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Button
              bare={true}
              label="Bare secondary button"
              color="secondary"
              onPress={() => {}}
            />
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Button
              bare={true}
              label="Bare negative button"
              color="negative"
              onPress={() => {}}
            />
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Button
              bare={true}
              label="Bare disabled button"
              color="positive"
              onPress={() => {}}
              disabled={true}
            />
          </CenteredListRow>
        </Sublist>

        <Sublist label="Link" initialState={{ collapsed: false }}>
          <CenteredListRow gap="medium">
            <Link label="Positive link" color="positive" href="/" />
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Link label="Secondary link" color="secondary" href="/" />
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Tooltip content="Tooltip here">
              <Link
                label="Disabled link"
                color="positive"
                href="/"
                disabled={true}
              />
            </Tooltip>
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Link
              bare={true}
              label="Bare positive Link"
              color="positive"
              href="/"
            />
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Link
              bare={true}
              label="Bare secondary Link"
              color="secondary"
              href="/"
            />
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Link
              bare={true}
              label="Bare negative Link"
              color="negative"
              href="/"
            />
          </CenteredListRow>

          <CenteredListRow gap="medium">
            <Link
              bare={true}
              label="Bare disabled Link"
              color="positive"
              href="/"
              disabled={true}
            />
          </CenteredListRow>
        </Sublist>

        <Sublist label="Responsiveness" initialState={{ collapsed: false }}>
          <Row
            padding="medium"
            jsStyle={withMedia({
              phone: getBackground("negative"),
              tablet: getBackground("divider"),
              laptop: getBackground("highlight"),
              desktop: getBackground("warning"),
            })}
          >
            <Text>Background will change with screen size</Text>
          </Row>
        </Sublist>

        <ListSpacer />
        <Sublist label="Icon button" initialState={{ collapsed: false }}>
          <ListRow padding="medium" gap="medium">
            <IconButton
              size="large"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              size="medium"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              size="small"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              size="large"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="medium"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="small"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <IconButton
              size="large"
              icon="fa-remove"
              color="negative"
              onPress={() => {}}
            />
            <IconButton
              size="medium"
              icon="fa-remove"
              color="negative"
              onPress={() => {}}
            />
            <IconButton
              size="small"
              icon="fa-remove"
              color="negative"
              onPress={() => {}}
            />
            <IconButton
              size="large"
              icon="fa-remove"
              color="negative"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="medium"
              icon="fa-remove"
              color="negative"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="small"
              icon="fa-remove"
              color="negative"
              onPress={() => {}}
              bare={true}
            />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <IconButton
              size="large"
              icon="fa-info"
              color="secondary"
              onPress={() => {}}
            />
            <IconButton
              size="medium"
              icon="fa-info"
              color="secondary"
              onPress={() => {}}
            />
            <IconButton
              size="small"
              icon="fa-info"
              color="secondary"
              onPress={() => {}}
            />
            <IconButton
              size="large"
              icon="fa-info"
              color="secondary"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="medium"
              icon="fa-info"
              color="secondary"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="small"
              icon="fa-info"
              color="secondary"
              onPress={() => {}}
              bare={true}
            />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <IconButton
              disabled={true}
              size="large"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              disabled={true}
              size="medium"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              disabled={true}
              size="small"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              disabled={true}
              size="large"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              disabled={true}
              size="medium"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              disabled={true}
              size="small"
              icon="fa-check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
          </ListRow>
        </Sublist>
        <ListSpacer />
        <Sublist
          label="Pressable list row"
          initialState={{
            collapsed: false,
          }}
        >
          <ListPressableRow onClick={() => {}} headline="Headline" />
          <ListPressableRow
            selected={true}
            onClick={() => {}}
            headline="Selected"
          />
          <ListPressableRow
            onClick={() => {}}
            headline="Headline"
            body="Body"
          />
          <ListPressableRow
            onClick={() => {}}
            headline="Disabled"
            body="Body"
            disabled={true}
          />
          <ListPressableRow
            gap="medium"
            addOn={
              <Box padding="medium">
                <Icon size="medium" color="primary" icon="fa-address-book" />
              </Box>
            }
            headline="Really long body"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            onClick={() => {}}
          ></ListPressableRow>
        </Sublist>
        <Sublist label="Text" initialState={{ collapsed: false }}>
          <ListRow padding="medium" gap="medium">
            <Text size="large" color="primary">
              Primary large
            </Text>
            <Text size="medium" color="primary">
              Primary medium
            </Text>
            <Text size="small" color="primary">
              Primary small
            </Text>
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <Text size="large" color="secondary">
              Secondary large
            </Text>
            <Text size="medium" color="secondary">
              Secondary medium
            </Text>
            <Text size="small" color="secondary">
              Secondary small
            </Text>
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <Text size="large" color="subtle">
              Subtle large
            </Text>
            <Text size="medium" color="subtle">
              Subtle medium
            </Text>
            <Text size="small" color="subtle">
              Subtle small
            </Text>
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <Text size="large" color="light">
              Light large
            </Text>
            <Text size="medium" color="light">
              Light medium
            </Text>
            <Text size="small" color="light">
              Light small
            </Text>
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <Text size="large" color="highlight">
              Highlight large
            </Text>
            <Text size="medium" color="highlight">
              Highlight medium
            </Text>
            <Text size="small" color="highlight">
              Highlight small
            </Text>
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <Text size="large" color="negative">
              Negative large
            </Text>
            <Text size="medium" color="negative">
              Negative medium
            </Text>
            <Text size="small" color="negative">
              Negative small
            </Text>
          </ListRow>
        </Sublist>
        <ListSpacer />
        <Sublist initialState={{ collapsed: false }} label="Icon">
          <ListRow padding="medium" gap="medium">
            <Icon size="large" color="primary" icon="fa-check" />
            <Icon size="medium" color="primary" icon="fa-check" />
            <Icon size="small" color="primary" icon="fa-check" />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <Icon size="large" color="secondary" icon="fa-check" />
            <Icon size="medium" color="secondary" icon="fa-check" />
            <Icon size="small" color="secondary" icon="fa-check" />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <Icon size="large" color="subtle" icon="fa-check" />
            <Icon size="medium" color="subtle" icon="fa-check" />
            <Icon size="small" color="subtle" icon="fa-check" />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <Icon size="large" color="light" icon="fa-check" />
            <Icon size="medium" color="light" icon="fa-check" />
            <Icon size="small" color="light" icon="fa-check" />
          </ListRow>
        </Sublist>
        <ListSpacer />
        <Sublist initialState={{ collapsed: false }} label="Text pairing">
          <ListRow padding="medium" gap="medium">
            <TextPairing headline="Headline" />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <TextPairing headline="Headline" body="Body" />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <TextPairing
              headline="Headline"
              body="Body"
              addOn={<Icon size="large" color="primary" icon="fa-user" />}
            />
          </ListRow>
        </Sublist>
        <ListSpacer />
        <Sublist initialState={{ collapsed: false }} label="Input">
          <ListRow padding="medium" gap="medium">
            <TextInput
              value=""
              placeholder="Placeholder text input"
              onValueChange={() => {}}
            />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <TextInput
              value=""
              icon="fa-user"
              placeholder="Placeholder text input"
              onValueChange={() => {}}
            />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <TextInput value="Text input" onValueChange={() => {}} />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <TextInput
              icon="fa-user"
              value="Text input"
              onValueChange={() => {}}
            />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <Checkbox
              size="small"
              checked={checkbox1}
              onClick={() => setCheckbox1((x) => !x)}
            />
            <Checkbox
              size="medium"
              checked={checkbox2}
              onClick={() => setCheckbox2((x) => !x)}
            />
            <Checkbox
              size="large"
              checked={checkbox3}
              onClick={() => setCheckbox3((x) => !x)}
            />
          </ListRow>

          <ListRow padding="medium" gap="medium">
            <Checkbox
              size="small"
              checked={checkbox4}
              onClick={() => setCheckbox4((x) => !x)}
            />
            <Checkbox
              size="medium"
              checked={checkbox5}
              onClick={() => setCheckbox5((x) => !x)}
            />
            <Checkbox
              size="large"
              checked={checkbox6}
              onClick={() => setCheckbox6((x) => !x)}
            />
          </ListRow>
        </Sublist>
        <ListSpacer />

        <ListSpacer />

        <Sublist label="Calendar">
          <Calendar
            date={new Date()}
            header={({ weekday }) => (
              <Box>
                <Text>{weekday}</Text>
              </Box>
            )}
            cell={({ today, date, outOfMonth }) => (
              <Box relative={true} style={{ opacity: outOfMonth ? 0.2 : 1 }}>
                {today && (
                  <Badge
                    jsStyle={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%) translateX(-75%)",
                      right: "50%",
                    }}
                  />
                )}
                <Text>{date.getDate()}</Text>
              </Box>
            )}
          />
        </Sublist>
      </List>
    </RootView>
  );
}
