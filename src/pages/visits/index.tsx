import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Pagination } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import { HiOutlineClipboardList } from 'react-icons/hi';

import { decryptAES } from '@utils/decrypt';
import { Container } from '@styles/Index/Index';
import { List, ExternalList } from '@styles/Visits/Index/Index';
import { useFetch } from '@hooks/useFetch';
import Loading from '@components/Loading';

import { IVisit } from '@interfaces/Visits/IVisit';

const Index: NextPage = () => {
  const router = useRouter();
  const { page = '1', limit = '5' } = router.query;

  const { data, isLoading, isError } = useFetch<IVisit[]>(`/visits/all`);

  const [visitFilter, setVisitFilter] = useState<IVisit[]>([]);

  function filterHour(date: string): string {
    const actualDate = new Date(date);

    const hour =
      actualDate.getUTCHours() <= 9
        ? `0${actualDate.getUTCHours()}`
        : `${actualDate.getUTCHours()}`;

    const minute =
      actualDate.getUTCMinutes() <= 9
        ? `0${actualDate.getUTCMinutes()}`
        : `${actualDate.getUTCMinutes()}`;

    return `${hour}:${minute}`;
  }

  function filterDate(date: string): string {
    const actualDate = new Date(date);

    const day =
      actualDate.getDate() <= 9
        ? `0${actualDate.getDate()}`
        : `${actualDate.getDate()}`;

    const month =
      actualDate.getMonth() + 1 <= 9
        ? `0${actualDate.getMonth() + 1}`
        : `${actualDate.getMonth() + 1}`;

    const year = `${actualDate.getFullYear()}`;

    return `${day}/${month}/${year}`;
  }

  function handleSearchVisitChange(e: string) {
    const filter = data.data.filter(visit => {
      if (visit.visitor) {
        return (
          visit.visitor.nome.toUpperCase().includes(e.toUpperCase()) ||
          visit.visitor.email.toUpperCase().includes(e.toUpperCase()) ||
          visit.visitor.cpf.toUpperCase().includes(e.toUpperCase()) ||
          visit.date.toUpperCase().includes(e.toUpperCase())
        );
      }
      return visit.date.toUpperCase().includes(e.toUpperCase());
    });

    const order = filter.sort((visitA, visitB) => {
      const dateA = new Date(visitA.date).getTime();
      const dateB = new Date(visitB.date).getTime();

      return dateA <= dateB ? -1 : 1;
    });

    setVisitFilter(order);
  }

  function calculatePages(actualPage, actualLimit, elementsLength) {
    const index = (actualPage - 1) * actualLimit;
    const endIndex = actualPage * actualLimit;
    const pagesLength = Math.ceil(elementsLength / actualLimit);

    return { index, endIndex, pagesLength };
  }

  const {
    index: ind,
    endIndex,
    pagesLength,
  } = calculatePages(Number(page), Number(limit), visitFilter.length);

  const pagination = [];

  const filteredVisits = visitFilter.slice(ind, endIndex);

  for (let i = 1; i <= pagesLength; i += 1) {
    pagination.push(
      <Pagination.Item
        onClick={() => router.push(`/visits?page=${i}&limit=${limit}`)}
        key={i}
        active={i === Number(page)}
      >
        {i}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    if (data) {
      const arr = data.data.map(value => {
        const visit = value;
        if (visit.visitor) {
          visit.visitor.email = decryptAES(visit.visitor.email);
          visit.visitor.cpf = decryptAES(visit.visitor.cpf);
        }
        return visit;
      });
      setVisitFilter(
        arr.sort((visitA, visitB) => {
          const dateA = new Date(visitA.date).getTime();
          const dateB = new Date(visitB.date).getTime();

          return dateA <= dateB ? -1 : 1;
        })
      );
    }
  }, [data]);

  return (
    <Container>
      <Head>
        <title>Visitas : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <h1>Lista de visitas</h1>

      {isLoading && <Loading isLoading={isLoading} />}

      {isError && <h1>Ocorreu um erro :( tente novamente mais tarde...</h1>}

      {data && !isError && !isLoading && (
        <ExternalList>
          <form onSubmit={e => e.preventDefault()}>
            <BsSearch size={30} />
            <label htmlFor="search">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Procurar visita"
                onChange={e => handleSearchVisitChange(e.target.value)}
              />
            </label>

            <label htmlFor="dateSearch">
              <input
                type="date"
                id="dateSearch"
                name="dateSearch"
                placeholder="Procurar visita"
                onChange={e => handleSearchVisitChange(e.target.value)}
              />
            </label>
          </form>

          <List>
            <table>
              <thead>
                <tr>
                  <th>Indice</th>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Finalizada?</th>
                  <th>Nome do Visitante</th>
                  <th>Email do Visitante</th>
                  <th>Detalhar Visita</th>
                </tr>
              </thead>

              {filteredVisits.length === 0 ? (
                <p>Ops... Não tem nada por aqui</p>
              ) : null}

              {filteredVisits.map((visit, index) => (
                <tbody className="divList" key={visit._id}>
                  <tr>
                    <td>{index <= 9 ? `0${index + 1}` : `${index + 1}`}</td>
                    <td>{filterDate(visit.date)}</td>
                    <td>{filterHour(visit.date)}</td>
                    <td>{visit.finished ? 'Sim' : 'Não'}</td>
                    <td>
                      {visit.visitor
                        ? visit.visitor.nome
                        : 'Visitante desconhecido'}
                    </td>
                    <td>
                      {visit.visitor
                        ? visit.visitor.email
                        : 'Visitante desconhecido'}
                    </td>
                    <td>
                      <Link href={`visits/details/${visit._id}`}>
                        <button type="button" title="Detalhar visita">
                          <HiOutlineClipboardList size={35} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </List>

          {filteredVisits.length > 0 && (
            <Pagination>
              <Pagination.Prev
                onClick={e => {
                  e.stopPropagation();
                  if (Number(page) <= 1) return;
                  router.push(
                    `/visits?page=${Number(page) - 1}&limit=${limit}`
                  );
                }}
              />
              {pagination.map(element => element)}
              {pagination.length > 3 && <Pagination.Ellipsis />}
              <Pagination.Next
                onClick={async e => {
                  e.stopPropagation();
                  if (Number(page) >= pagesLength) return;
                  router.push(
                    `/visits?page=${Number(page) + 1}&limit=${limit}`
                  );
                }}
              />
            </Pagination>
          )}
        </ExternalList>
      )}
    </Container>
  );
};

export default Index;
