import axios from 'axios';
import {ConnectedService} from '../types/connectedServices';

const API_BASE_URL = 'http://localhost:8070/jarvis';

// Fetch connected services by catalog
export const fetchServices = async (catalog: string, accessToken?: string | null): Promise<ConnectedService[]> => {
    const response = await axios.get<ConnectedService[]>(`${API_BASE_URL}/list`, {
        params: {
            catalog
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    return response.data;
};

