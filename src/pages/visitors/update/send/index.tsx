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

      if (!validator.isEmail(email)) {
        setIsLoading(false);
        toast('O e-mail inserido é inválido', 'error');
        return;
      }

      const { data, status } = await axios.post(
        '/visitors/update/generate-link',
        {
          email,
        }
      );

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
        <title>Atualizar visitante : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {isLoading && <Loading isLoading={isLoading} />}

      <h1>Atualização de Visitante</h1>

      <VisitorFormContainer>
        <small>
          Ao clicar em confirmar, você estará enviando um convite para o
          visitante atualizar os dados dele através do e-mail inserido quando
          ele fez o cadastro dele. Caso o visitante atualize o e-mail dele, ele
          irá precisar confirmar o novo e-mail antes de aparecer na lista de
          visitantes novamente. Caso o visitante não tenha acesso ao e-mail
          cadastrado anteriormente ou não lembre qual foi o e-mail cadastrado,
          sugerimos que seu cadastro seja excluído e criado um novo. Somente
          utilize essa opção caso o mesmo ainda tenha acesso ao e-mail.
        </small>

        <form onSubmit={e => handleSubmit(e)}>
          <button type="submit" id="submit" name="submit">
            Confirmar
          </button>
        </form>
      </VisitorFormContainer>
    </Container>
  );
};

export default Index;
