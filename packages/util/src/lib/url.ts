export function appendToUrl(baseUrl: string, appendPath: string): string {
  // Remove any trailing slashes from the baseUrl and leading slashes from the appendPath
  const trimmedBaseUrl = baseUrl.replace(/\/+$/, '');
  const trimmedAppendPath = appendPath.replace(/^\/+/, '');

  // Combine the baseUrl and appendPath with a single slash between them
  const joinedPath = `${trimmedBaseUrl}/${trimmedAppendPath}`.replace(
    /\/+$/,
    '',
  );

  // If both baseUrl and appendPath are empty, return an empty string
  return joinedPath === '//'
    ? ''
    : joinedPath + `${trimmedAppendPath.length ? '/' : ''}`;
}
