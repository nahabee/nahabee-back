import { RowDataPacket } from 'mysql2';

export default interface IPage extends RowDataPacket {
  idPage: number;
  title: string;
  description: string;
}
