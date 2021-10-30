import React from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import { NextPage } from 'next';

const ToastConfig: NextPage<ToastContainerProps> = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable={false}
    pauseOnHover
  />
);

export default ToastConfig;
