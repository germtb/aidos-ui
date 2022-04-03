import React from "react";
import { useState } from "react";
import { Currency } from "../../core/components/Inventory";
import { Character } from "../../core/entities/Character";
import { resolveRequirement } from "../../core/Requirement";
import BaseView from "./BaseView";
import Button from "./Button";
import Text from "./Text";
import Column from "./Column";
import ListPressableRow from "./ListPressableRow";
import Row from "./Row";
import ListSpacer from "./ListSpacer";
import ListDivider from "./ListDivider";
import ListStaticRow from "./ListStaticRow";
import ListStaticHeaderRow from "./ListStaticHeaderRow";

// const jsStyles = createJSStyles({
//   list: {
//     flexGrow: 1,
//     flexShrink: 0,
//     minHeight: 0,
//   },
// });

export default function Footer({ character }: { character: Character }) {
  const [activeTab, setActiveTab] = useState(0);
  const disabled =
    character.getUpgradeCost() > character.getInventory().get(Currency.Soul);

  return (
    <Column>
      <ListSpacer />
      <ListDivider />
      {activeTab === 0 && (
        <Column>
          <ListStaticHeaderRow
            label="Upgrade cost"
            secondaryAddOn={
              <Text color="secondary">
                {character.getUpgradeCost()}
              </Text>
            }
          />
          {character.getUpgrades().map((upgrade) => {
            return (
              <ListPressableRow
                key={upgrade.skill.ID}
                headline={upgrade.skill.name}
                disabled={disabled}
                onPress={() => {
                  character.tryPurchase(upgrade);
                }}
              ></ListPressableRow>
            );
          })}
        </Column>
      )}

      <Row role="tablist" aria-label="Footer">
        <Button
          role="tab"
          id="tab0"
          aria-selected={activeTab === 0}
          label="Upgrades"
          icon="activity"
          color={activeTab === 0 ? "positive" : "secondary"}
          onPress={() => {
            if (activeTab === 0) {
              setActiveTab(null);
            } else {
              setActiveTab(0);
            }
          }}
        />
        <Button
          role="tab"
          id="tab1"
          aria-selected={activeTab === 1}
          label="Stats"
          icon="user"
          color={activeTab === 1 ? "positive" : "secondary"}
          onPress={() => {
            if (activeTab === 1) {
              setActiveTab(null);
            } else {
              setActiveTab(1);
            }
          }}
        />
        <Button
          role="tab"
          id="tab1"
          aria-selected={activeTab === 2}
          label="Titles"
          icon="user-plus"
          color={activeTab === 2 ? "positive" : "secondary"}
          onPress={() => {
            if (activeTab === 2) {
              setActiveTab(null);
            } else {
              setActiveTab(2);
            }
          }}
        />
      </Row>
    </Column>
  );
}
