import { io } from 'socket.io-client';
import { App } from '../const/App';

export const socketContext = io(App.URL_EVENT, {
    timeout: 5000,
    autoConnect: true,
});
