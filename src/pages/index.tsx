import React, { useRef, useEffect, useCallback } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

import { useFetch } from '@hooks/useFetch';
import { Container, HomePage } from '@styles/Index/Index';
import Loading from '@components/Loading';

import QRImage from '@images/index/qranimation.jpg';
import FluxImage from '@images/index/visitcreationflux.png';

import { IVisit } from '@interfaces/Visits/IVisit';

const Index: NextPage = () => {
  type Elements = (typeof introElementRef.current[] | HTMLElement[]) | null;
  interface ObserverSubject {
    subscribe: (...observers: Elements) => void;
    notifyAll: () => void;
  }

  const introElementRef = useRef<HTMLElement>(null);
  const fluxRef = useRef<HTMLElement>(null);
  const visitsCardsRef = useRef<HTMLElement>(null);

  const { data, isLoading, isError } = useFetch<IVisit[]>('/visits/all');

  const filterDate = (date: string): string => {
    const dateForFilter = new Date(date);
    const year = dateForFilter.getFullYear();
    const day = dateForFilter.getDate();
    const month = dateForFilter.getMonth() + 1;
    const hour = dateForFilter.getHours();
    const minutes = dateForFilter.getMinutes();

    return `${day}/${month}/${year} - ${hour <= 9 ? `0${hour}` : hour}:${
      minutes <= 9 ? `0${minutes}` : minutes
    }`;
  };

  const subject = useCallback((): ObserverSubject => {
    const stateObservers: {
      observers: Elements;
    } = {
      observers: [],
    };

    function subscribe(...observers: Elements): void {
      stateObservers.observers.push(...observers);
    }

    function notifyAll() {
      stateObservers.observers.forEach(element => {
        if (!element) return;

        if (element.getBoundingClientRect().y <= -250) {
          element.classList.remove('animate__fadeInLeft');
          element.classList.add('animate__fadeOutLeft');
        } else {
          element.classList.remove('animate__fadeOutLeft');
          element.classList.add('animate__fadeInLeft');
        }
      });
    }

    return {
      subscribe,
      notifyAll,
    };
  }, []);

  useEffect(() => {
    const defaultSubject = subject();
    defaultSubject.subscribe(introElementRef.current);
    defaultSubject.subscribe(fluxRef.current);
    defaultSubject.subscribe(visitsCardsRef.current);

    window.onscroll = () => {
      defaultSubject.notifyAll();
    };
  }, [subject]);

  return (
    <div>
      <Head>
        <title>Home : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container>
        {isLoading && <Loading isLoading={isLoading} />}
        <HomePage>
          <div className="intro">
            <section
              className="introContainer animate__animated animate__fadeInLeft"
              ref={introElementRef}
            >
              <section className="introText">
                <h1>Starburst-QR</h1>
                <p>
                  Trazemos a tecnologia para sua organização! Agende e receba
                  visitantes em sua empresa de forma totalmente segura e
                  automatizada e evite processos burocráticos de autenticação.
                </p>
                <button type="button" className="knowMore">
                  <Link href="#knowMore">
                    <a>Saiba mais</a>
                  </Link>
                </button>
              </section>

              <section className="introImages">
                <Image src={QRImage} />
                <small>
                  Facilitando a burocracia pro visitante se identificar!
                </small>
              </section>
            </section>
          </div>

          <main id="knowMore" className="mainContainer">
            <section className="flux">
              <section ref={fluxRef} className="animate__animated fluxContent">
                <h1>Como funciona o fluxo para criar visitas?</h1>

                <span className="imgFlux">
                  <Image src={FluxImage} />
                  <small>Fluxo para administradores do sistema</small>
                </span>

                <p>
                  E pronto! Simples assim. Agora o visitante com os dados
                  recebidos no e-mail pode no dia da visita apresentar o QR-Code
                  enviado pra ele e assim ser autenticado de forma simples e
                  automatizada...
                </p>
              </section>
            </section>

            <section
              ref={visitsCardsRef}
              className="visitsCards animate__animated"
            >
              <h1>Ultimas Visitas agendadas</h1>
              {!data || !data.data || data.data.length === 0 || isError ? (
                <p>
                  Ops... Parece que ainda não tem nenhuma visita agendada por
                  aqui... :({' '}
                </p>
              ) : (
                <div className="cardsRow">
                  {data.data
                    .map(visit => (
                      <li key={visit._id}>
                        <Card>
                          <small>
                            {visit.visitor
                              ? visit.visitor.nome
                              : 'Desconhecido'}
                          </small>

                          <div className="doZoom">
                            <Card.Body>
                              {visit.qrcode && visit.qrcode !== '' ? (
                                <Card.Img variant="top" src={visit.qrcode} />
                              ) : (
                                <Card.Text>
                                  Visita sem QR Code por já ter sido concluída!
                                </Card.Text>
                              )}
                              <Card.Text>
                                Data: {filterDate(visit.date)}
                              </Card.Text>
                              <Card.Text
                                style={{
                                  color: `${visit.finished ? 'green' : 'red'}`,
                                }}
                              >
                                Status:{' '}
                                {visit.finished
                                  ? 'Finalizada'
                                  : 'Não Finalizada'}
                              </Card.Text>

                              <Button variant="info">
                                <Link href={`/visits/details/${visit._id}`}>
                                  <a>Visualizar visita</a>
                                </Link>
                              </Button>
                            </Card.Body>
                          </div>
                        </Card>
                      </li>
                    ))
                    .slice(0, 3)}
                </div>
              )}
            </section>
          </main>
        </HomePage>
      </Container>
    </div>
  );
};

export default Index;
