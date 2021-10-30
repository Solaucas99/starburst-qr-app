import React, { useState, memo, SyntheticEvent, useEffect } from 'react';
import { NextPage } from 'next';
import router from 'next/router';
import { VisitorPopupCode } from '../../styles/Visitors/Register/Index';
import toastMessage from '../../services/toastMessage';
import axios from '../../services/axios';

const Popup: NextPage<{ isShowing: boolean }> = ({ ...props }) => {
  const [code, setCode] = useState<string>('');
  const [visitorId, setVisitorId] = useState<string>('');

  useEffect(() => {
    const request = async () => {
      try {
        const queryKeyBie = 'bie';

        const queryValueBie =
          router.query[queryKeyBie] ||
          router.asPath.match(new RegExp(`[&?]${queryKeyBie}=(.*)(&|$)`))[1];

        const { data, status } = await axios.get(
          `/visitors?bie=${queryValueBie}`
        );

        if (status !== 200) {
          toastMessage('Ocorreu um erro, tente novamente mais tarde.', 'error');
          router.push('/');
          return;
        }

        setVisitorId(data.data._id);
      } catch (err) {
        toastMessage(err.response.data.message, 'error');
        router.push('/');
      }
    };

    request();
  }, []);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    try {
      e.preventDefault();

      const queryKeyID = 'generatedId';

      const queryValueID =
        router.query[queryKeyID] ||
        router.asPath.match(new RegExp(`[&?]${queryKeyID}=(.*)(&|$)`))[1];

      const { data, status } = await axios.post(
        `/confirmvisitor/${visitorId}`,
        {
          generated_pass: code,
          visitor_link_id: queryValueID,
        }
      );

      if (status !== 200) {
        toastMessage(data.message, 'error');
        return;
      }

      toastMessage('E-mail confirmado com sucesso!', 'success');
      router.push('/');
    } catch (err) {
      toastMessage(err.response.data.message, 'error');
    }
  };

  if (props.isShowing) {
    return (
      <VisitorPopupCode>
        <div className="animate__animated animate__fadeInLeft">
          <p>Obrigado por se cadastrar, mas falta uma etapa...</p>

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
      </VisitorPopupCode>
    );
  }

  return <></>;
};

export default memo(Popup);
