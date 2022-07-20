import { RowDataPacket } from 'mysql2';

export default interface IImage extends RowDataPacket {
  name: string;
  idPage: number;
  brand: string;
}
