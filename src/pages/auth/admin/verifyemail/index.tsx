import React, { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Container } from '@styles/Index/Index';
import { VerifyFormContainer } from '@styles/Auth/Admin/VerifyEmail/Index';
import toast from '@services/toastMessage';
import axios from '@services/axios';
import Loading from '@components/Loading';
import UserContext from '@providers/context/user';

const Index: NextPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean | ''>(false);
  const [code, setCode] = useState<string>('');

  const { state, setState } = useContext(UserContext);

  const handleResendCode = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    try {
      setIsLoading(true);

      const { data, status } = await axios.post('/auth/code/resend', {});

      if (status !== 200) {
        setIsLoading(false);
        toast(data.message, 'error');
        return;
      }

      setIsLoading(false);
      toast(
        `${data.message} Acesse o e-mail ${data.destination} para pegar o código.`,
        'success'
      );
    } catch (err) {
      setIsLoading(false);
      toast(err.response.data.message, 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();

      if (code.length !== 6) {
        setIsLoading(false);
        toast('O código inserido é inválido', 'error');
        return;
      }

      const { data, status } = await axios.post('/auth/code/verify', {
        code,
      });

      if (status !== 200) {
        setIsLoading(false);
        toast(data.message, 'error');
        return;
      }
      setIsLoading(false);
      toast(data.message, 'success');
      setState({ ...state, emailConfirmed: true });
      router.back();
    } catch (err) {
      setIsLoading(false);
      toast(err.response.data.message, 'error');
    }
  };

  useEffect(() => {
    if (state.emailConfirmed) {
      router.replace('/404');
    }
  }, [state, router]);

  return (
    <Container>
      <Head>
        <title>Confirmar e-mail : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {isLoading && <Loading isLoading={isLoading} />}

      <h1>Confirmação de e-mail</h1>

      <VerifyFormContainer>
        <small>
          Ainda falta uma etapa! Verificamos que seu e-mail ainda não foi
          confirmado... Lembrando que para utilizar qualquer recurso por aqui,
          você precisa confirmar seu e-mail antes. Clique abaixo para fazer a
          verificação do seu e-mail.
        </small>

        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="confirmCode">
            Insira o código enviado para o seu e-mail
          </label>

          <input
            type="confirmCode"
            id="confirmCode"
            name="confirmCode"
            placeholder="Insira o código aqui"
            onChange={e => setCode(e.target.value)}
            value={code}
          />

          <button type="submit" id="submit" name="submit">
            Enviar
          </button>
        </form>

        <small>
          Ou{' '}
          <button
            className="resendCode"
            onClick={handleResendCode}
            type="button"
          >
            clique aqui
          </button>{' '}
          para re-enviar o código, caso você não o tenha mais ou esqueceu.
        </small>
      </VerifyFormContainer>
    </Container>
  );
};

export default Index;
