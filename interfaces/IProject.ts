import { RowDataPacket } from "mysql2";

export default interface IProject extends RowDataPacket {
    nameProject: string;
    image: string;
    projectDesc: string;
    client: string;
}