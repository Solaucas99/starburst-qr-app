interface Visitor {
  email: string;
  cpf: string;
  nome: string;
  bie?: string;
  bic?: string;
  phone?: string;
  // eslint-disable-next-line
  generated_pass?: string;
  // eslint-disable-next-line
  confirmed_email?: boolean;
  // eslint-disable-next-line
  accept_promotions?: boolean;
  _id?: string;
}

interface Visit {
  date: string;
  visitor: Visitor;
  finished?: boolean;
  qrcode?: string;
  _id?: string;
}

export interface AllVisits {
  data: Visit[];
  message: string;
}

export type CleanUp = () => void;
