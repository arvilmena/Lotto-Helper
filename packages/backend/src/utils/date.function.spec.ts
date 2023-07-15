import { convertDateFormat, convertToPhilippineISO } from './date.function';

describe('convertDateFormat', () => {
  it('should convert date string to "Y-m-d" format', () => {
    const dateString = '1/3/2023';
    const expectedFormattedDate = '2023-01-03';
    const formattedDate = convertDateFormat(dateString);
    expect(formattedDate).toBe(expectedFormattedDate);
  });

  it('should handle leading zeros in month and day', () => {
    const dateString = '02/05/2023';
    const expectedFormattedDate = '2023-02-05';
    const formattedDate = convertDateFormat(dateString);
    expect(formattedDate).toBe(expectedFormattedDate);
  });

  it('should handle single-digit month and day', () => {
    const dateString = '9/8/2023';
    const expectedFormattedDate = '2023-09-08';
    const formattedDate = convertDateFormat(dateString);
    expect(formattedDate).toBe(expectedFormattedDate);
  });

  it('should handle single-digit month and 2-digit day', () => {
    const dateString = '9/18/2023';
    const expectedFormattedDate = '2023-09-18';
    const formattedDate = convertDateFormat(dateString);
    expect(formattedDate).toBe(expectedFormattedDate);
  });

  it('should handle 2-digit month and sing-digit day', () => {
    const dateString = '11/8/2023';
    const expectedFormattedDate = '2023-11-08';
    const formattedDate = convertDateFormat(dateString);
    expect(formattedDate).toBe(expectedFormattedDate);
  });
});

describe('convertToPhilippineISO', () => {
  test('converts date string to Philippine ISO string', () => {
    const dateString = '2023-11-08';
    const expectedISO = '2023-11-08T00:00:00.000+08:00';

    const actualISO = convertToPhilippineISO(dateString);

    expect(actualISO).toEqual(expectedISO);
  });
});
