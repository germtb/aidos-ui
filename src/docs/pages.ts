import { Size } from "../jss";

type PageLink = {
  type: "link";
  page: string;
  name?: string;
  headlineSize?: Size;
  headlineBold?: boolean;
};

type Page =
  | PageLink
  | {
      type: "section";
      label: string;
      content: Array<PageLink>;
    };

export const pages: Array<Page> = [
  {
    type: "link",
    page: "",
    name: "Aidos UI",
    headlineSize: "large",
    headlineBold: true,
  },
  {
    type: "section",
    label: "CSS",
    content: [{ type: "link", page: "css-in-js", name: "jss" }],
  },
  {
    type: "section",
    label: "Primary components",
    content: [
      { type: "link", page: "FlexLayout" },
      { type: "link", page: "Text" },
      { type: "link", page: "TextPairing" },
      { type: "link", page: "Icon" },
    ],
  },
  {
    type: "section",
    label: "Buttons and links",
    content: [
      { type: "link", page: "Button" },
      { type: "link", page: "Link" },
      { type: "link", page: "IconButton" },
    ],
  },
  {
    type: "section",
    label: "Inputs",
    content: [
      { type: "link", page: "TextInput" },
      { type: "link", page: "RangeInput" },
      { type: "link", page: "TimeInput" },
      { type: "link", page: "Checkbox" },
    ],
  },
  {
    type: "section",
    label: "List components",
    content: [
      { type: "link", page: "List" },
      { type: "link", page: "ListHeader" },
      { type: "link", page: "navigation", name: "List navigation" },
    ],
  },
  {
    type: "section",
    label: "Modals",
    content: [
      { type: "link", page: "Dialog" },
      { type: "link", page: "Popover" },
      { type: "link", page: "Tooltip" },
    ],
  },
  {
    type: "section",
    label: "Visual indicators",
    content: [
      { type: "link", page: "Badge" },
      { type: "link", page: "ProgressBar" },
      { type: "link", page: "ProgressCircle" },
    ],
  },
  {
    type: "section",
    label: "Complex components",
    content: [
      { type: "link", page: "Tabs" },
      { type: "link", page: "Calendar" },
    ],
  },
  {
    type: "section",
    label: "Hooks",
    content: [
      { type: "link", page: "useCookie" },
      { type: "link", page: "useNavigation" },
      { type: "link", page: "useKeyboard" },
      { type: "link", page: "useRefEffect" },
      { type: "link", page: "usePromise" },
    ],
  },
  {
    type: "section",
    label: "Utils",
    content: [{ type: "link", page: "Hashing" }],
  },
];
