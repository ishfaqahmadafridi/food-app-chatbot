import axios from 'axios';
import { LayoutList } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL, // Base URL for the backend
    headers: {
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('userToken');

        if(token){
            config.headers['Authorization' ] = `Bearer ${token}`;
        }
        
        // Only set Content-Type for non-FormData requests
        // Let axios auto-set Content-Type for FormData (multipart/form-data with boundary)
        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json';
        } else {
            // Remove Content-Type for FormData so axios sets it with boundary
            delete config.headers['Content-Type'];
        }
        
        console.log('Request sent:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) =>{
        console.log('Response received:', response.status, response.config.url);
        return response;
    },

    (error) => {
        if(error.response) {
            const status = error.response.status;
            if(status === 401){
                toast.error('Session expired . please login again');
                localStorage.removeItem('userToken');
                window.location.href = '/';
            }

            if(status === 500){
                toast.error('Server error . Please try again later.');
            }
        }
        return Promise.reject(error);
    }
)

export default api;