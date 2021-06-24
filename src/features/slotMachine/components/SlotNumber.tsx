import React, { FunctionComponent, useEffect, useState } from "react";

interface ISlotNumber {
  number: number;
  index: number;
  isLoading: boolean;
}

export const SlotNumber: FunctionComponent<ISlotNumber> = ({
  number,
  index,
  isLoading,
}) => {
  const [display, setDisplay] = useState("none");
  const [flashNumber, setFlashNumber] = useState<number>(0);

  const showSpinningNumbers = () => {
    setInterval(() => {
      return setFlashNumber(Math.floor(Math.random() * 9));
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplay("block");
    }, index);
    return () => {
      setDisplay("none");
      setFlashNumber(0);
    };
  }, []);

  useEffect(() => {
    showSpinningNumbers();
  }, [flashNumber]);

  return (
    <div>
      {display === "none" ? (
        flashNumber
      ) : (
        <div
          style={{
            display: `${display}`,
            color: "violet",
            border: "2px solid purple",
            borderRadius: "33px",
            padding: 5,
          }}
        >
          {number}
        </div>
      )}
    </div>
  );
};
