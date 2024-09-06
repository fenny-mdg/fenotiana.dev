import {HeadersFunction} from '@remix-run/node';
import {useLocation} from '@remix-run/react';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Team} from '~/types';

export function getUserImgSrc(imageId?: string | null) {
  return imageId ? `/resources/user-images/${imageId}` : '/img/user.png';
}

export function getNoteImgSrc(imageId: string) {
  return `/resources/note-images/${imageId}`;
}

const teams: Array<Team> = ['RED', 'BLUE', 'YELLOW'];

export const isTeam = (team?: string): team is Team =>
  teams.includes(team as Team);
function getRequiredEnvVarFromObj(
  obj: Record<string, string | undefined>,
  key: string,
  devValue: string = `${key}-dev-value`,
) {
  let value = devValue;
  const envVal = obj[key];
  if (envVal) {
    value = envVal;
  } else if (obj.NODE_ENV === 'production') {
    throw new Error(`${key} is a required env variable`);
  }
  return value;
}

export function typedBoolean<T>(
  value: T,
): value is Exclude<T, '' | 0 | false | null | undefined> {
  return Boolean(value);
}
export function useUpdateQueryStringValueWithoutNavigation(
  queryKey: string,
  queryValue: string,
) {
  React.useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const oldQuery = currentSearchParams.get(queryKey) ?? '';
    if (queryValue === oldQuery) return;

    if (queryValue) {
      currentSearchParams.set(queryKey, queryValue);
    } else {
      currentSearchParams.delete(queryKey);
    }
    const newUrl = [window.location.pathname, currentSearchParams.toString()]
      .filter(Boolean)
      .join('?');
    // alright, let's talk about this...
    // Normally with remix, you'd update the params via useSearchParams from react-router-dom
    // and updating the search params will trigger the search to update for you.
    // However, it also triggers a navigation to the new url, which will trigger
    // the loader to run which we do not want because all our data is already
    // on the client and we're just doing client-side filtering of data we
    // already have. So we manually call `window.history.pushState` to avoid
    // the router from triggering the loader.
    window.history.replaceState(null, '', newUrl);
  }, [queryKey, queryValue]);
}

export const reuseUsefulLoaderHeaders: HeadersFunction = ({
  loaderHeaders,
  parentHeaders,
}) => {
  const headers = new Headers();
  const usefulHeaders = ['Cache-Control', 'Vary', 'Server-Timing'];
  for (const headerName of usefulHeaders) {
    if (loaderHeaders.has(headerName)) {
      headers.set(headerName, loaderHeaders.get(headerName)!);
    }
  }
  const appendHeaders = ['Server-Timing'];
  for (const headerName of appendHeaders) {
    if (parentHeaders.has(headerName)) {
      headers.append(headerName, parentHeaders.get(headerName)!);
    }
  }
  const useIfNotExistsHeaders = ['Cache-Control', 'Vary'];
  for (const headerName of useIfNotExistsHeaders) {
    if (!headers.has(headerName) && parentHeaders.has(headerName)) {
      headers.set(headerName, parentHeaders.get(headerName)!);
    }
  }

  return headers;
};

export function getRequiredServerEnvVar(key: string, devValue?: string) {
  return getRequiredEnvVarFromObj(process.env, key, devValue);
}

export function getErrorMessage(error: unknown) {
  if (typeof error === 'string') return error;
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }
  console.error('Unable to get error message for error', error);
  return 'Unknown Error';
}

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ??
    request.headers.get('host') ??
    new URL(request.url).host;
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

export function getReferrerRoute(request: Request) {
  // spelling errors and whatever makes this annoyingly inconsistent
  // in my own testing, `referer` returned the right value, but 🤷‍♂️
  const referrer =
    request.headers.get('referer') ??
    request.headers.get('referrer') ??
    request.referrer;
  const domain = getDomainUrl(request);
  if (referrer?.startsWith(domain)) {
    return referrer.slice(domain.length);
  } else {
    return '/';
  }
}

/**
 * Merge multiple headers objects into one (uses set so headers are overridden)
 */
export function mergeHeaders(
  ...headers: Array<ResponseInit['headers'] | null | undefined>
) {
  const merged = new Headers();
  for (const header of headers) {
    if (!header) continue;
    for (const [key, value] of new Headers(header).entries()) {
      merged.set(key, value);
    }
  }
  return merged;
}

/**
 * Combine multiple header objects into one (uses append so headers are not overridden)
 */
export function combineHeaders(
  ...headers: Array<ResponseInit['headers'] | null | undefined>
) {
  const combined = new Headers();
  for (const header of headers) {
    if (!header) continue;
    for (const [key, value] of new Headers(header).entries()) {
      combined.append(key, value);
    }
  }
  return combined;
}

