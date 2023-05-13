import { Member } from "./Member";

export type Team = {
    id? : number;
    ownerId : number;
    name : string;
    description : string;
    members : Member[];
    createTime : string;
}