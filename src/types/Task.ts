import { Category } from './Category';
import { Member } from './Member';

export type AddTask = {
  _id? : string;
  id?: string;
  title: string;
  imgUrl? : string;
  description: string;
  timeStart: string ;
  timeEnd: string;
  categories : Category[];
  members : string[];
  ownerId? : string;
  status: StatusTask;
};
export type ViewTask = {
  _id? : string;
  id?: string;
  title: string;
  imgUrl? : string;
  description: string;
  timeStart: string ;
  timeEnd: string;
  categories : Category[];
  members : Member[];
  ownerId? : string;
  status: StatusTask;
}
export type StatusTask = "NOT_START" | "DONE" | "PROCESSING" | "FAILED";
