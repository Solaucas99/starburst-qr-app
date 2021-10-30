import Amplify, { I18n } from 'aws-amplify';
import config from './config/amplify/config';

export default function amplifyConfig(): void {
  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: process.env.NEXT_PUBLIC_REACT_APP_REGION,
      userPoolId: process.env.NEXT_PUBLIC_REACT_APP_USER_POOL_ID,
      identityPoolId: process.env.NEXT_PUBLIC_REACT_APP_IDENTITY_POOL_ID,
      userPoolWebClientId:
        process.env.NEXT_PUBLIC_REACT_APP_USER_POOL_CLIENT_ID,
      authenticationFlowType: 'USER_PASSWORD_AUTH',
      cookieStorage: {
        domain: 'localhost',
        sameSite: 'lax',
        secure: false,
      },
    },
    ssr: true,
  });

  I18n.setLanguage('pt-br');
  I18n.putVocabularies(config.dict);
}
