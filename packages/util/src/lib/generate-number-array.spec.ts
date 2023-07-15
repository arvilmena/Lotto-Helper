import { generateNumberArray } from './generate-number-array';

describe('generateNumberArray', () => {
  test('should generate an array of numbers up to the specified range', () => {
    const maxRange = 5;
    const expectedArray = [1, 2, 3, 4, 5];
    const result = generateNumberArray(maxRange);
    expect(result).toEqual(expectedArray);
  });

  test('should generate an array with a single number when maxRange is 1', () => {
    const maxRange = 1;
    const expectedArray = [1];
    const result = generateNumberArray(maxRange);
    expect(result).toEqual(expectedArray);
  });

  test('should generate an empty array when maxRange is 0', () => {
    const maxRange = 0;
    const expectedArray: number[] = [];
    const result = generateNumberArray(maxRange);
    expect(result).toEqual(expectedArray);
  });
});
