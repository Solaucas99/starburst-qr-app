import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

import { Container } from '@styles/Index/Index';
import { ListVisit } from '@styles/Visits/Details/Index';
import { useFetch } from '@hooks/useFetch';
import toast from '@services/toastMessage';
import axios from '@services/axios';
import Loading from '@components/Loading';
import ConfirmPopupDialog from '@components/ConfirmPopupDialog';

import { IVisit } from '@interfaces/Visits/IVisit';
import { IPopup } from '@interfaces/utils/IPopup';
import { IAxiosResponse } from '@interfaces/utils/IAxiosResponse';

const Visit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data,
    isLoading: fetchLoading,
    isError,
    mutate,
  } = useFetch<IVisit>(`/visits/${id}`);

  const [isLoading, setIsLoading] = useState<boolean | ''>(false);
  const [popupDefinition, setPopupDefinition] = useState<IPopup>({
    isShowing: false,
    message: '',
  });

  const filterDate = (date: string): string => {
    const actualDate = new Date(date);
    const year = actualDate.getFullYear();
    const day = actualDate.getDate();
    const month = actualDate.getMonth() + 1;
    const hour = actualDate.getHours();
    const minutes = actualDate.getMinutes();

    return `${day}/${month}/${year} - ${hour}:${minutes}`;
  };

  const popupCallback = useCallback(
    async (value: boolean): Promise<void> => {
      if (value === true) {
        try {
          setPopupDefinition({
            isShowing: false,
            message: '',
          });

          setIsLoading(true);
          const response = await axios.delete<
            IAxiosResponse<Record<string, never>>
          >(`/visits/delete/${id}`);

          if (response.status !== 200) {
            setIsLoading(false);
            toast(response.data.message, 'error');
            return;
          }

          setIsLoading(false);
          toast(response.data.message, 'success');
          router.push('/visits');
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

  const handleConfirmVisit = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await axios.get<IAxiosResponse<IVisit>>(
        `/visits/confirmvisit/${id}`
      );

      if (response.status !== 200) {
        setIsLoading(false);
        toast(response.data.message, 'error');
        return;
      }

      setIsLoading(false);
      toast(response.data.message, 'success');
      mutate();
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
        <title>Detalhes de Visita : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <h1>Dados da Visita</h1>

      {isLoading && <Loading isLoading={isLoading || fetchLoading} />}

      {isError && !data && (
        <h1>Ocorreu um erro :( tente novamente mais tarde...</h1>
      )}

      {popupDefinition.isShowing && (
        <ConfirmPopupDialog
          message={popupDefinition.message}
          callback={popupCallback}
        />
      )}

      {data && !isError && !isLoading && (
        <div className="list-group-container">
          <ListVisit variant="flush">
            <ListVisit.Item>
              Visitante:
              {data.data.visitor ? (
                <Link href={`/visitors/profile/${data.data.visitor._id}`}>
                  <a>{data.data.visitor.nome}</a>
                </Link>
              ) : (
                <p style={{ color: 'red' }}>
                  Visitante desconhecido ou deletado
                </p>
              )}
            </ListVisit.Item>
            <ListVisit.Item>
              QR-Code:
              {data.data.qrcode && data.data.qrcode !== '' ? (
                <img
                  loading="lazy"
                  alt="QRCode"
                  src={data.data.qrcode}
                  style={{ height: '150px', width: '150px' }}
                />
              ) : (
                <span>A visita já foi finalizada...</span>
              )}
            </ListVisit.Item>
            <ListVisit.Item>Data: {filterDate(data.data.date)}</ListVisit.Item>
            <ListVisit.Item
              style={{ color: `${data.data.finished ? 'green' : 'red'}` }}
            >
              Status: {data.data.finished ? 'Finalizada' : 'Não Finalizada'}
            </ListVisit.Item>
            <ListVisit.Item>
              <Button
                variant="danger"
                onClick={() => {
                  setPopupDefinition({
                    isShowing: true,
                    message:
                      'Você tem certeza que deseja cancelar essa visita?',
                  });
                }}
                disabled={!!data.data.finished}
              >
                Cancelar Visita
              </Button>
              <Button
                variant="success"
                onClick={handleConfirmVisit}
                disabled={!!data.data.finished}
              >
                Marcar como finalizada
              </Button>
            </ListVisit.Item>
          </ListVisit>
        </div>
      )}
    </Container>
  );
};

export default Visit;
