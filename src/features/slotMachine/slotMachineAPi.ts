export function slotNumbersGenerator(slotQuantity: number, range: number) {
  let arr: number[] = [];
  for (let i = 0; i < slotQuantity; i++) {
    arr.push(Math.floor(Math.random() * range));
  }
  return new Promise<{ data: number[] }>((resolve) => resolve({ data: arr }));
}

export function winningNumbersGenerator(slotQuantity: number, range: number) {
  let arr: number[] = [];
  const randomValue = Math.floor(Math.random() * range);
  for (let i = 0; i < slotQuantity; i++) {
    arr.push(randomValue);
  }

  return new Promise<{ data: number[] }>((resolve) => resolve({ data: arr }));
}
