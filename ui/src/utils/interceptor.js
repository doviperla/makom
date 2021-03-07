import axios from 'axios';

const axiosInterceptor = axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error);
    if (error) {
        if (error.status == 401 || error.toString().includes("401")) {
            localStorage.removeItem('user_data');
            window.location.reload();
        }
        return Promise.reject(error.message);
    }
});

export default axiosInterceptor;