/**
 * Combine multiple response init objects into one (uses combineHeaders)
 */
export function combineResponseInits(
  ...responseInits: Array<ResponseInit | null | undefined>
) {
  let combined: ResponseInit = {};
  for (const responseInit of responseInits) {
    combined = {
      ...responseInit,
      headers: combineHeaders(combined.headers, responseInit?.headers),
    };
  }
  return combined;
}

/**
 * Provide a condition and if that condition is falsey, this throws an error
 * with the given message.
 *
 * inspired by invariant from 'tiny-invariant' except will still include the
 * message in production.
 *
 * @example
 * invariant(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw (or a callback to generate the message)
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Error} if condition is falsey
 */
export function invariant(
  condition: boolean,
  message: string | (() => string),
): asserts condition {
  if (!condition) {
    throw new Error(typeof message === 'function' ? message() : message);
  }
}

/**
 * Provide a condition and if that condition is falsey, this throws a 400
 * Response with the given message.
 *
 * inspired by invariant from 'tiny-invariant'
 *
 * @example
 * invariantResponse(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw (or a callback to generate the message)
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Response} if condition is falsey
 */
export function invariantResponse(
  condition: boolean,
  message: string | (() => string),
  responseInit?: ResponseInit,
): asserts condition {
  if (!condition) {
    throw new Response(typeof message === 'function' ? message() : message, {
      status: 400,
      ...responseInit,
    });
  }
}

/**
 * Simple debounce implementation
 */
function debounce<Callback extends (...args: Parameters<Callback>) => void>(
  fn: Callback,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<Callback>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Debounce a callback function
 */
export function useDebounce<
  Callback extends (...args: Parameters<Callback>) => ReturnType<Callback>,
>(callback: Callback, delay: number) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return useMemo(
    () =>
      debounce(
        (...args: Parameters<Callback>) => callbackRef.current(...args),
        delay,
      ),
    [delay],
  );
}

export async function downloadFile(url: string, retries: number = 0) {
  const MAX_RETRIES = 3;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image with status ${response.status}`);
    }
    const contentType = response.headers.get('content-type') ?? 'image/jpg';
    const blob = Buffer.from(await response.arrayBuffer());
    return {contentType, blob};
  } catch (e) {
    if (retries > MAX_RETRIES) throw e;
    return downloadFile(url, retries + 1);
  }
}

export function formatDate(dateStr: string, locale = 'fr-FR') {
  return Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date(dateStr));
}

export function useSelectedMenu() {
  const {pathname} = useLocation();
  const [selectedPath, setSelectedPath] = useState<string>('');

  useEffect(() => {
    const [app, ...menu] = pathname.split('/').filter(Boolean);

    setSelectedPath(`/${app}/${menu.join('/')}`);
  }, [pathname]);

  return selectedPath;
}

export const delay = (delayMs: number) =>
  new Promise(resolve => {
    setTimeout(resolve, delayMs);
  });

export function generatePagination({
  pageCount,
  currentPage = 1,
  max = 7,
  separator = '...',
}: {
  pageCount: number;
  currentPage?: number;
  max?: number;
  separator?: string;
}) {
  const hasMoreItemsThanMax = pageCount > max;
  const paginationLabels: string[] = Array.from(
    {length: hasMoreItemsThanMax ? max : pageCount},
    (_, index) => `${index + 1}`,
  );

  if (hasMoreItemsThanMax) {
    const middleIndex = Math.floor(max / 2);
    paginationLabels[middleIndex] = separator;

    const lastPages = paginationLabels.slice(middleIndex + 1);

    for (let index = lastPages.length - 1; index >= 0; index--) {
      const currentIndex = middleIndex + index + 1;
      const currentValue = pageCount - (lastPages.length - 1 - index);
      paginationLabels[currentIndex] = `${currentValue}`;
    }
  }

  if (!paginationLabels.includes(`${currentPage}`)) {
    const labelsIncludingCurrentPage = [
      separator,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      separator,
    ].map(item => `${item}`);
    const spaceLeft = Math.floor((max - labelsIncludingCurrentPage.length) / 2);

    return [
      ...paginationLabels.slice(0, spaceLeft),
      ...labelsIncludingCurrentPage,
      ...paginationLabels.slice(labelsIncludingCurrentPage.length + spaceLeft),
    ];
  }

  return paginationLabels;
}

export const toNameCase = (str: string) =>
  str
    ? str
        .split(' ')
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(' ')
    : '';

export const commonSeparator = ' --- ';
