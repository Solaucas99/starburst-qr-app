export interface IVisitor {
  _id: string;
  nome: string;
  email: string;
  cpf: string;
  bie: string;
  bic: string;
  generated_pass?: string | null;
  phone?: string | null;
  accept_promotions: boolean;
  confirmed_email: boolean;
}
