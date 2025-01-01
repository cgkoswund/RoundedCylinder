import { Vector2 } from "three";
import * as React from "react";

export const BeveledCylinder = ({
  radiusTop,
  radiusBottom,
  height,
  bevelSegments,
  bevelAmount,
  segments = 32,
  children,
}) => {
  const points = React.useMemo(() => {
    const pts = [];

    // Calculate the height of the bevel
    const bevelHeight = bevelAmount * Math.sin(Math.PI / 2);

    // Bottom inside point
    pts.push(new Vector2(0, height * -0.5));

    // Bottom bevel
    for (let i = bevelSegments; i >= 0; i--) {
      const angle = (Math.PI / 2) * (i / bevelSegments);
      pts.push(
        new Vector2(
          radiusBottom - bevelAmount * (1 - Math.cos(angle)),
          height * -0.5 + bevelHeight - bevelAmount * Math.sin(angle)
        )
      );
    }

    // Top bevel
    for (let i = 0; i <= bevelSegments; i++) {
      const angle = (Math.PI / 2) * (i / bevelSegments);
      pts.push(
        new Vector2(
          radiusTop - bevelAmount * (1 - Math.cos(angle)),
          height * 0.5 - bevelHeight + bevelAmount * Math.sin(angle)
        )
      );
    }

    // Top inside point
    pts.push(new Vector2(0, height * 0.5));

    return pts;
  }, [radiusTop, radiusBottom, height, bevelSegments, bevelAmount]);

  return (
    <mesh>
      <latheGeometry args={[points, segments]} />
      {children}
    </mesh>
  );
};

export { BeveledCylinder as default };
