import { appendToUrl } from './url';

describe('appendToUrl', () => {
  test('appends path to root URL', () => {
    const root = 'https://example.com';
    const path = '/path/to/resource';
    const expectedUrl = 'https://example.com/path/to/resource';

    const actualUrl = appendToUrl(root, path);

    expect(actualUrl).toEqual(expectedUrl);
  });
  test('appends path to root URL if root ends with slash', () => {
    const root = 'https://example.com/';
    const path = '/path/to/resource';
    const expectedUrl = 'https://example.com/path/to/resource';

    const actualUrl = appendToUrl(root, path);

    expect(actualUrl).toEqual(expectedUrl);
  });
  test('appends path to root URL if root and path does NOT end with slash', () => {
    const root = 'https://example.com';
    const path = 'path/to/resource';
    const expectedUrl = 'https://example.com/path/to/resource';

    const actualUrl = appendToUrl(root, path);

    expect(actualUrl).toEqual(expectedUrl);
  });
});
