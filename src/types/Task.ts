import { Category } from "./Category";
import { Member } from "./Member";

export type Task = {
  id?: number;
  title: string;
  imgUrl? : string;
  description: string;
  timeStart: string ;
  timeEnd: string;
  categories : Category[];
  assignMember : Member[];
  status: StatusTask;
};

export type StatusTask = "NOT_START" | "DONE" | "PROCESSING" | "FAILED";
