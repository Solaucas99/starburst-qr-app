import React, {
  useContext,
  useState,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react';
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
import CodePopup from '@components/Visitors/CodePopup';
import {
  MdContactPhone,
  MdDriveFileRenameOutline,
  MdEmail,
} from 'react-icons/md';
import { HiIdentification } from 'react-icons/hi';

interface VisitorResponse {
  message: string;
  visitorId: string;
}

const Index: NextPage = () => {
  const router = useRouter();
  const privacyCheck = useRef<HTMLInputElement>(null);
  const promotionsCheck = useRef<HTMLInputElement>(null);

  const [cpf, setCpf] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isCaptchaChecked, setIsCaptchaChecked] = useState<boolean>(false);

  const [isPopupShowing, setIsPopupShowing] = useState<boolean>(false);
  const [isUserRevalidating, setisUserRevalidating] = useState<boolean>(false);
  const [visitorId, setVisitorId] = useState<string>('');

  // ------------- Getting URL Query Params ------------------//
  const queryKeyID = 'generatedId';
  const queryKeyAccess = 'access';
  const queryKeyBie = 'bie';
  const queryAuthJWT = 'auth';

  const queryValueBie =
    router.query[queryKeyBie] ||
    router.asPath.match(new RegExp(`[&?]${queryKeyBie}=(.*)(&|$)`))[1];

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
    router.query[queryAuthJWT] ||
    router.asPath
      .match(new RegExp(`[&?]${queryAuthJWT}=(.*)(&|$)`))[1]
      .split('&')[0];
  // ------------- Finish ------------------ //

  const { state, setState } = useContext(UserContext);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    try {
      e.preventDefault();
      setState({ ...state, isLoading: true });
      const validate = Validate.VisitorsSignIn({
        cpf,
        email,
        name,
        phone: phoneNumber,
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

      if (!privacyCheck.current.checked) {
        setState({ ...state, isLoading: false });
        toastMessage(
          'Você precisa concordar com as políticas de privacidade.',
          'error'
        );
        return;
      }

      const { data, status } = await axios.post<VisitorResponse>(
        '/visitors/register',
        {
          nome: name,
          email,
          cpf: cpf.replace(/\D+/g, ''),
          phone: phoneNumber,
          accept_promotions: promotionsCheck.current.checked,
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
      setVisitorId(data.visitorId);
      setIsPopupShowing(true);
      setisUserRevalidating(false);
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
        const { data, status } = await axios.post(
          `/visitors/validate-link/${queryValueID}`,
          { token: queryValueAccess, visitor_bie: queryValueBie },
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
        <title>Cadastro : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Loading isLoading={state.isLoading} />
      {isPopupShowing ? (
        <CodePopup
          visitorIdProp={visitorId}
          isUserRevalidating={isUserRevalidating}
          authToken={queryValueAuthJWT as string}
        />
      ) : (
        <VisitorRegisterContainer>
          <span>Faça seu cadastro!</span>

          <small>
            Item com <i>(*)</i> é obrigatório
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
              />
              <label htmlFor="name">Insira seu nome completo *</label>
            </div>

            <div className="formLabel">
              <MdEmail />
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="email">Insira seu e-mail *</label>
            </div>

            <div className="formLabel">
              <HiIdentification />
              <input
                type="text"
                name="cpf"
                id="cpf"
                min="11"
                max="14"
                required
                onChange={e => {
                  e.target.value = e.target.value
                    .replace(/[^\d.-]/g, '')
                    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
                  setCpf(e.target.value);
                }}
              />
              <label htmlFor="cpf">Insira seu CPF *</label>
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
                  setPhoneNumber(`+55${e.target.value.replace(/[^\d]/g, '')}`);
                }}
              />
              <label htmlFor="phone">
                Insira seu celular ou telefone (DDD + Num.)
              </label>
            </div>

            <div className="checkboxDiv">
              <label htmlFor="privacy_accept">
                Eu concordo com a política de privacidade *
                <input
                  ref={privacyCheck}
                  type="checkbox"
                  name="privacy_accept"
                  id="privacy_accept"
                  required
                />
              </label>

              <small>
                <a href="google.com">
                  Clique aqui para ler a política de privacidade
                </a>
              </small>
            </div>

            <div className="checkboxDiv">
              <label htmlFor="promotions_accept">
                Eu aceito receber promoções no meu e-mail
                <input
                  ref={promotionsCheck}
                  type="checkbox"
                  name="promotions_accept"
                  id="promotions_accept"
                />
              </label>

              <small>
                <a href="google.com">
                  Clique aqui para ler a política de promoções
                </a>
              </small>
            </div>

            <ReCaptcha
              onChange={handleVerifyCaptcha}
              sitekey="6Le7yJgaAAAAAELSAVBBz1xz1bLKdqAiGJHxSjkh"
            />

            <button type="submit" name="register">
              Enviar
            </button>
          </form>
          <small>
            Após o registro, você estará disponível para visitar nossa empresa a
            qualquer momento!
          </small>
        </VisitorRegisterContainer>
      )}
    </Container>
  );
};
export default Index;
