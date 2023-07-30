import axios from 'axios';
import { appendToUrl } from '../lib/url';

export const FRONTEND_ENDPOINT_URL =
  process.env['NEXT_PUBLIC_FRONTEND_ENDPOINT_URL'] || '';

export const frontendUrlAxiosInstance = axios.create({
  baseURL: FRONTEND_ENDPOINT_URL,
});

export const LATEST_LOTTO_DRAW_ENDPOINT = (() => {
  return appendToUrl(FRONTEND_ENDPOINT_URL, '/api/public/latest-draw');
})();

export const MY_MONITORED_NUMBERS_ENDPOINT = (() => {
  return appendToUrl(FRONTEND_ENDPOINT_URL, '/api/my-monitored-numbers');
})();
