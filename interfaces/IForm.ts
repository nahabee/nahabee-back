import { RowDataPacket } from 'mysql2';

export default interface IForm extends RowDataPacket {
  name: string;
  email: string;
  message: string;
}
