// Our time outs are to just make sure the slots have finished spinning before the user can click again
// Or if the user has hit the winning chance we make sure at the end of the spin we show them they have won and what they have won

export const handleTimeOut = (
  slotQuantity: number,
  value: boolean,
  cb: (value: boolean) => void
) => {
  setTimeout(() => {
    cb(value);
  }, (slotQuantity + 1) * 500);
};

export const awardPointsAfterWinning = (
  slotQuantity: number,
  cb: (fn: () => void) => void,
  fn: () => any
) => {
  setTimeout(() => {
    cb(fn());
  }, (slotQuantity + 1) * 500);
};
