import axios from 'axios';
import { API, HEADERS } from '../utils/constants';

export const get_lists = async (user) => {
    return axios.post(`${API}/pepole/get-pepole-lists`, { token: user.token, pepole_list_id: null })
}

export const get_pepole_data = async (token, pepole_list_id) => {
    return axios.post(`${API}/pepole/get-pepole-data`, { token: token, pepole_list_id: pepole_list_id })
}

export const update_map = async (user, pepole_list_id, selected_gender, selected_time, map) => {
    return axios.post(`${API}/pepole/update-map`, { token: user.token, pepole_list_id: pepole_list_id, selected_gender: selected_gender, selected_time: selected_time,  map: map })
}

export const get_map = async (user, pepole_list_id, selected_gender, selected_time) => {
    return axios.post(`${API}/pepole/get-map`, { token: user.token, pepole_list_id: pepole_list_id, selected_gender: selected_gender, selected_time: selected_time })
}

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        localStorage.removeItem('user_data');
        window.location.reload();
    }
    return error;
});