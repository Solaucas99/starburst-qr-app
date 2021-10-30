import React, { useContext, useState, SyntheticEvent } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill, RiUserVoiceFill } from 'react-icons/ri';
import { HiIdentification } from 'react-icons/hi';
import { MdContactPhone } from 'react-icons/md';
import Loading from '../Loading';
import UserContext from '../../providers/context/user/index';
import toastMessage from '../../services/toastMessage';
import Validate from '../../utils/validation/Validate';
import {
  AmplifyLoginContainer,
  Logo,
  LoginContainer,
} from '../../styles/Home/Home';
import axios from '../../services/axios';
import {
  CognitoGetUserResponse,
  CognitoLoginResponse,
} from '../../interfaces/Cognito/ICognito';

import logoDark from '../../../public/icons/logo/logo-dark.png';
import logoLight from '../../../public/icons/logo/logo-light.png';

import wallpaper from '../../../public/images/index/login-wallpaper.jpg';

const Login: NextPage = () => {
  // Normal SignIn
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // NewPassword Sign In
  const [newPassword, setNewPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [challengeName, setChallengeName] = useState<string>('');
  const [sessionCognito, setSessionCognito] = useState<string>('');

  const { state, setState } = useContext(UserContext);

  const setLoggedState = async (): Promise<void> => {
    const { data } = await axios.get<CognitoGetUserResponse>('/user');
    const { Value: email_confirmed } = data.data.UserAttributes.filter(
      attribute => attribute.Name === 'email_verified'
    )[0];
    const { Value: nome } = data.data.UserAttributes.filter(
      attribute => attribute.Name === 'name'
    )[0];

    setState({
      ...state,
      emailConfirmed: email_confirmed === 'true',
      name: nome,
      username: data.data.Username,
      isLoggedIn: true,
      isLoading: false,
    });
    toastMessage('Usuário logado com sucesso!', 'success');
  };

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    try {
      e.preventDefault();
      setState({ ...state, isLoading: true });
      const validate = Validate.AmplifySignIn({ username, password });

      if (!validate.valid && typeof validate.message === 'string') {
        setState({ ...state, isLoading: false });
        toastMessage(validate.message, validate.status);
        return;
      }

      const { data, status } = await axios.post<CognitoLoginResponse>(
        '/login',
        {
          username,
          password,
        }
      );
      if (
        data.ChallengeName &&
        data.ChallengeName === 'NEW_PASSWORD_REQUIRED'
      ) {
        setChallengeName(data.ChallengeName);
        setSessionCognito(data.Session);
        setState({ ...state, isLoading: false });
        toastMessage(
          'Você precisa atualizar sua senha por ordem do administrador!',
          'info'
        );
        return;
      }

      if (status === 200) {
        setLoggedState();
      }
    } catch (err) {
      const trad = {
        'Incorrect username or password.':
          'Usuário inválido ou senha inválida.',
        'Temporary password has expired and must be reset by an administrator.':
          'A senha temporária expirou e precisa ser resetada pelo administrador... Entre em contato com ele.',
      };

      setState({ ...state, isLoading: false });
      toastMessage(trad[err.message], 'error');
    }
  };

  const handleSubmitNewPassword = async (e: SyntheticEvent): Promise<void> => {
    try {
      e.preventDefault();
      setState({ ...state, isLoading: true });
      const validate = Validate.AmplifyRequireNewPassword({
        name,
        nickname,
        password: newPassword,
        phone: phoneNumber,
      });

      if (!validate.valid && typeof validate.message === 'string') {
        setState({ ...state, isLoading: false });
        toastMessage(validate.message, validate.status);
        return;
      }

      const { data: challengeResponseData } = await axios.post(
        '/login/challenge',
        {
          username,
          password: newPassword,
          name,
          nickname,
          phone_number: phoneNumber,
          auth_challenge: {
            challenge_name: challengeName,
            session: sessionCognito,
          },
        }
      );

      if (challengeResponseData.challengeName) {
        toastMessage(
          'Ocorreu um erro inesperado. Contacte o administrador!',
          'error'
        );
        return;
      }

      if (challengeResponseData.IdToken) {
        setLoggedState();
      }
    } catch (err) {
      const trad = {
        'Incorrect username or password.':
          'Usuário inválido ou senha inválida.',
        'Temporary password has expired and must be reset by an administrator.':
          'A senha temporária expirou e precisa ser resetada pelo administrador... Entre em contato com ele.',
      };

      setState({ ...state, isLoading: false });
      toastMessage(trad[err.message], 'error');
    }
  };

  return (
    <LoginContainer>
      <Loading isLoading={state.isLoading} />
      <div className="loginDecoration">
        <Image src={wallpaper} />
      </div>
      <AmplifyLoginContainer>
        <Logo>
          <Image src={state.darkTheme ? logoDark : logoLight} />
        </Logo>
        {challengeName && challengeName === 'NEW_PASSWORD_REQUIRED' ? (
          <>
            <span>Insira seus dados!</span>
            <form onSubmit={e => handleSubmitNewPassword(e)}>
              <div className="formLabel">
                <RiLockPasswordFill />
                <input
                  type="password"
                  name="new-password"
                  id="new-password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <label htmlFor="new-password">Insira sua nova senha</label>
              </div>

              <div className="formLabel">
                <HiIdentification />
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
                <RiUserVoiceFill />
                <input
                  type="text"
                  name="nickname"
                  id="nickname"
                  required
                  onChange={e => setNickname(e.target.value)}
                  value={nickname}
                />
                <label htmlFor="nickname">Insira seu apelido</label>
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
                    setPhoneNumber(
                      `+55${e.target.value.replace(/[^\d]/g, '')}`
                    );
                  }}
                  value={phoneNumber}
                />
                <label htmlFor="phone">
                  Insira seu celular ou telefone (DDD + Num.)
                </label>
              </div>

              <button type="submit" name="sign-in">
                Enviar
              </button>
            </form>
          </>
        ) : (
          <>
            <span>Entre com a sua conta!</span>
            <form onSubmit={e => handleSubmit(e)}>
              <div className="formLabel">
                <FaUserAlt />
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="username">Insira seu usuário</label>
              </div>

              <div className="formLabel">
                <RiLockPasswordFill />
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="password">Insira sua senha</label>
              </div>

              <button type="submit" name="sign-in">
                Entrar
              </button>
            </form>
            <small>
              Caso tenha esquecido sua senha, entre em contato com o
              administrador do sistema para alterar!
            </small>
          </>
        )}
      </AmplifyLoginContainer>
    </LoginContainer>
  );
};

export default Login;
