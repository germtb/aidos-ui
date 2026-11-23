import React, { useId, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Column,
  Composer,
  Icon,
  IconButton,
  List,
  ListButtonItem,
  Row,
  Switch,
  TabBar,
  Tabs,
  Text,
  TextInput,
  TextPairing,
  glass as glassJSS,
  type GlassThickness,
  type TabBarVariant,
  type TabsVariant,
} from "../../src";

const gradient =
  "linear-gradient(135deg, light-dark(#f4e5d6, #42342d), light-dark(#d4dfdc, #273f39))";
const thicknessOptions = [
  { value: "thin", label: "Thin" },
  { value: "regular", label: "Regular" },
  { value: "thick", label: "Thick" },
];

export function GlassMaterialDemo() {
  const [thickness, setThickness] = useState<GlassThickness>("thin");
  return (
    <Column grow basis={400} gap="medium">
      <Column
        padding="large"
        jss={{
          borderRadius: 12,
          background:
            "linear-gradient(135deg, light-dark(#fafafa, #202020), light-dark(#aaa, #686868))",
        }}
      >
        <Card grow jss={glassJSS(thickness)}>
          <TextPairing
            headline="Glass"
            body="Refraction with adjustable diffusion"
            headlineBold
          />
          <ButtonGroup
            label="Glass thickness"
            value={thickness}
            onValueChange={(value) => setThickness(value as GlassThickness)}
            options={thicknessOptions}
          />
        </Card>
      </Column>
      <Text size="small" color="secondary">
        Neutral grayscale backdrop
      </Text>
    </Column>
  );
}

export function TextInputStyleDemo({ glass = false }: { glass?: boolean }) {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  return (
    <Column gap="medium">
      <TextInput
        material={glass ? "glass" : undefined}
        aria-label={`${glass ? "Glass" : "Default"} search projects`}
        placeholder="Search projects"
        value={search}
        onValueChange={setSearch}
        addOn={<Icon icon="search" size="medium" color="secondary" />}
      />
      <TextInput
        material={glass ? "glass" : undefined}
        aria-label={`${glass ? "Glass" : "Default"} email address`}
        placeholder="Email address"
        type="email"
        value={email}
        onValueChange={setEmail}
        addOn={<Icon icon="mail" size="medium" color="secondary" />}
      />
    </Column>
  );
}

