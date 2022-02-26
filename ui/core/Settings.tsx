import React, { useState, useContext } from "react";

import List from "./List";
import RootView from "./RootView";
import ListPressableRow from "./ListPressableRow";
import Icon from "./Icon";
import Box from "./Box";
import StaticCheckbox from "./StaticCheckbox";
import Text from "./Text";
import BaseView from "./BaseView";
import { createJSStyles } from "./Palette";
import ListStaticHeaderRow from "./ListStaticHeaderRow";
import ListSpacer from "./ListSpacer";
import { DarkModeContext } from "./DarkModeStore";
import Button from "./Button";
import CenteredListRow from "./CenteredListRow";
import RouterState from "./RouterState";
import ListDivider from "./ListDivider";

const jsStyles = createJSStyles({
  textIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: 32,
  },
});

const TEST_INITIAL_STATE = {
  enabled: true,
  weight: 1,
};

function Settings() {
  const { enabled: darkModeEnabled, toggle: toggleDarkMode } = useContext(
    DarkModeContext
  );
  const [writeToForeign, setWriteToForeign] = useState(TEST_INITIAL_STATE);
  const [translateToNative, setTranslateToNative] = useState(
    TEST_INITIAL_STATE
  );
  const [translateToForeign, setTranslateToForeign] = useState(
    TEST_INITIAL_STATE
  );

  const [loading, setLoading] = useState(false);
  const send = RouterState.useRouterSend();

  return (
    <RootView focusOnlyOnFirstMount={false}>
      <List ariaLabel="Settings">
        <ListPressableRow
          headline="Dark mode"
          onPress={toggleDarkMode}
          primaryAddOn={
            <Box spacing="medium">
              <Icon color="primary" size="medium" icon="moon" />
            </Box>
          }
          secondaryAddOn={
            <StaticCheckbox size="small" checked={darkModeEnabled} />
          }
        />
        <ListSpacer />
        <ListStaticHeaderRow label="Enabled tests" />
        <ListPressableRow
          headline="Write to foreign"
          onPress={() =>
            setWriteToForeign((s) => ({ ...s, enabled: !s.enabled }))
          }
          primaryAddOn={
            <Box spacing="medium">
              <Icon color="primary" size="medium" icon="edit-3" />
            </Box>
          }
          secondaryAddOn={
            <StaticCheckbox size="small" checked={writeToForeign.enabled} />
          }
        />
        <ListPressableRow
          headline="Translate to native"
          onPress={() =>
            setTranslateToNative((s) => ({ ...s, enabled: !s.enabled }))
          }
          primaryAddOn={
            <BaseView jsStyle={jsStyles.textIcon}>
              <Text size="medium" color="primary">
                A
              </Text>
            </BaseView>
          }
          secondaryAddOn={
            <StaticCheckbox size="small" checked={translateToNative.enabled} />
          }
        />
        <ListPressableRow
          headline="Translate to foreign"
          onPress={() =>
            setTranslateToForeign((s) => ({ ...s, enabled: !s.enabled }))
          }
          primaryAddOn={
            <BaseView jsStyle={jsStyles.textIcon}>
              <Text size="small" color="primary">
                文
              </Text>
            </BaseView>
          }
          secondaryAddOn={
            <StaticCheckbox size="small" checked={translateToForeign.enabled} />
          }
        />

        <ListSpacer />
        <ListDivider />
      </List>
    </RootView>
  );
}

export default React.memo(Settings);
