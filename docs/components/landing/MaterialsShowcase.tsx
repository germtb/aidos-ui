import React from "react";

import { Card, Row, TextPairing } from "../../../src";

export function MaterialsShowcase() {
  return (
    <Row gap="large" align="stretch" wrap>
      <Card grow basis={320} material="aurora">
        <TextPairing
          headline="Aurora"
          body="Diffuse blue-green light"
          headlineBold
        />
      </Card>
      <Card grow basis={320} material="dawn">
        <TextPairing
          headline="Dawn"
          body="Pale sky, peach, and restrained gold"
          headlineBold
        />
      </Card>
      <Card grow basis={320} material="mist">
        <TextPairing
          headline="Mist"
          body="Neutral, milky diffusion"
          headlineBold
        />
      </Card>
      <Card grow basis={320} material="twilight">
        <TextPairing
          headline="Twilight"
          body="Indigo with fading violet warmth"
          headlineBold
        />
      </Card>
    </Row>
  );
}
