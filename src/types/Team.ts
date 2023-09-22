import { Member } from './Member';

export type AddTeam = {
    _id? : string;
    id? : string;
    ownerId : string;
    name : string;
    description : string;
    members : string[] ;
    createDate : string;
}

export type ViewTeam = {
    _id? : string;
    id? : string;
    ownerId : string;
    name : string;
    description : string;
    members :  Member[];
    createDate : string;
}