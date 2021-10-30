import cryptojs from 'crypto-js';

export function decryptAES(dataToDecrypt: string): string {
  if (!dataToDecrypt || process.env.NEXT_PUBLIC_REACT_APP_SECRET_KEY) return '';

  const decrypt = cryptojs.AES.decrypt(
    dataToDecrypt,
    process.env.NEXT_PUBLIC_REACT_APP_SECRET_KEY as string
  ).toString(cryptojs.enc.Utf8);

  return decrypt.replace(/(["])/g, ''); //eslint-disable-line
}
