import React from "react";

import RootView from "./RootView";
import ListRow from "./ListRow";
import Sublist from "./Sublist";
import Button from "./Button";
import IconButton from "./IconButton";
import Text from "./Text";
import TextPairing from "./TextPairing";
import Icon from "./Icon";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import List from "./List";
import ListSpacer from "./ListSpacer";
import CenteredListRow from "./CenteredListRow";

import "./simple-ui.css";
import ListPressableRow from "./ListPressableRow";

function DesignBook() {
  return (
    <RootView>
      <List ariaLabel="Design book">
        <ListSpacer />
        <Sublist label="Button" initialState={{ collapsed: false }}>
          <CenteredListRow spacing="medium">
            <Button
              label="Positive button"
              color="positive"
              onPress={() => {}}
            />
          </CenteredListRow>

          <CenteredListRow spacing="medium">
            <Button
              label="Secondary button"
              color="secondary"
              onPress={() => {}}
            />
          </CenteredListRow>

          <CenteredListRow spacing="medium">
            <Button
              label="Negative button"
              color="negative"
              onPress={() => {}}
            />
          </CenteredListRow>

          <CenteredListRow spacing="medium">
            <Button
              label="Disabled button"
              color="positive"
              onPress={() => {}}
              disabled={true}
            />
          </CenteredListRow>

          <CenteredListRow spacing="medium">
            <Button
              bare={true}
              label="Bare positive button"
              color="positive"
              onPress={() => {}}
            />
          </CenteredListRow>

          <CenteredListRow spacing="medium">
            <Button
              bare={true}
              label="Bare secondary button"
              color="secondary"
              onPress={() => {}}
            />
          </CenteredListRow>

          <CenteredListRow spacing="medium">
            <Button
              bare={true}
              label="Bare negative button"
              color="negative"
              onPress={() => {}}
            />
          </CenteredListRow>

          <CenteredListRow spacing="medium">
            <Button
              bare={true}
              label="Bare disabled button"
              color="positive"
              onPress={() => {}}
              disabled={true}
            />
          </CenteredListRow>
        </Sublist>
        <ListSpacer />
        <Sublist label="Icon button" initialState={{ collapsed: false }}>
          <ListRow indentation="medium" spacing="medium">
            <IconButton
              size="large"
              icon="check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              size="medium"
              icon="check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              size="small"
              icon="check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              size="large"
              icon="check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="medium"
              icon="check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="small"
              icon="check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <IconButton
              size="large"
              icon="delete"
              color="negative"
              onPress={() => {}}
            />
            <IconButton
              size="medium"
              icon="delete"
              color="negative"
              onPress={() => {}}
            />
            <IconButton
              size="small"
              icon="delete"
              color="negative"
              onPress={() => {}}
            />
            <IconButton
              size="large"
              icon="delete"
              color="negative"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="medium"
              icon="delete"
              color="negative"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="small"
              icon="delete"
              color="negative"
              onPress={() => {}}
              bare={true}
            />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <IconButton
              size="large"
              icon="info"
              color="secondary"
              onPress={() => {}}
            />
            <IconButton
              size="medium"
              icon="info"
              color="secondary"
              onPress={() => {}}
            />
            <IconButton
              size="small"
              icon="info"
              color="secondary"
              onPress={() => {}}
            />
            <IconButton
              size="large"
              icon="info"
              color="secondary"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="medium"
              icon="info"
              color="secondary"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              size="small"
              icon="info"
              color="secondary"
              onPress={() => {}}
              bare={true}
            />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <IconButton
              disabled={true}
              size="large"
              icon="check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              disabled={true}
              size="medium"
              icon="check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              disabled={true}
              size="small"
              icon="check"
              color="positive"
              onPress={() => {}}
            />
            <IconButton
              disabled={true}
              size="large"
              icon="check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              disabled={true}
              size="medium"
              icon="check"
              color="positive"
              onPress={() => {}}
              bare={true}
            />
            <IconButton
              disabled={true}
              size="small"
              icon="check"
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
          <ListPressableRow onPress={() => {}} headline="Headline" />
          <ListPressableRow
            onPress={() => {}}
            headline="Headline"
            body="Body"
          />
          <ListPressableRow
            onPress={() => {}}
            headline="Disabled"
            body="Body"
            disabled={true}
          />
        </Sublist>
        <Sublist label="Text" initialState={{ collapsed: false }}>
          <ListRow indentation="medium" spacing="medium">
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

          <ListRow indentation="medium" spacing="medium">
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

          <ListRow indentation="medium" spacing="medium">
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

          <ListRow indentation="medium" spacing="medium">
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

          <ListRow indentation="medium" spacing="medium">
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

          <ListRow indentation="medium" spacing="medium">
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
          <ListRow indentation="medium" spacing="medium">
            <Icon size="large" color="primary" icon="check" />
            <Icon size="medium" color="primary" icon="check" />
            <Icon size="small" color="primary" icon="check" />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <Icon size="large" color="secondary" icon="check" />
            <Icon size="medium" color="secondary" icon="check" />
            <Icon size="small" color="secondary" icon="check" />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <Icon size="large" color="subtle" icon="check" />
            <Icon size="medium" color="subtle" icon="check" />
            <Icon size="small" color="subtle" icon="check" />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <Icon size="large" color="light" icon="check" />
            <Icon size="medium" color="light" icon="check" />
            <Icon size="small" color="light" icon="check" />
          </ListRow>
        </Sublist>
        <ListSpacer />
        <Sublist initialState={{ collapsed: false }} label="Text pairing">
          <ListRow indentation="medium" spacing="medium">
            <TextPairing headline="Headline" />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <TextPairing headline="Headline" body="Body" />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <TextPairing
              headline="Headline"
              body="Body"
              primaryAddOn={<Icon size="large" color="primary" icon="user" />}
            />
          </ListRow>
        </Sublist>
        <ListSpacer />
        <Sublist initialState={{ collapsed: false }} label="Input">
          <ListRow indentation="medium" spacing="medium">
            <TextInput
              value=""
              placeholder="Placeholder text input"
              onValueChange={() => {}}
            />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <TextInput
              value=""
              icon="user"
              placeholder="Placeholder text input"
              onValueChange={() => {}}
            />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <TextInput value="Text input" onValueChange={() => {}} />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <TextInput
              icon="user"
              value="Text input"
              onValueChange={() => {}}
            />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <Checkbox size="small" checked={false} onValueChange={() => {}} />
            <Checkbox size="medium" checked={false} onValueChange={() => {}} />
            <Checkbox size="large" checked={false} onValueChange={() => {}} />
          </ListRow>

          <ListRow indentation="medium" spacing="medium">
            <Checkbox size="small" checked={true} onValueChange={() => {}} />
            <Checkbox size="medium" checked={true} onValueChange={() => {}} />
            <Checkbox size="large" checked={true} onValueChange={() => {}} />
          </ListRow>
        </Sublist>
        <ListSpacer />

        <ListSpacer />
      </List>
    </RootView>
  );
}

export default React.memo(DesignBook);
