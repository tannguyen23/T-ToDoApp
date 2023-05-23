import { StatusTask, Task } from "../types/Task";
import { axiosClient } from "./axiosClient";
class TaskApi {
  addTask = (task: Task) => {
    const url = `/task`;
    return axiosClient.post<Task>(url, task);
  };
  getTasks = () => {
    const url = `/task`;
    return axiosClient.get<Task[]>(url);
  };
  getTaskById = (id: string) => {
    const url = `/task/${id}`;
    return axiosClient.get<Task>(url);
  };
  updateTask = (id: string, newTask: Task) => {
    const url = `/task/${id}`;
    return axiosClient.put<Task>(url, newTask);
  };
  updateNewStatus = (id: string, newStatus: StatusTask) => {
    const url = `/task/update-status/${id}/`;
    return axiosClient.put<StatusTask>(url, { newStatus });
  };
  deletetask = (id: string) => {
    const url = `/task/${id}`;
    return axiosClient.delete<Task>(url);
  };
}

const taskApi = new TaskApi();
export default taskApi;
