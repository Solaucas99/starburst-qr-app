import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const NavbarPersonalization = styled(Navbar)`
  padding: 15px;
  max-height: 100px;
  background: ${props => `${props.theme.colors.background}A5`};
  border-bottom: 1px solid ${props => props.theme.colors.primary};

  .navbar-toggler {
    background: #eeeeee;
    position: relative;
    z-index: 4;
  }

  .navbar-brand {
    @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
      width: 150px;
    }
  }

  #navbarScroll {
    @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
      width: 100%;
      height: 100vh;
      background: ${props => `${props.theme.colors.background}`};
      z-index: 0;
      overflow-x: hidden;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;

      &.show {
        display: flex;
        flex-direction: column;
        justify-content: center !important;
        align-items: center;
      }
    }

    div.navbar-nav-scroll {
      width: 30%;
      margin-right: 10px;

      @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        color: ${props => `${props.theme.colors.primary}`};
        padding: 0;
        justify-content: center;
        margin: 0;
      }
    }

    div.navMenuDropdown {
      width: 100%;
      display: flex;
      flex-direction: row;

      @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-y: hidden;
      }
    }

    div.divNavMenu {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      margin: 5px;
      border-bottom: 2px solid ${props => props.theme.colors.primary};
      padding: 10px 20px;
      cursor: pointer;
      transition: all 0.5s;
      width: 50%;

      button.mobileNavToggle {
        display: none;
        background: transparent;
        border: none;
        color: ${props => props.theme.colors.buttonText};
      }

      @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
        width: 80%;
        border-bottom: 1px solid #acacac5a;
        padding: 20px;

        button.mobileNavToggle {
          display: block;
          color: ${props => props.theme.colors.primary};
        }

        span.navTitle {
          display: none !important;
        }
      }

      &.active {
        @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
          border-bottom: 2px solid ${props => props.theme.colors.primaryHover};
          background: ${props => props.theme.colors.primaryHover};

          button.mobileNavToggle {
            color: ${props => props.theme.colors.buttonText};
          }

          div.navContent {
            height: 100px;
            opacity: 1;
            position: relative;
            top: 5px;
            background: transparent !important;
            width: 100%;
            border-radius: none;
          }
        }
      }

      &:hover {
        border-bottom: 2px solid ${props => props.theme.colors.primaryHover};
        background: ${props => props.theme.colors.primaryHover};

        span.navTitle {
          color: ${props => props.theme.colors.buttonText};
        }

        div.navContent {
          height: 100px;
          opacity: 1;
        }
      }

      span.navTitle {
        width: 100%;
        transition: all 0.5s;
        justify-content: center;
        display: flex;
      }

      div.navContent {
        position: absolute;
        top: 40px;
        background-color: ${props => `${props.theme.colors.primary}`};
        z-index: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 200px;
        height: 0px;
        transition: all 0.5s;
        opacity: 0;
        border-radius: 10px;

        ul.navList {
          width: 100%;
          list-style: none;
          height: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          left: 0;
          padding: 10px;

          li.navListItem {
            width: 100%;
            height: 100%;
            position: relative;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid
              ${props => `${props.theme.colors.primaryHover}B4`};
            font-size: 14px;
            transition: all 0.5s;
            margin-top: 5px;
            box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.15);

            a {
              color: ${props => props.theme.colors.buttonText};
              text-decoration: none;
            }

            &:hover {
              background: ${props => props.theme.colors.background};

              a {
                color: ${props => props.theme.colors.primaryHover};
              }
            }
          }
        }
      }
    }

    .nav-item {
      text-align: left;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      button {
        &:hover {
          background: ${props => props.theme.colors.primary};
          color: ${props => props.theme.colors.buttonText};
        }
      }

      &:hover .dropdown-menu {
        display: block;
      }

      &.dropdown {
        flex-direction: column;

        .dropdown-menu {
          width: 100%;
          background: ${props => `${props.theme.colors.primary}`};
          border: none;

          &.show {
            transition: all 0.5s;
          }
        }

        span.dropdown-item {
          a {
            color: #121212;
            text-decoration: none;
          }

          &:hover {
            background: ${props => `${props.theme.colors.primaryHover}`};
          }
        }
      }

      .react-switch-bg {
        background: ${props => `${props.theme.colors.primary}`} !important;
      }

      a,
      span {
        color: ${props => `${props.theme.colors.primary}`};
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button {
        margin: 0 10px;
        color: ${props => `${props.theme.colors.primary}`};
        background: none;
        border: 2px solid ${props => `${props.theme.colors.primary}`};
      }

      @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
        margin-top: 5px;
        font-size: 15px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #acacac5a;
        padding: 20px;
        width: 80%;

        button {
          width: 100%;
          background: none;
          border: none;
          color: red;
          font-size: 20px;

          &::active {
            border: none;
          }
        }
      }
    }
  }
`;
