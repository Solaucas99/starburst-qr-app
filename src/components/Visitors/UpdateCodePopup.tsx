import React, { useState, memo, SyntheticEvent, useEffect } from 'react';
import { NextPage } from 'next';
import router from 'next/router';
import { VisitorPopupCode } from '../../styles/Visitors/Register/Index';
import toastMessage from '../../services/toastMessage';
import axios from '../../services/axios';

interface VisitorResponse {
  message: string;
  visitorId: string;
}

const Popup: NextPage<{
  isUserRevalidating: boolean;
  visitorIdProp: string;
  authToken: string;
  updateFinished: boolean;
}> = ({ isUserRevalidating, visitorIdProp, authToken, updateFinished }) => {
  const [code, setCode] = useState<string>('');
  const [visitorId, setVisitorId] = useState<string>(visitorIdProp || '');
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (isUserRevalidating) {
      const request = async () => {
        try {
          const queryKeyBie = 'bie';

          const queryValueBie =
            router.query[queryKeyBie] ||
            router.asPath.match(new RegExp(`[&?]${queryKeyBie}=(.*)(&|$)`))[1];

          const { data, status } = await axios.get<VisitorResponse>(
            `/visitors?bie=${queryValueBie}`,
            { headers: { Authorization: `Bearer ${authToken}` } }
          );

          if (status !== 200) {
            toastMessage(
              'Ocorreu um erro, tente novamente mais tarde.',
              'error'
            );
            router.push('/');
            return;
          }
          setVisitorId(data.visitorId);
        } catch (err) {
          toastMessage(err.response.data.message, 'error');
          router.push('/');
        }
      };

      request();
    }
  }, [isUserRevalidating, visitorId, authToken]);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    try {
      e.preventDefault();

      const queryKeyID = 'generatedId';

      const queryValueID =
        router.query[queryKeyID] ||
        router.asPath.match(new RegExp(`[&?]${queryKeyID}=(.*)(&|$)`))[1];

      const { data, status } = await axios.post(
        `/update/confirmvisitor/${visitorId}`,
        {
          generated_pass: code,
          visitor_link_id: queryValueID,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (status !== 200) {
        toastMessage(data.message, 'error');
        return;
      }

      toastMessage('E-mail confirmado com sucesso!', 'success');
      setIsFinished(true);
    } catch (err) {
      toastMessage(err.response.data.message, 'error');
    }
  };

  return (
    <VisitorPopupCode>
      {isFinished || updateFinished ? (
        <h1>Obrigado!</h1>
      ) : (
        <div className="animate__animated animate__fadeInLeft">
          <small>
            Enviamos um código para o seu e-mail, digite ele abaixo para nos
            confirmar que seu e-mail existe:{' '}
          </small>
          <form onSubmit={e => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Seu código"
              onChange={e => setCode(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </VisitorPopupCode>
  );
};

export default memo(Popup);
