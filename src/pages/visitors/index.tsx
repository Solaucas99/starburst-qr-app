import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Pagination } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { BiEdit } from 'react-icons/bi';

import { decryptAES } from '@utils/decrypt';
import { Container } from '@styles/Index/Index';
import { List, ExternalList } from '@styles/Visitors/Index/Index';
import { useFetch } from '@hooks/useFetch';
import Loading from '@components/Loading';

import { IVisitor } from '@interfaces/Visitors/IVisitor';

const Index: NextPage = () => {
  const router = useRouter();
  const { page = '1', limit = '5' } = router.query;

  const { data, isLoading, isError } = useFetch<IVisitor[]>(`/visitors/all`);

  const [visitorFilter, setVisitorFilter] = useState<IVisitor[]>([]);

  function handleSearchVisitorChange(e: string) {
    const filter = data.data.filter(
      visitor =>
        visitor.nome.toUpperCase().includes(e.toUpperCase()) ||
        visitor.email.toUpperCase().includes(e.toUpperCase()) ||
        visitor.cpf.toUpperCase().includes(e.toUpperCase())
    );
    setVisitorFilter(filter);
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
  } = calculatePages(Number(page), Number(limit), visitorFilter.length);

  const pagination = [];

  const filteredVisitors = visitorFilter.slice(ind, endIndex);

  for (let i = 1; i <= pagesLength; i += 1) {
    pagination.push(
      <Pagination.Item
        href={`/visitors?page=${i}&limit=${limit}`}
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
        const visitor = value;
        visitor.email = decryptAES(value.email);
        visitor.cpf = decryptAES(value.cpf);
        return visitor;
      });
      setVisitorFilter(arr);
    }
  }, [data]);

  return (
    <Container>
      <Head>
        <title>Visitantes : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <h1>Lista de visitantes</h1>

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
                placeholder="Procurar visitante"
                onChange={e => handleSearchVisitorChange(e.target.value)}
              />
            </label>
          </form>

          <List>
            <table>
              <thead>
                <tr>
                  <th>Indice</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>CPF</th>
                  <th>E-mail confirmado</th>
                  <th>Detalhar Visitante</th>
                  <th>Editar Visitante</th>
                </tr>
              </thead>

              {filteredVisitors.map((visitor, index) => (
                <tbody className="divList" key={visitor._id}>
                  <tr>
                    <td>{index <= 9 ? `0${index + 1}` : `${index + 1}`}</td>
                    <td>{visitor.nome}</td>
                    <td>{visitor.email}</td>
                    <td>
                      {visitor.cpf.replace(
                        /(\d{3})(\d{3})(\d{3})(\d{2})/g,
                        '$1.$2.$3-$4'
                      )}
                    </td>
                    <td>{visitor.confirmed_email ? 'Sim' : 'Não'}</td>
                    <td>
                      <Link href={`visitors/profile/${visitor._id}`}>
                        <button type="button" title="Detalhar visitante">
                          <HiOutlineClipboardList size={35} />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={`visitors/update/send?email=${visitor.email}`}
                      >
                        <button type="button" title="Editar visitante">
                          <BiEdit size={35} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </List>

          {filteredVisitors.length > 0 && (
            <Pagination>
              <Pagination.Prev
                onClick={e => {
                  e.stopPropagation();
                  if (Number(page) <= 1) return;
                  router.push(
                    `/visitors?page=${Number(page) - 1}&limit=${limit}`
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
                    `/visitors?page=${Number(page) + 1}&limit=${limit}`
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
