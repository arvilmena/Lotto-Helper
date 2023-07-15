export function generateNumberArray(maxRange: number): number[] {
  const numberArray: number[] = [];

  for (let i = 1; i <= maxRange; i++) {
    numberArray.push(i);
  }

  return numberArray;
}
