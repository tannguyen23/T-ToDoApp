import { getAccessToken } from '../localStorage/localStorage';
import { Member } from '../types/Member';
import { axiosClient } from './axiosClient';

class MemberApi {
  getListDropdownMember = (ownerId: string) => {
		const id = ownerId;
		const url = `/auth/dropdown-member/${id}`;

		return axiosClient.get<Member[]>(url, {
			headers: { x_authorization: getAccessToken() },
		});
	};
}

const memberApi = new MemberApi();
export default memberApi