import { appendToUrl } from './url';

describe('appendToUrl', () => {
  test('appends path to root URL', () => {
    const root = 'https://example.com';
    const path = '/path/to/resource';
    const expectedUrl = 'https://example.com/path/to/resource/';

    const actualUrl = appendToUrl(root, path);

    expect(actualUrl).toEqual(expectedUrl);
  });
  test('appends path to root URL if root ends with slash', () => {
    const root = 'https://example.com/';
    const path = '/path/to/resource';
    const expectedUrl = 'https://example.com/path/to/resource/';

    const actualUrl = appendToUrl(root, path);

    expect(actualUrl).toEqual(expectedUrl);
  });
  test('appends path to root URL if root and path does NOT end with slash', () => {
    const root = 'https://example.com';
    const path = 'path/to/resource';
    const expectedUrl = 'https://example.com/path/to/resource/';

    const actualUrl = appendToUrl(root, path);

    expect(actualUrl).toEqual(expectedUrl);
  });
});

describe('appendToUrl', () => {
  it('should append the appendPath to the baseUrl without duplicate slashes', () => {
    const baseUrl = 'https://example.com/api/';
    const appendPath = '/v1/';

    const finalUrl = appendToUrl(baseUrl, appendPath);
    expect(finalUrl).toBe('https://example.com/api/v1/');
  });

  it('should handle baseUrl without trailing slash and appendPath with leading slash', () => {
    const baseUrl = 'https://example.com/api';
    const appendPath = '/v1/';

    const finalUrl = appendToUrl(baseUrl, appendPath);
    expect(finalUrl).toBe('https://example.com/api/v1/');
  });

  it('should handle baseUrl with trailing slash and appendPath without leading slash', () => {
    const baseUrl = 'https://example.com/api/';
    const appendPath = 'v1';

    const finalUrl = appendToUrl(baseUrl, appendPath);
    expect(finalUrl).toBe('https://example.com/api/v1/');
  });

  it('should handle baseUrl and appendPath with multiple slashes', () => {
    const baseUrl = 'https://example.com/api//';
    const appendPath = '/v1/';

    const finalUrl = appendToUrl(baseUrl, appendPath);
    expect(finalUrl).toBe('https://example.com/api/v1/');
  });
});