export function TabsStyleDemo({
  variant = "segmented",
  glass = false,
}: {
  variant?: TabsVariant;
  glass?: boolean;
}) {
  const id = useId();
  const [selected, setSelected] = useState("Overview");
  return (
    <Column gap="large">
      <Tabs
        material={glass ? "glass" : undefined}
        variant={variant}
        aria-label={`${glass ? "Glass" : variant} tabs`}
        aria-controls={`${id}-panel`}
        tabs={["Overview", "Activity", "Settings"].map((label) => ({
          id: `${id}-${label}`,
          label,
          selected: selected === label,
          onClick: () => setSelected(label),
        }))}
      />
      <Text
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${selected}`}
        color="secondary"
        size="small"
      >
        {selected} panel
      </Text>
    </Column>
  );
}

export function TabBarStyleDemo({
  variant = "default",
  glass = false,
}: {
  variant?: TabBarVariant;
  glass?: boolean;
}) {
  const [selected, setSelected] = useState("Home");
  return (
    <TabBar
      material={glass ? "glass" : undefined}
      variant={variant}
      aria-label={`${glass ? "Glass" : variant} navigation`}
      tabs={[
        {
          label: "Home",
          icon: "house",
          selected: selected === "Home",
          onClick: () => setSelected("Home"),
        },
        {
          label: "Search",
          icon: "search",
          selected: selected === "Search",
          onClick: () => setSelected("Search"),
        },
        {
          label: "Profile",
          icon: "user",
          selected: selected === "Profile",
          onClick: () => setSelected("Profile"),
        },
      ]}
    />
  );
}

export function SwitchStyleDemo({ glass = false }: { glass?: boolean }) {
  const [notifications, setNotifications] = useState(true);
  const [sync, setSync] = useState(false);
  return (
    <Column gap="large">
      {[
        {
          label: "Notifications",
          checked: notifications,
          change: setNotifications,
        },
        { label: "Sync across devices", checked: sync, change: setSync },
        {
          label: "Managed setting",
          checked: true,
          change: setNotifications,
          disabled: true,
        },
      ].map(({ label, checked, change, disabled }) => (
        <Row key={label} align="center" justify="space-between" gap="medium">
          <Text color={disabled ? "subtle" : "primary"}>{label}</Text>
          <Switch
            material={glass ? undefined : "solid"}
            label={`${glass ? "Glass" : "Solid"} ${label.toLowerCase()}`}
            checked={checked}
            onCheckedChange={change}
            disabled={disabled}
          />
        </Row>
      ))}
    </Column>
  );
}

export function ListStyleDemo({
  background,
}: {
  background: "plain" | "gradient";
}) {
  const [selected, setSelected] = useState("Files");
  return (
    <Column gap="large">
      <Text bold>
        {background === "gradient" ? "Gradient background" : "Plain background"}
      </Text>
      <Row wrap gap="large" align="stretch">
        {[false, true].map((glass) => (
          <Column key={String(glass)} grow basis={400} gap="medium">
            <Text size="small" color="secondary">
              {glass ? "Glass surface" : "Default"}
            </Text>
            <Column
              padding="xlarge"
              jss={{
                borderRadius: 12,
                background:
                  background === "gradient"
                    ? gradient
                    : "var(--secondary-background)",
              }}
            >
              <List
                material={glass ? "glass" : undefined}
                padding="medium"
                jss={{ borderRadius: 12 }}
                ariaLabel={`${glass ? "Glass surface" : "Default"} list on ${background} background`}
              >
                <ListButtonItem
                  headline="Files"
                  icon="folder"
                  selected={selected === "Files"}
                  onClick={() => setSelected("Files")}
                />
                <ListButtonItem
                  headline="Activity"
                  icon="clock"
                  selected={selected === "Activity"}
                  onClick={() => setSelected("Activity")}
                />
                <ListButtonItem
                  headline="Archive"
                  icon="archive"
                  disabled
                  onClick={() => setSelected("Archive")}
                />
              </List>
            </Column>
          </Column>
        ))}
      </Row>
    </Column>
  );
}

export function ActionStyleDemo({ glass = false }: { glass?: boolean }) {
  const [count, setCount] = useState(0);
  const [following, setFollowing] = useState(false);
  return (
    <Column gap="large">
      <Row wrap gap="medium" align="center">
        <Button
          material={glass ? "glass" : undefined}
          color="secondary"
          onClick={() => setCount(count + 1)}
        >
          Action
        </Button>
        <IconButton
          material={glass ? "glass" : undefined}
          color="secondary"
          icon={following ? "bell-ring" : "bell"}
          aria-label={`${glass ? "Glass" : "Default"} notifications`}
          aria-pressed={following}
          onClick={() => setFollowing(!following)}
        />
        <Button
          material={glass ? "glass" : undefined}
          color="secondary"
          disabled
          onClick={() => setCount(count + 1)}
        >
          Disabled
        </Button>
      </Row>
      <Text size="small" color="secondary" role="status">
        {count} activations
      </Text>
    </Column>
  );
}

export function ComposerStyleDemo({ glass = false }: { glass?: boolean }) {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState("");
  const [thickness, setThickness] = useState<GlassThickness>("thin");
  return (
    <Column gap="large">
      {glass && (
        <ButtonGroup
          label="Composer glass thickness"
          value={thickness}
          onValueChange={(value) => setThickness(value as GlassThickness)}
          options={thicknessOptions}
        />
      )}
      <Composer
        material={glass ? "glass" : undefined}
        glassThickness={thickness}
        aria-label={`${glass ? "Glass" : "Default"} composer`}
        placeholder="Write a message…"
        value={draft}
        onValueChange={setDraft}
        onSubmit={() => {
          setSent(draft);
          setDraft("");
        }}
        footer={
          <Text size="small" color="secondary" jss={{ paddingInline: 6 }}>
            Local draft
          </Text>
        }
      />
      <Text size="small" color="secondary" role="status" ellipsis={false}>
        {sent ? `Sent: ${sent}` : "Enter sends · Shift+Enter adds a line"}
      </Text>
    </Column>
  );
}
