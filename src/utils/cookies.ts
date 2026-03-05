interface CookieOptions {
  path?: string;
  maxAge?: number;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const {
    path = '/',
    maxAge = 31536000,
    sameSite = 'Lax',
    secure = true,
  } = options;

  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `path=${path}`,
    `max-age=${maxAge}`,
    `SameSite=${sameSite}`,
  ];

  if (secure) {
    parts.push('Secure');
  }

  document.cookie = parts.join('; ');
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp(
      '(?:^|;\\s*)' +
        encodeURIComponent(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
        '=([^;]*)'
    )
  );
  return match ? decodeURIComponent(match[1]) : null;
}
