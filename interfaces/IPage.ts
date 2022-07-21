import { RowDataPacket } from 'mysql2';

export default interface IPage extends RowDataPacket {
  title: string;
  description: string;
}
