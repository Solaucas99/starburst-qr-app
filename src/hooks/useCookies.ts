import { setCookie, parseCookies } from 'nookies';

interface CookiesFetch {
  setCookies: (name: string, value: string, isRefreshToken?: boolean) => void;
  getCookies: (name: string) => string;
}

export function useCookies(): CookiesFetch {
  const setCookies = (
    name: string,
    value: string,
    isRefreshToken?: boolean
  ): void => {
    setCookie(null, name, value, {
      httpOnly: false,
      secure: true,
      maxAge: isRefreshToken ? 60 * 60 * 24 * 30 : 60 * 60 * 1,
      domain: '.starburst-qr.online',
    });
  };

  const getCookies = (name: string): string => {
    const cookie = parseCookies()[name];
    return cookie;
  };

  return {
    getCookies,
    setCookies,
  };
}
