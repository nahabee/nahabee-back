import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
}
