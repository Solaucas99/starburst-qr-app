import { parseCookies, destroyCookie } from 'nookies';
import axios from './axios';
import toastMessage from './toastMessage';

export async function refreshToken(): Promise<boolean> {
  try {
    const { refreshToken: refresh_token } = parseCookies();
    if (!refreshToken) return false;
    const { status } = await axios.post('/auth/keys/refresh', {
      refresh_token,
    });
    if (status !== 200) {
      return false;
    }
    return true;
  } catch (err) {
    // If RefreshToken expired
    if (err.response && err.response.data.message === 'jwt expired') {
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
