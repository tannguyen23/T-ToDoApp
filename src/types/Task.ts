import { Category } from "./Category";
import { Member } from "./Member";

export type Task = {
  _id? : string;
  id?: string;
  title: string;
  imgUrl? : string;
  description: string;
  timeStart: string ;
  timeEnd: string;
  categories : Category[];
  members : Member[];
  status: StatusTask;
};

export type StatusTask = "NOT_START" | "DONE" | "PROCESSING" | "FAILED";
