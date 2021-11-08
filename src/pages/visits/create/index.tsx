import React, { useState, useRef, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button, ListGroup } from 'react-bootstrap';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';

import { Container } from '@styles/Index/Index';
import {
  CreateVisitForm,
  VisitorListContainer,
} from '@styles/Visits/Create/Index';
import toast from '@services/toastMessage';
import axios from '@services/axios';
import Loading from '@components/Loading';
import { useFetch } from '@hooks/useFetch';

import { IVisitor } from '@interfaces/Visitors/IVisitor';
import { IVisit } from '@interfaces/Visits/IVisit';
import { IAxiosResponse } from '@interfaces/utils/IAxiosResponse';

const Index: NextPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean | ''>(false);
  const [containerToggled, setContainerToggled] = useState<boolean>(false);
  const [visitorFilter, setVisitorFilter] = useState<IVisitor[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [animation, setAnimation] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [hour, setHour] = useState<number>(8);
  const [minutes, setMinutes] = useState<number>(0);

  const {
    data,
    isLoading: fetchLoading,
    isError,
  } = useFetch<IVisitor[]>('/visitors/all');

  const containerRef = useRef<HTMLDivElement>(null);
  const visitorInputRef = useRef<HTMLInputElement>(null);
  const visitorsListRef = useRef<HTMLDivElement>(null);

  function handleSelectVisitor(): void {
    setContainerToggled(toggleState => !toggleState);
    visitorsListRef.current.scrollTop = 0;
    visitorInputRef.current.value = '';
  }

  function getActualDate(): string {
    const dt = new Date();

    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getMaximumDate(): string {
    const dt = new Date();

    const year = dt.getFullYear() + 1;
    const month = 12;
    const day = 31;
    return `${year}-${month}-${day}`;
  }

  function handleHourChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const hourSelected = Number(e.target.value);
    if (hourSelected < 8 || hourSelected > 17) return;
    setHour(hourSelected);
  }

  function handleMinutesChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const minuteSelected = Number(e.target.value);
    if (minuteSelected < 0 || minuteSelected > 59) return;
    setMinutes(minuteSelected);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const dateSelected = e.target.value;

    const dateSelectedTime = new Date(dateSelected).getTime();
    const dateMin = new Date(getActualDate()).getTime();
    const dateMax = new Date(getMaximumDate()).getTime();

    if (dateSelectedTime < dateMin || dateSelectedTime > dateMax) return;

    setDate(dateSelected);
  }

  function handleBlurInput(e: React.FocusEvent<HTMLInputElement>) {
    const target = e.relatedTarget as HTMLButtonElement | HTMLDivElement;

    if (
      (target && target.id === 'dropdownButton') ||
      (target && target.id === 'toggleContainer')
    )
      return;

    setContainerToggled(false);
    visitorsListRef.current.scrollTop = 0;
    e.target.value = '';
  }

  function handleSearchInputChange(value: string): void {
    const filter = data.data.filter(visitor =>
      visitor.nome.toUpperCase().includes(value.toUpperCase())
    );
    const visitorsAlpha = filter.sort((visitorA, visitorB) =>
      visitorA.nome.localeCompare(visitorB.nome)
    );
    const visitors = visitorsAlpha.sort((visitorA, visitorB) =>
      visitorA.confirmed_email >= visitorB.confirmed_email ? -1 : 1
    );
    setVisitorFilter(visitors);

    if (value) {
      setSearchInputValue('');
    }
  }

  function handleOptionClick(value: string): void {
    setSearchInputValue(value);
    setContainerToggled(false);
    visitorsListRef.current.scrollTop = 0;
    visitorInputRef.current.value = '';
  }

  async function handleSubmit(e: React.SyntheticEvent): Promise<void> {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!searchInputValue) {
        toast(
          'Você precisa selecionar um visitante para marcar a visita...',
          'error'
        );
        setIsLoading(false);
        return;
      }

      if (!date) {
        toast('Nenhuma data selecionada', 'error');
        setIsLoading(false);
        return;
      }

      const { _id: visitorId } = visitorFilter.find(
        visitor => visitor.nome === searchInputValue
      );

      const filteredDate = date.split('-');

      const year = Number(filteredDate[0]);
      const month = Number(filteredDate[1]);
      const day = Number(filteredDate[2]);

      const response = await axios.post<IAxiosResponse<IVisit>>(
        `/visits/create`,
        {
          visitor: visitorId,
          date: {
            year,
            month,
            day,
            hour,
            minutes,
          },
        }
      );

      if (response.status !== 200) {
        setIsLoading(false);
        toast(response.data.message, 'error');
        return;
      }
      toast(response.data.message, 'success');
      router.push(`/visits/details/${response.data.data?._id}`);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast(err.response.data.message, 'error');

      if (
        err.response.data.message ===
        'Para realizar essa ação, você primeiro precisa confirmar seu e-mail'
      ) {
        router.push('/auth/admin/verifyemail');
      }
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      if (containerToggled) {
        containerRef.current.style.display = 'block';
        setAnimation('animateToggleDown');
      } else {
        containerRef.current.style.display = 'none';
      }
    }

    if (data) {
      const visitorsAlpha = data.data.sort((visitorA, visitorB) =>
        visitorA.nome.localeCompare(visitorB.nome)
      );
      const visitors = visitorsAlpha.sort((visitorA, visitorB) =>
        visitorA.confirmed_email >= visitorB.confirmed_email ? -1 : 1
      );
      setVisitorFilter(visitors);
    }
  }, [containerToggled, data]);

  return (
    <Container>
      <Head>
        <title>Agendar Visita : STARBURST-QR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <h1>Agendamento da Visita</h1>

      {isLoading && <Loading isLoading={isLoading || fetchLoading} />}

      <CreateVisitForm onSubmit={e => handleSubmit(e)}>
        <label id="visitorLabel" htmlFor="visitor">
          Visitante:
          <button
            onClick={e => {
              e.stopPropagation();
              handleSelectVisitor();
            }}
            type="button"
            id="dropdownButton"
            className="dropToggle"
            disabled={
              visitorFilter.length === 0 &&
              visitorInputRef.current &&
              !visitorInputRef.current.value
            }
          >
            {visitorFilter.length === 0
              ? 'Não existem visitantes cadastrados ainda :('
              : searchInputValue || 'Clique aqui para selecionar um visitante'}
            <IoMdArrowDropdown className="icon" />
          </button>
          <VisitorListContainer ref={containerRef}>
            <div
              ref={visitorsListRef}
              className={`visitorFindContainer ${animation}`}
            >
              <span className="inputSpan">
                <AiOutlineSearch className="icon" />
                <input
                  onChange={e => handleSearchInputChange(e.target.value)}
                  onBlur={handleBlurInput}
                  ref={visitorInputRef}
                  placeholder="Procurar visitante"
                  type="text"
                />
              </span>

              {isError && !data ? (
                <h1>
                  Ocorreu um erro ao carregar a lista de visitantes. Verifique
                  se tem visitantes cadastrados ou tente novamente mais tarde...
                </h1>
              ) : (
                <ListGroup as="ul" variant="flush">
                  {visitorFilter.map(visitor => (
                    <ListGroup.Item as="li" key={visitor._id}>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleOptionClick(visitor.nome);
                        }}
                        type="button"
                        id="toggleContainer"
                        disabled={!visitor.confirmed_email}
                      >
                        {visitor.nome}{' '}
                        {visitor.confirmed_email
                          ? null
                          : '(Precisa confirmar o e-mail)'}
                      </button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
          </VisitorListContainer>
        </label>

        <label htmlFor="calendar">
          Data:
          <input
            onChange={handleDateChange}
            type="date"
            id="calendar"
            name="calendar"
            value={date}
            min={getActualDate()}
            max={getMaximumDate()}
          />
        </label>

        <label htmlFor="hour">
          Horas:
          <select onChange={handleHourChange} id="hourHidden" name="hourHidden">
            {Array.from(Array(10), (value, index) => (
              <option key={index} value={index + 8}>
                {index + 8 < 10 ? `0${index + 8}` : index + 8}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="hour">
          Minutos:
          <select
            onChange={handleMinutesChange}
            id="hourHidden"
            name="hourHidden"
          >
            {Array.from(Array(60), (value, index) => (
              <option key={index} value={index}>
                {index < 10 ? `0${index}` : index}
              </option>
            ))}
          </select>
        </label>

        <Button type="submit">Agendar</Button>
      </CreateVisitForm>
    </Container>
  );
};

export default Index;
