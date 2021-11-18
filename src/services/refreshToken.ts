import { parseCookies, destroyCookie, setCookie } from 'nookies';
import axios from './axios';
import toastMessage from './toastMessage';

export async function refreshToken(): Promise<boolean> {
  try {
    const { refreshToken: refresh_token } = parseCookies();
    if (!refresh_token) return false;
    const { data, status } = await axios.post('/auth/keys/refresh', {
      refresh_token,
    });
    if (status !== 200) {
      destroyCookie(null, 'idToken');
      destroyCookie(null, 'refreshToken');
      destroyCookie(null, 'accessToken');
      return false;
    }

    setCookie(null, 'idToken', data.AuthenticationResult.IdToken, {
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 1,
      domain: '.starburst-qr.online',
    });

    setCookie(null, 'accessToken', data.AuthenticationResult.AccessToken, {
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 1,
      domain: '.starburst-qr.online',
    });

    return true;
  } catch (err) {
    // If RefreshToken expired
    if (
      err.response.status === 401 &&
      err.response.data.message === 'jwt expired'
    ) {
      destroyCookie(null, 'idToken');
      destroyCookie(null, 'refreshToken');
      destroyCookie(null, 'accessToken');
    }
    toastMessage(
      'A sessão do usuário expirou, você precisa fazer login novamente!',
      'error'
    );
    return false;
  }
}
