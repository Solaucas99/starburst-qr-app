import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import validator from 'validator';

import { Container } from '@styles/Index/Index';
import { VisitorFormContainer } from '@styles/Visitors/Create/Index';
import toast from '@services/toastMessage';
import axios from '@services/axios';
import Loading from '@components/Loading';

const Index: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean | ''>(false);
  const [email, setEmail] = useState<string | ''>('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();

      if (!email) {
        setIsLoading(false);
        toast(
          'Você precisa inserir um e-mail para enviar um convite.',
          'error'
        );
        return;
      }

      if (!validator.isEmail(email)) {
        setIsLoading(false);
        toast('O e-mail inserido é inválido', 'error');
        return;
      }

      const { data, status } = await axios.post('/visitors/generate-link', {
        email,
      });

      if (status !== 200) {
        setIsLoading(false);
        toast(data.message, 'error');
        return;
      }
      setIsLoading(false);
      toast(data.message, 'success');
      router.push('/visitors');
    } catch (err) {
      setIsLoading(false);
      toast(err.response.data.message, 'error');

      if (
        err.response.data.message ===
        'Para realizar essa ação, você primeiro precisa confirmar seu e-mail'
      ) {
        router.push('/auth/admin/verifyemail');
      }
    }
  };

  return (
    <Container>
      <Head>
        <title>Criar link de cadastro : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {isLoading && <Loading isLoading={isLoading} />}

      <h1>Cadastro de Visitante</h1>

      <VisitorFormContainer>
        <small>
          Ao inserir o e-mail do visitante, você estará enviando um convite para
          o visitante através do e-mail inserido. Após o visitante realizar o
          cadastro, ele aparecerá na lista de visitantes.
        </small>

        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="email">Insira o e-mail do visitante</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail do visitante"
            onChange={e => setEmail(e.target.value)}
          />

          <button type="submit" id="submit" name="submit">
            Enviar
          </button>
        </form>
      </VisitorFormContainer>
    </Container>
  );
};

export default Index;
