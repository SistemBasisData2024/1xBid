import axios from 'axios';

const BE_URL = import.meta.env.VITE_BE_URL;

export const searchBarang = async (searchQuery) => {
    try {
        const response = await axios.get(BE_URL + '/search?q=' + searchQuery);
        if(response.status !== 200) throw new Error('Failed to fetch search data');
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}