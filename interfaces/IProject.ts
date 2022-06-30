import { RowDataPacket } from "mysql2";

export default interface IProject extends RowDataPacket {
    nameProject: string;
    image: string;
    projectDesc: string;
    client: string;
    subsidiary: string;
    startDate: string;
    finalDate: string;
    progress: number;
    industryTag: string;
    color: string;
    projectManager: string;
}