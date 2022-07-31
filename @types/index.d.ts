import IUser from '../interfaces/IUser';

declare global {
  namespace Express {
    interface Request {
      record?: IUser; // used to store deleted record to send appropriate responses to react-admin
    }
  }
}
