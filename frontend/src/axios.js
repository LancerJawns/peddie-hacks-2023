import axios from 'axios';

const EXPO_SERVER_URL = 'http://localhost:3000'; // dont wanna deal w it
axios.defaults.baseURL = EXPO_SERVER_URL;
axios.defaults.withCredentials = true;
