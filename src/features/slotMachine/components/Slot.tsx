import React, { FunctionComponent, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

const SlotIcon = styled.span`
  display: block;
`;

interface IProps {
  iconCount?: number;
  landingPos?: number;
  index: number;
}

const Slot: FunctionComponent<IProps> = ({
  iconCount = 10,
  landingPos = 0,
  index,
}) => {
  const { y } = useSpring({
    from: { y: 0 },
    to: { y: -(20 * 28 + landingPos * 28) },
    // loop: true,
    config: {
      mass: 20,
      tension: 60,
      friction: 60,
      clamp: true,
    },
    delay: index * 500,
  });

  const slots = [...Array(iconCount).keys()];
  const totalSlots = slots.concat(slots).concat(slots);

  return (
    <animated.div
      style={{
        position: "absolute",
        top: y,
      }}
    >
      {totalSlots.map((icon) => (
        <SlotIcon>{icon}</SlotIcon>
      ))}
    </animated.div>
  );
};

export default Slot;
