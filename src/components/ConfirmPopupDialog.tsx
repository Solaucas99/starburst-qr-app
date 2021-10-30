import React from 'react';
import { NextPage } from 'next';
import { Popup, PopupContainer } from '../styles/utils/Popup';

const ConfirmPopupDialog: NextPage<{
  message: string;
  callback: (value: boolean) => void;
}> = ({ message, callback }) => (
  <PopupContainer>
    <Popup
      className="animate__animated animate__bounceIn"
      onClose={() => callback(false)}
      dismissible
    >
      <Popup.Heading>Olá!</Popup.Heading>
      <p>{message}</p>
      <hr />
      <div className="d-flex justify-content-end">
        <button type="button" onClick={() => callback(true)}>
          Confirmar
        </button>

        <button type="button" onClick={() => callback(false)}>
          Cancelar
        </button>
      </div>
    </Popup>
  </PopupContainer>
);

export default ConfirmPopupDialog;
