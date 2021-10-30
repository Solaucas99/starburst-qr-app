import React, { useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import UserContext, { WrappedContext } from '@providers/context/user';
import Navigation from '@components/Navigation';
import ToastConfig from '@components/ToastConfig';
import AmplifyLogin from '@components/Amplify/Login';
import EmailNotVerifiedPopup from '@components/EmailNotVerifiedPopup';
import { darkTheme, lightTheme } from '@styles/theme';
import GlobalStyle from '@styles/global';
import { Container } from '@styles/Home/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  const { state } = useContext(UserContext);

  if (
    router.route === '/visitors/register' &&
    router.query.access &&
    router.query.generatedId &&
    router.query.bie
  ) {
    return (
      <>
        <Head>
          <title>STARBURST-QR : Cadastro de Visitante</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <ThemeProvider
          theme={state.darkTheme ? darkTheme.theme : lightTheme.theme}
        >
          <GlobalStyle />
          <ToastConfig />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }

  return state.isLoggedIn && state.username ? (
    <>
      <Head>
        <title>STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ThemeProvider
        theme={state.darkTheme ? darkTheme.theme : lightTheme.theme}
      >
        <GlobalStyle />
        <ToastConfig />
        {!state.emailConfirmed ? <EmailNotVerifiedPopup /> : null}
        <Navigation username={state.username} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  ) : (
    <>
      <Head>
        <title>STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ThemeProvider
        theme={state.darkTheme ? darkTheme.theme : lightTheme.theme}
      >
        <GlobalStyle />
        <ToastConfig />
        <Container className="animate__animated animate__fadeIn">
          <AmplifyLogin />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default WrappedContext(MyApp);
