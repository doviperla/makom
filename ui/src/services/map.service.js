import axios from 'axios';
import { API, HEADERS } from '../utils/constants';

export const get_lists_data = async (user) => {
    return axios.post(`${API}/pepole/get-all`, { token: user.token, pepole_list_id: null })
}