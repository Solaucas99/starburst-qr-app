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

const Index: NextPage = () => {
  const router = useRouter();
  const privacyCheck = useRef<HTMLInputElement>(null);
  const promotionsCheck = useRef<HTMLInputElement>(null);
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isCaptchaChecked, setIsCaptchaChecked] = useState<boolean>(false);
  const [isPopupShowing, setIsPopupShowing] = useState<boolean>(false);

  const { state, setState } = useContext(UserContext);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    try {
      e.preventDefault();
      setState({ ...state, isLoading: true });
      const validate = Validate.VisitorsSignIn({
        cpf,
        email,
        name,
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

      const { data, status } = await axios.post('/visitors/register', {
        nome: name,
        email,
        cpf: cpf.replace(/\D+/g, ''),
        accept_promotions: promotionsCheck.current.checked,
        visitor_link_id: router.query.generatedId,
      });

      if (status !== 200) {
        setState({ ...state, isLoading: false });
        toastMessage(data.message, 'error');
        return;
      }
      setState({ ...state, isLoading: false });
      toastMessage('Visitante cadastrado com sucesso!', 'success');
      setIsPopupShowing(true);
    } catch (err) {
      setState({ ...state, isLoading: false });
      toastMessage(err.response.data.message, 'error');

      if (
        err.response.data.message ===
        'Para realizar essa ação, você primeiro precisa confirmar seu e-mail'
      ) {
        router.push('/auth/admin/verifyemail');
      }
    }
  };

  const handleVerifyCaptcha = (res: string) => {
    if (res) {
      setIsCaptchaChecked(true);
    }
  };

  useEffect(() => {
    const request = async () => {
      try {
        const queryKeyID = 'generatedId';
        const queryKeyAccess = 'access';
        const queryKeyBie = 'bie';

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

        setState({ ...state, isLoading: true });
        const { data, status } = await axios.post(
          `/visitors/validate-link/${queryValueID}`,
          { token: queryValueAccess, visitor_bie: queryValueBie }
        );

        if (status !== 200) {
          setState({ ...state, isLoading: false });
          router.push('/404');
          return;
        }

        if (data.is_in_validation) {
          setState({ ...state, isLoading: false });
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
      <CodePopup isShowing={isPopupShowing} />
      <VisitorRegisterContainer>
        <span>Faça seu cadastro!</span>

        <small>
          Item com <i>(*)</i> é obrigatório
        </small>

        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Insira seu e-mail"
            name="email"
            id="email"
            required
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            placeholder="Insira seu nome completo"
            name="name"
            id="name"
            required
            onChange={e => setName(e.target.value)}
          />

          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            placeholder="Insira seu CPF"
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
    </Container>
  );
};
export default Index;
