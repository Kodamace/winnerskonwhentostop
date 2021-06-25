import styled, { css } from "styled-components";
import { prop, ifProp, switchProp } from "styled-tools";

export const StyledPointsView = styled.div``;

export const StyledSLotsScreen = styled.div`
  display: flex;
  border: 4px solid black;
  border-radius: 33px;
  justify-content: center;
  height: 24px;
  overflow: hidden;
`;

export const StyledSlotBox = styled.div`
  width: ${switchProp("theme", {
    hideBorderRight: "50px",
    showBorderRight: "50px",
  } as any)};
  height: ${switchProp("theme", {
    hideBorderRight: "50px",
    showBorderRight: "50px",
  } as any)};
  display: ${switchProp("theme", {
    hideBorderRight: "flex",
    showBorderRight: "flex",
  } as any)};
  justify-content: ${switchProp("theme", {
    hideBorderRight: "center",
    showBorderRight: "center",
  } as any)};
  align-items: ${switchProp("theme", {
    hideBorderRight: "center",
    showBorderRight: "center",
  } as any)};
  border-right: ${switchProp("theme", {
    hideBorderRight: "none",
    showBorderRight: "1px solid black",
  } as any)};
  position: relative;
`;

export const StyledActions = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StyledSpinSLotsButton = styled.button`
  background-color: purple;
  color: white;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  height: 50px;
  width: 80px;
  border-radius: 33px;
`;

export const StyledBetInput = styled.div`
  && {
    p {
      font-size: 10px;
      margin: 0px;
      margin-top: 10px;
    }
    input {
      width: 50px;
      fontsize: 18px;
      padding: 5px;
    }
  }
`;
