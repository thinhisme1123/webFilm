// fetchingApiData.js
import axios from 'axios';

const fetchingApiData = async (apiUrls) => {
    try {
        if (Array.isArray(apiUrls)) {
            const responses = await Promise.all(apiUrls.map(url => axios.get(url)));
            return responses.map(response => response.data);
        } else {
            const response = await axios.get(apiUrls);
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export default fetchingApiData;
