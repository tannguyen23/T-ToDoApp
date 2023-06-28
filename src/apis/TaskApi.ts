import { getAccessToken } from '../localStorage/localStorage';
import { StatusTask, Task } from '../types/Task';
import { axiosClient } from './axiosClient';

class TaskApi {
	constructor() {}
	addTask = (task: Task) => {
		const url = `/task`;

		return axiosClient.post<Task>(url, task, {
			headers: { x_authorization: getAccessToken() },
		});
	};
	getTasksByOwnerId = (ownerId: string) => {
		const id = ownerId;
		const url = `/task/get-by-ownerid/${id}`;

		return axiosClient.get<Task[]>(url, {
			headers: { x_authorization: getAccessToken() },
		});
	};

	getTasksByOwnerIdOnCurrentMonth = (ownerId: string) => {
		const id = ownerId;
		const url = `/task/tasks-on-month/${id}`;

		return axiosClient.get<Task[]>(url, {
			headers: { x_authorization: getAccessToken() },
		});
	}

	getTasksByOwnerIdOnCurrentWeek = (ownerId: string) => {
		const id = ownerId;
		const url = `/task/tasks-on-week/${id}`;

		return axiosClient.get<Task[]>(url, {
			headers: { x_authorization: getAccessToken() },
		});
	}

	getTasksByOwnerIdOnCurrentDate = (ownerId: string) => {
		const id = ownerId;
		const url = `/task/tasks-on-date/${id}`;

		return axiosClient.get<Task[]>(url, {
			headers: { x_authorization: getAccessToken() },
		});
	}

	getTaskById = (id: string) => {
		const url = `/task/${id}`;
		return axiosClient.get<Task>(url, {
			headers: { x_authorization: getAccessToken() },
		});
	};
	updateTask = (id: string, newTask: Task) => {
		const url = `/task/${id}`;
		return axiosClient.put<Task>(url, newTask, {
			headers: { x_authorization: getAccessToken() },
		});
	};
	updateNewStatus = (id: string, newStatus: StatusTask) => {
		const url = `/task/update-status/${id}/`;
		return axiosClient.put<StatusTask>(
			url,
			{ newStatus },
			{
				headers: { x_authorization: getAccessToken() },
			}
		);
	};
	deletetask = (id: string) => {
		const url = `/task/${id}`;
		return axiosClient.delete<Task>(url, {
			headers: { x_authorization: getAccessToken() },
		});
	};
}

const taskApi = new TaskApi();
export default taskApi;
