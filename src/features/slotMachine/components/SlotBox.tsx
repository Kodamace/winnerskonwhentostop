import React, { FunctionComponent } from "react";
import { StyledSlotBox } from "../styles/Styles";
import Slot from "./Slot";
import { SlotNumber } from "./SlotNumber";

interface ISlotBox {
  i: number;
  slots: number[];
  slot: number;
  loading: boolean;
  renderNumbers: boolean;
  landingPos: number;
}

export const SlotBox: FunctionComponent<ISlotBox> = ({
  i,
  slots,
  slot,
  loading,
  renderNumbers,
  landingPos = 0,
}) => {
  const showBorderRight = (index: number, arr: any[]) => {
    if (index + 1 === arr.length) {
      return true;
    }
    return false;
  };

  return (
    <StyledSlotBox
      theme={`${
        showBorderRight(i, slots) ? "hideBorderRight" : "showBorderRight"
      }`}
    >
      {renderNumbers && (
        <Slot iconCount={10} landingPos={landingPos} index={i} />
      )}
      {!renderNumbers && <div style={{ position: "absolute", top: -2 }}>-</div>}
    </StyledSlotBox>
  );
};
