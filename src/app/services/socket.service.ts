import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    private baseURL = 'http://localhost:8000';
    socket: SocketIOClient.Socket;

    constructor() {
    }

    // Get items observable
    get(): Observable<any> {
        let socketUrl = this.baseURL;
        if (!this.socket) {

            this.socket = io(this.baseURL, {
                'reconnection': true,
                'reconnectionDelay': 500,
                'reconnectionAttempts': 10
            });
        }
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });
        this.socket.on("session_started", (item: any) => console.log(item));
        this.socket.on("messages", (item: any) => console.log(item));
        this.socket.on("test", (item: any) => console.log(item));
        this.socket.on('ping', function (data) {
            this.socket.emit('pong', {beat: 1});
        });

        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable.create((observer: any) => {
            this.socket.on("session_started", (item: any) => console.log(item));
            this.socket.on("messages", (item: any) => console.log(item));
            this.socket.on("test", (item: any) => console.log(item));
            // return () => this.socket.close();
        });

    }

// Create signal
    create(name: string) {
        this.socket.emit("create", name);
    }

// Remove signal
    remove(name: string) {
        this.socket.emit("remove", name);
    }

    init(userID: string) {
        this.socket.emit("init", userID);
    }

    test(message: string) {
        this.socket.emit("test", message);

    }

// Handle connection opening
    private
    connect() {
        console.log(`Connected to "${this.baseURL}"`);
    }

// Handle connection closing
    private
    disconnect() {
        console.log(`Disconnected from "${this.baseURL}"`);
    }

}
