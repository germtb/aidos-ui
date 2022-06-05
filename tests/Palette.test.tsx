import { createJSStyle } from "../src/Palette";

let counter = 0;

jest.mock("../guid", () => ({
  guid: () => {
    counter += 1;
    return `ID-${counter}`;
  },
}));

describe("createJSStyle", () => {
  beforeEach(() => {
    counter = 0;
  });

  it("should create aliased styles", () => {
    expect(
      createJSStyle({
        margin: 10,
      })
    ).toEqual("ID-1 ID-2 ID-3 ID-4");
    expect(getStylesheet()).toEqual({
      "margin-top": {
        10: {
          className: "ID-4",
          selector: "ID-4",
          type: "SIMPLE",
        },
      },
      "margin-bottom": {
        10: {
          className: "ID-3",
          selector: "ID-3",
          type: "SIMPLE",
        },
      },
      "margin-left": {
        10: {
          className: "ID-2",
          selector: "ID-2",
          type: "SIMPLE",
        },
      },
      "margin-right": {
        10: {
          className: "ID-1",
          selector: "ID-1",
          type: "SIMPLE",
        },
      },
    });
  });
});
