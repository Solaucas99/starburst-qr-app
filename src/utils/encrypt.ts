import cryptojs from 'crypto-js';

export function encryptAES(dataToEncrypt: string): string {
  const toEncrypt = JSON.stringify(dataToEncrypt);

  const encrypt = cryptojs.AES.encrypt(
    toEncrypt,
    process.env.NEXT_PUBLIC_REACT_APP_SECRET_KEY as string
  ).toString();

  return encrypt;
}

export function encryptHMAC(dataToEncrypt: string): string {
  const toEncrypt = JSON.stringify(dataToEncrypt);

  const encrypt = cryptojs
    .HmacSHA512(
      toEncrypt,
      process.env.NEXT_PUBLIC_REACT_APP_SECRET_KEY as string
    )
    .toString();

  return encrypt;
}
