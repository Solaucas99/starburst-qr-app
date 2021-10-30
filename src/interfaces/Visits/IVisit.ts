import { IVisitor } from '../Visitors/IVisitor';

export interface IVisit {
  date: string;
  visitor: IVisitor;
  finished?: boolean;
  qrcode?: string;
  _id?: string;
}
