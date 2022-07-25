import { RowDataPacket } from 'mysql2';

export default interface IMesure extends RowDataPacket {
  name: string;
  description: string;
}
