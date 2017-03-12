import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as io from 'socket.io-client';

@Injectable()
export class socketService {
    private baseURL = 'http://localhost:8000';
    private socket;

    constructor(){
        this.socket = io(this.baseURL, {transports: ['websocket']});
    }

    sendMessage(name, message) {
        this.socket.emit(name, message);
    }

    listen() {
        return new Observable(observer => {
            this.socket.on('messages', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }

}
