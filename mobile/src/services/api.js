import axios from 'axios';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
]);

const api = axios.create({
    baseURL: `http://localhost:3333`,
});

export default api;
