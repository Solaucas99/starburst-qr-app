import React, { useContext, useEffect, useState, useRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Nav, Button } from 'react-bootstrap';
import { destroyCookie } from 'nookies';
import { BiMoon } from 'react-icons/bi';
import { IoMdArrowDropdown, IoMdSunny } from 'react-icons/io';
import Switch from 'react-switch';

import { NavbarPersonalization } from '../styles/utils/Navbar/Navbar';
import toastMessage from '../services/toastMessage';
import UserContext from '../providers/context/user/index';
import logoDark from '../../public/icons/logo/logo-dark.png';
import logoLight from '../../public/icons/logo/logo-light.png';

interface User {
  username: string;
}

const Navigation: NextPage<User> = ({ ...props }) => {
  const { state, setState } = useContext(UserContext);

  const [isVisitsToggled, setIsVisitsToggled] = useState<boolean>(false);
  const [isVisitorsToggled, setIsVisitorsToggled] = useState<boolean>(false);

  const visitorsDivNav = useRef<HTMLDivElement>(null);
  const visitsDivNav = useRef<HTMLDivElement>(null);

  const SignOut = (): void => {
    try {
      setState({ ...state, isLoading: true });
      destroyCookie(null, 'idToken');
      destroyCookie(null, 'refreshToken');
      destroyCookie(null, 'accessToken');
      setState({
        ...state,
        name: '',
        username: '',
        emailConfirmed: false,
        isLoggedIn: false,
        isLoading: false,
      });
    } catch (err) {
      toastMessage(err.message, 'error');
    }
  };

  // const handleToggleClick = (parent: HTMLDivElement): void => {
  //   setIsToggled(toggleState => !toggleState);
  //   setDivElement(parent);
  // };

  useEffect(() => {
    if (!visitsDivNav || !visitorsDivNav) return;

    if (isVisitsToggled) {
      visitsDivNav.current.classList.add('active');
    } else {
      visitsDivNav.current.classList.remove('active');
    }

    if (isVisitorsToggled) {
      visitorsDivNav.current.classList.add('active');
    } else {
      visitorsDivNav.current.classList.remove('active');
    }
  }, [isVisitsToggled, isVisitorsToggled]);

  return (
    <NavbarPersonalization className="sticky-top" expand="md">
      <NavbarPersonalization.Brand>
        <Link href="/">
          <a>
            <Image
              src={state.darkTheme ? logoDark : logoLight}
              className="img-fluid"
              height="50px"
              width="230px"
            />
          </a>
        </Link>
      </NavbarPersonalization.Brand>
      <NavbarPersonalization.Toggle aria-controls="navbarScroll" />
      <NavbarPersonalization.Collapse
        id="navbarScroll"
        style={{ justifyContent: 'flex-end' }}
      >
        <Nav className="mr-auto my-2 my-lg-0" navbarScroll>
          <div className="navMenuDropdown">
            <div className="divNavMenu" ref={visitorsDivNav}>
              <button
                type="button"
                onClick={(e: React.BaseSyntheticEvent) => {
                  e.stopPropagation();
                  setIsVisitorsToggled(toggleState => !toggleState);
                }}
                className="mobileNavToggle"
              >
                Visitantes <IoMdArrowDropdown />
              </button>
              <span className="navTitle">Visitantes</span>
              <div className="navContent">
                <ul className="navList">
                  <li className="navListItem">
                    <Link href="/visitors/create">
                      <a>Adicionar Visitante</a>
                    </Link>
                  </li>
                  <li className="navListItem">
                    <Link href="/visitors">
                      <a>Lista de Visitantes</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="divNavMenu" ref={visitsDivNav}>
              <button
                type="button"
                onClick={(e: React.BaseSyntheticEvent) => {
                  e.stopPropagation();
                  setIsVisitsToggled(toggleState => !toggleState);
                }}
                className="mobileNavToggle"
              >
                Visitas <IoMdArrowDropdown />
              </button>
              <span className="navTitle">Visitas</span>
              <div className="navContent">
                <ul className="navList">
                  <li className="navListItem">
                    <Link href="/visits/create">
                      <a>Agendar Visita</a>
                    </Link>
                  </li>
                  <li className="navListItem">
                    <Link href="/visits">
                      <a>Histórico de Visitas</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Nav>

        <Nav.Item>
          <NavbarPersonalization.Text>
            <Switch
              checked={state.darkTheme}
              onChange={() =>
                setState({ ...state, darkTheme: !state.darkTheme })
              }
            />

            <NavbarPersonalization.Text className="theme-mode">
              {state.darkTheme ? (
                <>
                  <BiMoon />
                </>
              ) : (
                <>
                  <IoMdSunny />
                </>
              )}
            </NavbarPersonalization.Text>
          </NavbarPersonalization.Text>
        </Nav.Item>

        <Nav.Item>
          <NavbarPersonalization.Text className="pr-5">
            Olá, {props.username}!
          </NavbarPersonalization.Text>
        </Nav.Item>

        <Nav.Item>
          <Button type="button" onClick={() => SignOut()}>
            Sair
          </Button>
        </Nav.Item>
      </NavbarPersonalization.Collapse>
    </NavbarPersonalization>
  );
};

export default Navigation;
