import React, { useEffect, useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { SlotBox } from "./components/SlotBox";
import {
  awardPointsAfterWinning,
  handleTimeOut,
} from "./helpers/handleTimeOuts";
import {
  awardPoints,
  setBetAmount,
  SlotMachineState,
  spinSlots,
  spinWinningSlot,
} from "./slotMachineSlice";
import {
  StyledActions,
  StyledBetInput,
  StyledPointsView,
  StyledSLotsScreen,
  StyledSpinSLotsButton,
} from "./styles/Styles";

export const SlotMachine = () => {
  const [renderNumbers, setRenderNumbers] = useState(false);
  const [count, setCount] = useState(0);
  const [slotQuantity, setSlotQuantity] = useState(5);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(false);

  const dispatch = useDispatch();

  const slotMachine: SlotMachineState = useSelector(
    (state: RootState) => state.slotMachine
  );

  const { slots, loading, points, betAmount, winnings } = slotMachine;

  // when the user its the correct probability amount and the click amount is equal to that we run our winning strategy
  const handleWinningStrategy = () => {
    setCount(0);
    dispatch(spinWinningSlot({ slotQuantity, range: 9 }));
  };

  // To just handle the local component state when clicking
  const handleSpinClickStateUpdate = () => {
    if (count > 5) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
    setRenderNumbers(false);
    setWinner(false);
    setSpinning(true);
  };

  //  Our function that makes it all happen
  const handleSpinSLots = (probability: number) => {
    if (points < betAmount)
      if (points <= 0) {
        return window.alert("You are outta points mate");
      } else {
        return window.alert(
          "Sorry not enough points to bet please bet a lower amount"
        );
      }
    handleSpinClickStateUpdate();
    // we check with regards to our probability amount that we pass as a parameter that the radom values are within scope of the set probability
    // we then check if our result and count match up and handle whether to make the user win or not
    if (Math.floor(Math.random() * probability) === count) {
      handleWinningStrategy();
      handleTimeOut(slotQuantity, false, setSpinning);
    } else {
      dispatch(spinSlots({ slotQuantity, range: 9 }));
      handleTimeOut(slotQuantity, false, setSpinning);
    }
  };

  useEffect(() => {
    setRenderNumbers(true);
    return () => setRenderNumbers(false);
  }, [renderNumbers]);

  useEffect(() => {
    dispatch(spinSlots({ slotQuantity, range: 9 }));
  }, []);

  useEffect(() => {
    if (slots.length > 0) {
      const allEqual = (arr: number[]) => arr.every((val) => val === arr[0]);
      let equal = allEqual(slots);
      if (equal && !loading) {
        // make sure to only award points after slots are finished if the user won
        awardPointsAfterWinning(slotQuantity, dispatch, awardPoints);
        handleTimeOut(slotQuantity, true, setWinner);
      }
    }
  }, [slots, loading, slotQuantity, dispatch]);

  return (
    <div>
      <StyledPointsView>Current Money: ${points}</StyledPointsView>
      <p className="App-logo">Slots</p>
      <StyledSLotsScreen>
        {slots.map((slot, i) => (
          <SlotBox
            key={i}
            i={i}
            slots={slots}
            slot={slot}
            renderNumbers={renderNumbers}
            loading={loading}
          />
        ))}
      </StyledSLotsScreen>
      <StyledActions>
        <StyledSpinSLotsButton
          disabled={spinning}
          onClick={() => handleSpinSLots(2)}
        >
          Spin
        </StyledSpinSLotsButton>
        <StyledBetInput>
          <p>Bet Amount $</p>
          <input
            disabled={spinning}
            type="number"
            value={betAmount}
            placeholder="Bet Amount"
            onChange={(e: any) => dispatch(setBetAmount(e.target.value))}
          />
        </StyledBetInput>
      </StyledActions>
      {winner && <h3>winner! you won ${winnings}</h3>}
    </div>
  );
};
