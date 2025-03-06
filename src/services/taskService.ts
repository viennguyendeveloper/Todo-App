import axios from 'axios';

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching tasks:", error);
    return [];
  }
};
