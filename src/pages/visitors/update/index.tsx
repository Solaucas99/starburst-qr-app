import React, { useContext, useState, SyntheticEvent, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ReCaptcha from 'react-google-recaptcha';

import axios from '@services/axios';
import Loading from '@components/Loading';
import UserContext from '@providers/context/user/index';
import toastMessage from '@services/toastMessage';
import Validate from '@utils/validation/Validate';
import { VisitorRegisterContainer } from '@styles/Visitors/Register/Index';
import { Container } from '@styles/Home/Home';
import CodePopup from '@components/Visitors/UpdateCodePopup';
import {
  MdContactPhone,
  MdDriveFileRenameOutline,
  MdEmail,
} from 'react-icons/md';

interface VisitorResponse {
  message: string;
  visitorId: string;
  visitorData: {
    email: string;
    phone: string;
    name: string;
  };
}

interface ValidateLinkResponse {
  message: string;
  is_in_validation: boolean;
}

const Index: NextPage = () => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [initialPhoneNumber, setInitialPhoneNumber] = useState<string>('');
  const [initialEmail, setInitialEmail] = useState<string>('');
  const [initialName, setInitialName] = useState<string>('');
  const [visitorId, setVisitorId] = useState<string>('');
  const [isCaptchaChecked, setIsCaptchaChecked] = useState<boolean>(false);

  const [isPopupShowing, setIsPopupShowing] = useState<boolean>(false);
  const [isUserRevalidating, setisUserRevalidating] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // ------------- Getting URL Query Params ------------------//
  const queryKeyID = 'generatedId';
  const queryKeyAccess = 'access';
  const queryKeyVisitorId = 'visitorId';
  const queryKeyAuthJWT = 'auth';
  const queryKeyBie = 'bie';

  const queryValueVisitorId =
    router.query[queryKeyVisitorId] ||
    router.asPath.match(new RegExp(`[&?]${queryKeyVisitorId}=(.*)(&|$)`))[1];

  const queryValueID =
    router.query[queryKeyID] ||
    router.asPath
      .match(new RegExp(`[&?]${queryKeyID}=(.*)(&|$)`))[1]
      .split('&')[0];

  const queryValueAccess =
    router.query[queryKeyAccess] ||
    router.asPath
      .match(new RegExp(`[&?]${queryKeyAccess}=(.*)(&|$)`))[1]
      .split('&')[0];

  const queryValueAuthJWT =
    router.query[queryKeyAuthJWT] ||
    router.asPath
      .match(new RegExp(`[&?]${queryKeyAuthJWT}=(.*)(&|$)`))[1]
      .split('&')[0];

  const queryValueBie =
    router.query[queryKeyBie] ||
    router.asPath
      .match(new RegExp(`[&?]${queryKeyBie}=(.*)(&|$)`))[1]
      .split('&')[0];
  // ------------- Finish ------------------ //

  const { state, setState } = useContext(UserContext);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    try {
      e.preventDefault();
      setState({ ...state, isLoading: true });
      const validate = Validate.VisitorsUpdate({
        email,
        name,
        phone: `+55${phoneNumber}`,
        isCaptchaChecked,
      });

      if (!validate.valid) {
        setState({ ...state, isLoading: false });
        if (typeof validate.message !== 'string') {
          validate.message.forEach(message => {
            toastMessage(message, validate.status);
          });
          return;
        }
        toastMessage(validate.message, validate.status);
        return;
      }

      if (
        name === initialName &&
        email === initialEmail &&
        phoneNumber === initialPhoneNumber
      ) {
        setState({ ...state, isLoading: false });
        toastMessage(
          'Nenhum dado foi modificado no formulário, modifique para atualizar.',
          'error'
        );
        return;
      }

      const { data, status } = await axios.put<VisitorResponse>(
        `/visitors/${visitorId}`,
        {
          visitorAttributes: {
            nome: name === initialName ? undefined : name,
            email: email === initialEmail ? undefined : email,
            phone:
              phoneNumber === initialPhoneNumber
                ? undefined
                : `+55${phoneNumber}`,
          },
          updateVisitorLinkId: queryValueID,
        },
        { headers: { Authorization: `Bearer ${queryValueAuthJWT}` } }
      );

      if (status !== 200) {
        setState({ ...state, isLoading: false });
        toastMessage(data.message, 'error');
        return;
      }
      setState({ ...state, isLoading: false });
      toastMessage(data.message, 'success');

      if (email !== initialEmail) {
        setIsPopupShowing(true);
        setisUserRevalidating(false);
        return;
      }

      setIsFinished(true);
      setIsPopupShowing(true);
    } catch (err) {
      setState({ ...state, isLoading: false });
      toastMessage(err.response.data.message, 'error');
    }
  };

  const handleVerifyCaptcha = (res: string) => {
    if (res) {
      setIsCaptchaChecked(true);
    }
  };

  useEffect(() => {
    if (state.isLoggedIn) {
      router.push('/404');
    }

    const request = async () => {
      try {
        setState({ ...state, isLoading: true });
        const { data, status } = await axios.post<ValidateLinkResponse>(
          `/visitors/update/validate-link/${queryValueID}`,
          { token: queryValueAccess, visitor_id: queryValueVisitorId },
          { headers: { Authorization: `Bearer ${queryValueAuthJWT}` } }
        );

        if (status !== 200) {
          setState({ ...state, isLoading: false });
          router.push('/404');
          return;
        }

        if (data.is_in_validation) {
          setState({ ...state, isLoading: false });
          setisUserRevalidating(true);
          setIsPopupShowing(true);
          return;
        }

        const { data: visitorData, status: visitorStatus } =
          await axios.get<VisitorResponse>(`/visitors?bie=${queryValueBie}`, {
            headers: { Authorization: `Bearer ${queryValueAuthJWT}` },
          });

        if (visitorStatus !== 200) {
          setState({ ...state, isLoading: false });
          router.push('/404');
          return;
        }

        setInitialName(visitorData.visitorData.name || '');
        setInitialEmail(visitorData.visitorData.email || '');
        setInitialPhoneNumber(
          visitorData.visitorData.phone.replace('+55', '') || ''
        );

        setName(visitorData.visitorData.name || '');
        setEmail(visitorData.visitorData.email || '');
        setPhoneNumber(visitorData.visitorData.phone.replace('+55', '') || '');

        setVisitorId(visitorData.visitorId || '');

        setState({ ...state, isLoading: false });
      } catch (err) {
        setState({ ...state, isLoading: false });
        router.push('/404');
      }
    };

    request();
  }, []); //eslint-disable-line

  return (
    <Container>
      <Head>
        <title>Atualizar Dados : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Loading isLoading={state.isLoading} />
      {isPopupShowing ? (
        <CodePopup
          visitorIdProp={visitorId}
          isUserRevalidating={isUserRevalidating}
          authToken={queryValueAuthJWT as string}
          updateFinished={isFinished}
        />
      ) : (
        <VisitorRegisterContainer>
          <span>Atualize seus dados!</span>

          <small>
            Obs: Caso você atualize seu e-mail, será necessário confirmá-lo com
            um código que será enviado pra o e-mail atualizado.
          </small>

          <form onSubmit={e => handleSubmit(e)}>
            <div className="formLabel">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={e => setName(e.target.value)}
                value={name}
              />
              <label htmlFor="name">Insira seu nome completo</label>
            </div>

            <div className="formLabel">
              <MdEmail />
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={e => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <label htmlFor="email">Insira seu e-mail</label>
            </div>

            <div className="formLabel">
              <MdContactPhone />
              <input
                type="phone"
                name="phone"
                id="phone"
                required
                onChange={e => {
                  e.target.value = e.target.value.replace(
                    /(\d{0})(\d{2})(\d{0})(\d{5})/,
                    '$1($2)$3 $4-'
                  );
                  setPhoneNumber(e.target.value.replace(/[^\d]/g, ''));
                }}
                value={phoneNumber.replace(
                  /(\d{0})(\d{2})(\d{0})(\d{5})/,
                  '$1($2)$3 $4-'
                )}
              />
              <label htmlFor="phone">
                Insira seu celular ou telefone (DDD + Num.)
              </label>
            </div>

            <ReCaptcha
              onChange={handleVerifyCaptcha}
              sitekey="6Le7yJgaAAAAAELSAVBBz1xz1bLKdqAiGJHxSjkh"
            />

            <button type="submit" name="register">
              Enviar alterações
            </button>
          </form>
        </VisitorRegisterContainer>
      )}
    </Container>
  );
};
export default Index;
