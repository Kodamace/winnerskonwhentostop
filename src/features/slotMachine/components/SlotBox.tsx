import React, { FunctionComponent } from "react";
import { StyledSlotBox } from "../styles/Styles";
import { SlotNumber } from "./SlotNumber";

interface ISlotBox {
  i: number;
  slots: number[];
  slot: number;
  loading: boolean;
  renderNumbers: boolean;
}

export const SlotBox: FunctionComponent<ISlotBox> = ({
  i,
  slots,
  slot,
  loading,
  renderNumbers,
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
        <SlotNumber number={slot} index={(i + 1) * 500} isLoading={loading} />
      )}
    </StyledSlotBox>
  );
};
