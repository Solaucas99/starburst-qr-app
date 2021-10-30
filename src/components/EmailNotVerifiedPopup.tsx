import React, { useRef } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { MdEmail } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { EmailConfirmationPopup } from '../styles/utils/EmailConfirmationPopup';

const ConfirmPopupDialog: NextPage = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <EmailConfirmationPopup ref={divRef}>
      <button
        type="button"
        className="close"
        onClick={() => {
          divRef.current.style.display = 'none';
        }}
      >
        X
      </button>
      <div>
        <h3>
          <GiConfirmed />
          <MdEmail /> Quase tudo pronto, porém...
        </h3>

        <span>
          Ainda falta uma etapa! Verificamos que seu e-mail ainda não foi
          confirmado... Lembrando que para utilizar qualquer recurso por aqui,
          você precisa confirmar seu e-mail antes. Clique abaixo para fazer a
          verificação do seu e-mail.
        </span>

        <Link href="/auth/admin/verifyemail">
          <a>Clique aqui</a>
        </Link>
      </div>
    </EmailConfirmationPopup>
  );
};

export default ConfirmPopupDialog;
