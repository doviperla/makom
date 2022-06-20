import axios from 'axios';
import { API, HEADERS } from '../utils/constants';

export const get_pepole_data = async (token, pepole_list_id) => {
    return axios.post(`${API}/pepole/get-pepole-data`, { token: token, pepole_list_id: pepole_list_id })
}

export const get_pepole_lists = async (token) => {
    return axios.post(`${API}/pepole/get-pepole-lists`, { token: token })
}

export const update_list = async (token, changesList) => {
    return axios.post(`${API}/pepole/update-list`, { token: token, changesList: changesList })
}

export const delete_row = async (token, row) => {
    return axios.post(`${API}/pepole/delete-row`, { token: token, row: row })
}

export const add_new_list = async (token, pepole_list, pepole_list_data) => {
    return axios.post(`${API}/pepole/add-new-list`, { token: token, pepole_list: pepole_list, pepole_list_data: pepole_list_data })
}

export const delete_list = async (token, pepole_list_id) => {
    return axios.post(`${API}/pepole/delete-list`, { token: token, pepole_list_id: pepole_list_id })
}

export const change_name_list = async (token, pepole_list_id, pepole_list_name) => {
    return axios.post(`${API}/pepole/change-name-list`, { token: token, pepole_list_id: pepole_list_id, pepole_list_name: pepole_list_name })
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