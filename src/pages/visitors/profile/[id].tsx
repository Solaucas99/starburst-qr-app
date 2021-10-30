import React, { useState, useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Button } from 'react-bootstrap';

import { Container } from '@styles/Index/Index';
import { List } from '@styles/Visitors/Profile/Index';
import { useFetch } from '@hooks/useFetch';
import { decryptAES } from '@utils/decrypt';
import toast from '@services/toastMessage';
import axios from '@services/axios';
import Loading from '@components/Loading';
import ConfirmPopupDialog from '@components/ConfirmPopupDialog';
import { IVisitor } from '@interfaces/Visitors/IVisitor';
import { IPopup } from '@interfaces/utils/IPopup';

const Visitor: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data,
    isLoading: fetchLoading,
    isError,
  } = useFetch<IVisitor>(`/visitors/${id}`);

  const [isLoading, setIsLoading] = useState<boolean | ''>(false);
  const [popupDefinition, setPopupDefinition] = useState<IPopup>({
    isShowing: false,
    message: '',
  });

  const popupCallback = useCallback(
    async (value: boolean): Promise<void> => {
      if (value === true) {
        try {
          setPopupDefinition({
            isShowing: false,
            message: '',
          });

          setIsLoading(true);
          const response = await axios.delete(`/visitors/${id}`);

          if (response.status !== 200) {
            setIsLoading(false);
            toast(response.data.message, 'error');
            return;
          }

          setIsLoading(false);
          toast(response.data.message, 'success');
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
        return;
      }

      setPopupDefinition({
        isShowing: false,
        message: '',
      });
    },
    [router, id]
  );

  return (
    <Container>
      <Head>
        <title>Perfil de Visitante : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <h1>Dados do Visitante</h1>

      {isLoading && <Loading isLoading={isLoading || fetchLoading} />}

      {isError && <h1>Ocorreu um erro :( tente novamente mais tarde...</h1>}

      {popupDefinition.isShowing && (
        <ConfirmPopupDialog
          message={popupDefinition.message}
          callback={popupCallback}
        />
      )}
      {data && !isError && !isLoading && (
        <div style={{ width: '80%' }}>
          <List>
            Nome:
            <li>{data.data.nome}</li>
            E-mail:
            <li>{decryptAES(data.data.email)}</li>
            CPF:
            <li>
              {decryptAES(data.data.cpf).replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/g,
                '$1.$2.$3-$4'
              )}
            </li>
            Celular ou Telefone:{' '}
            <li>{data.data.phone ? data.data.phone : 'Não tem'}</li>
            E-mail confirmado?:
            <li
              style={
                data.data.confirmed_email
                  ? { color: 'green' }
                  : { color: 'red' }
              }
            >
              {data.data.confirmed_email ? 'Sim' : 'Não'}
            </li>
            Aceita receber promoções?:
            <li
              style={
                data.data.accept_promotions
                  ? { color: 'green' }
                  : { color: 'red' }
              }
            >
              {data.data.accept_promotions ? 'Sim' : 'Não'}
            </li>
            <li>
              <Link
                href={`/visitors/update/send?email=${decryptAES(
                  data.data.email
                )}`}
              >
                <Button variant="info" disabled={!data.data.confirmed_email}>
                  Editar Visitante
                </Button>
              </Link>
              <Button
                variant="danger"
                onClick={() => {
                  setPopupDefinition({
                    isShowing: true,
                    message:
                      'Você tem certeza que deseja remover esse usuário?',
                  });
                }}
              >
                Remover Visitante
              </Button>
            </li>
          </List>
        </div>
      )}
    </Container>
  );
};

export default Visitor;
