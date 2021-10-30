import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: ${props => props.theme.colors.text};
  transition: ease-in 0.2s;
  width: 100%;

  .list-group-container {
    width: 70%;

    .list-group {
      border-radius: 10px;

      .list-group-item {
        padding: 22px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 18px;
      }

      .list-group-item:first-child {
        font-size: 25px;
      }

      .list-group-item:last-child {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;

        button {
          padding: 10px;
        }
      }
    }
  }

  .notFound {
    display: flex;
    justify-content: center;
    height: 200vh;
    width: 100%;
    background-color: black;
    position: absolute;
    top: 56px;
    z-index: 999999;

    h1 {
      color: #eeeeee;
      padding: 10px 0;
    }
  }

  h1 {
    color: ${props => props.theme.colors.text};
  }
`;

export const HomePage = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    'header header header header header header'
    'main main main main main main'
    'footer footer footer footer footer footer';

  footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: ${props => props.theme.colors.footerColor};
    padding: 20px;
    font-size: 16px;
    color: ${props => props.theme.colors.footerText};
    grid-area: footer;
    border-top: 3px solid ${props => props.theme.colors.primary};
    max-width: 100vw;

    h1 {
      color: ${props => props.theme.colors.footerText};
    }

    div.social {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 15%;

      a.btnSocialIcons {
        button {
          font-size: 28px;
          background: transparent;
          border: none;
          transition: all 0.5s;
          color: ${props => props.theme.colors.footerText};
          padding: 10px;

          &:hover {
            color: ${props => props.theme.colors.primaryHover};
            transform: translateY(-10px);
          }
        }
      }
    }
  }

  div.intro {
    background-color: ${props => `${props.theme.colors.background}A5`};
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    grid-area: header;
    height: 500px;
    flex: 1;
    max-width: 100vw;

    @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
      height: inherit;
    }
  }

  section.introContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    padding: 25px;

    @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
      padding: 15px 0;
      flex-direction: column;
    }
  }

  section.introText {
    width: 50%;
    padding: 25px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    color: ${props => props.theme.colors.reverseText};

    @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
      justify-content: center;
      padding: 15px;
      width: 100%;
    }

    h1 {
      color: ${props => props.theme.colors.reverseText};
    }

    p {
      font-size: 18px;
    }

    button {
      border: none;
      background: ${props => props.theme.colors.reverseText};
      padding: 10px 40px;
      border-radius: 20px;
      transition: all 0.5s;

      a {
        color: ${props => props.theme.colors.buttonText};
        text-decoration: none;
      }

      &:hover {
        background: ${props => props.theme.colors.primary};

        a {
          color: ${props => props.theme.colors.buttonText};
        }
      }
    }
  }

  section.introImages {
    width: 50%;
    padding: 25px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    flex-wrap: wrap;

    @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
      padding: 15px;
      width: 100%;
    }

    img {
      height: 300px;
      border-radius: 25px;
    }

    small {
      margin-top: 5px;
      color: ${props => props.theme.colors.reverseText};
    }
  }

  main.mainContainer {
    grid-area: main;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    flex: 1;
    max-width: 100vw;

    section.flux {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      background: ${props => `${props.theme.colors.reverseText}A5`};
      padding: 100px 25px;

      p {
        margin-top: 15px;
      }

      h1 {
        color: ${props => props.theme.colors.buttonText};
      }

      section.fluxContent {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 80%;
        color: ${props => props.theme.colors.buttonText};

        @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
          width: 100%;
        }

        span.imgFlux {
          background: ${props => props.theme.colors.imgFluxColor};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          color: ${props => props.theme.colors.imgFluxText};
          border-radius: 20px;
          width: 80%;

          img {
            width: 100%;
          }

          @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
            width: 100%;

            small {
              font-size: 9px;
            }
          }
        }
      }
    }

    section.visitsCards {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      flex-wrap: wrap;
      width: 100%;
      background: ${props => `${props.theme.colors.background}B5`};

      h1 {
        color: ${props => props.theme.colors.reverseText};
        margin-top: 20px;
      }

      div.cardsRow {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        flex: 1;
        flex-wrap: wrap;
        width: 100%;
        list-style: none;
        padding: 50px 25px;
        margin-top: 20px;

        @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
          padding: 30px 0;
          margin-top: 10px;
          justify-content: center;
          flex-direction: column;
        }

        li {
          margin-bottom: 10px;
          display: grid;
          place-items: center;
          position: relative;
          padding: 10px 20px;
          background: ${props => props.theme.colors.cardBoxColor};
          margin-right: 20px;
          box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.05),
            inset -5px -5px -5px rgba(255, 255, 255, 0.5),
            5px 5px 5px rgba(255, 255, 255, 0.05),
            -5px -5px -5px rgba(255, 255, 255, 0.5);
          border-radius: 15px;
          z-index: 1;

          @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
            margin-right: 0px;
          }
        }

        .card {
          background: ${props => props.theme.colors.cardColor};
          color: ${props => props.theme.colors.cardColorText};
          border-radius: 15px;
          width: 330px;
          height: 30rem;
          font-size: 20px;
          display: flex;
          text-align: center;
          border: 1px solid ${props => props.theme.colors.primary};
          transition: all 0.5s;
          padding: 10px;
          position: relative;
          z-index: 200;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

          @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
            width: 280px;
            padding: 5px;
            font-size: 15px;
          }

          p.card-text {
            border-bottom: 0.5px solid #cccccc15;
            padding: 10px;
          }

          &:hover {
            transform: translateY(-50px);
            background: ${props => props.theme.colors.cardColorHover};
            border: none;
          }

          &:hover .doZoom {
            z-index: 1;
            transition: 0.5s;
            animation: zoom 0.5s;
            transform: scale(1.05);

            @keyframes zoom {
              0% {
                transform: scale(1);
              }
              100% {
                transform: scale(1.05);
              }
            }

            button {
              background: ${props => props.theme.colors.cardColorButtonHover};
              color: ${props => props.theme.colors.cardColorButtonHover};
              background: transparent;
              border: 2px solid
                ${props => props.theme.colors.cardColorButtonHover};

              &:hover {
                background: ${props => props.theme.colors.cardColorButtonHover};
                color: ${props => props.theme.colors.cardColorButtonText};
                border: none;
              }
            }
          }

          .doZoom {
            position: relative;
            top: 80px;
          }

          small {
            position: absolute;
            width: 100%;
            left: -15px;
            height: 50px;
            background: ${props => props.theme.colors.primary};
            top: 20px;
            border-radius: 30px;
            border-bottom-left-radius: 0;
            color: ${props => props.theme.colors.buttonText};
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;

            &::before {
              content: '';
              position: absolute;
              width: 15px;
              height: 30px;
              background: ${props => props.theme.colors.primaryHover};
              top: 50px;
              left: 0;
              border-top-left-radius: 20px;
              border-bottom-left-radius: 20px;
              z-index: 2;
            }

            &::after {
              content: '';
              position: absolute;
              top: 50px;
              width: 15px;
              height: 15px;
              background: ${props => props.theme.colors.primary};
              left: 0;
              z-index: 1;
            }
          }

          img {
            height: 150px;
            width: 150px;
            border: 3px solid ${props => props.theme.colors.primary};
          }

          .btn {
            background-color: ${props => props.theme.colors.cardColorButton};
            color: ${props => props.theme.colors.buttonText};
            border: none;

            a {
              color: inherit;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
`;
