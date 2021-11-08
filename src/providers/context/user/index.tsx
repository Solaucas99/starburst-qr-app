import React, { createContext, useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { NextPage } from 'next';

interface UserType {
  name: string;
  username: string;
  emailConfirmed: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  darkTheme: boolean;
}

interface PropsUserContext {
  state: UserType;
  setState: React.Dispatch<React.SetStateAction<UserType>>;
}

const DEFAULT_VALUE = {
  state: {
    name: '',
    username: '',
    emailConfirmed: false,
    isLoggedIn: false,
    isLoading: false,
    darkTheme: true,
  },
  // eslint-disable-next-line
  setState: () => {},
};

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE);

const WrappedContext = (Component: NextPage): NextPage => {
  const NewComponent: NextPage = ({ ...props }) => {
    const [state, setState] = useState<UserType | null>(DEFAULT_VALUE.state);
    const validateCookies = (): boolean => {
      const { idToken, refreshToken, accessToken } = parseCookies();

      if (!idToken || !refreshToken || !accessToken) {
        return false;
      }

      return true;
    };

    useEffect(() => {
      const value = localStorage.getItem('state');
      const user: UserType = value ? JSON.parse(value) : DEFAULT_VALUE.state;

      const hasCookies = validateCookies();
      if (!hasCookies) {
        setState(DEFAULT_VALUE.state);
        return;
      }

      if (value !== JSON.stringify(DEFAULT_VALUE.state)) {
        setState(user);
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('state', JSON.stringify(state));
    }, [state]);

    return (
      <UserContext.Provider value={{ state, setState }}>
        <Component {...props} />
      </UserContext.Provider>
    );
  };

  return NewComponent;
};

export { WrappedContext };
export default UserContext;
