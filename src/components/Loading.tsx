import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Spinner } from '../styles/utils/Spinner';

const Loading: NextPage<{ isLoading: boolean }> = ({ ...props }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = url => url !== router.asPath && setLoading(true);
    const handleComplete = url => url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });
  if (props.isLoading || loading) {
    return (
      <Spinner>
        <span />
        <p>Carregando...</p>
      </Spinner>
    );
  }

  return <></>;
};

export default Loading;
