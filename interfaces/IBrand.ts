import { RowDataPacket } from 'mysql2';

export default interface IBrand extends RowDataPacket {
  idPage: number;
  name: string;
}
