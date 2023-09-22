import { getAccessToken } from '../localStorage/localStorage';
import { AddTeam, ViewTeam } from '../types/Team';
import { axiosClient } from './axiosClient';

class TeamApi {
	addTeam = (team: AddTeam) => {
		const url = `/team`;
		return axiosClient.post<AddTeam>(url, team, {
			headers: { x_authorization: getAccessToken() },
		});
	};
	loadMyTeams = (userId: string) => {
		const url = `/team/my-teams/${userId}`;
		return axiosClient.get<ViewTeam[]>(url, {
			headers: { x_authorization: getAccessToken() },
		});
	};
	loadJoinedTeam = (userId: string) => {
		const url = `/team/joined-teams/${userId}`;
		return axiosClient.get<ViewTeam[]>(url, {
			headers: { x_authorization: getAccessToken() },
		});
	};
}

const teamApi = new TeamApi();
export default teamApi;
