import React, { useEffect, useState } from "react";
import { Currency } from "../../core/components/Inventory";
import { world, getHero, getWave, getEncounter } from "../../core/World";
import Encounter from "./Encounter";
import Footer from "./Footer";
import List from "./List";
import ListStaticRow from "./ListStaticRow";
import Loop from "./Loop";
import { createJSStyles } from "./Palette";
import RootView from "./RootView";
import Text from "./Text";

const jsStyles = createJSStyles({
  list: {
    flexGrow: 1,
    flexShrink: 0,
    minHeight: 0,
  },
});

function Menu() {
  const [_, setState] = useState(world);

  useEffect(() => {
    return world.time.onFrame(() => {
      setState({ ...world });
    });
  }, []);

  const hero = getHero();
  const wave = getWave();
  const encounter = getEncounter();

  return (
    <RootView focusOnlyOnFirstMount={false}>
      <List jsStyle={jsStyles.list} ariaLabel="Menu">
        <ListStaticRow
          headline="Souls"
          secondaryAddOn={
            <Text color="secondary">
              {hero.getInventory().get(Currency.Soul)}
            </Text>
          }
        />

        {wave != null && encounter != null && (
          <Encounter encounter={encounter} name={wave.getName()} />
        )}

        <Loop hero={hero} />
      </List>
      <Footer character={hero} />
    </RootView>
  );
}

export default Menu;
