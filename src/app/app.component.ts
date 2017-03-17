import {Component} from '@angular/core';
import {ISocketItem} from "./socket-item.model";
import {SocketService} from "./services/socket.service";
import firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Kandoe!';

    constructor(private socketService: SocketService) {

        this.socketService.get().subscribe(
            (socketItem: ISocketItem) => {
                console.log(socketItem);
            },
            error => console.log(error)
        );

        // Setup firebase
        const firebaseConfig = {
            apiKey: "AIzaSyBuGaEfvvLewMVp7VA8qEp9WbHWDKTKO-s",
            authDomain: "kandoechat.firebaseapp.com",
            databaseURL: "https://kandoechat.firebaseio.com",
            storageBucket: "kandoechat.appspot.com",
            messagingSenderId: "812779979995"
        };
        firebase.initializeApp(firebaseConfig);

    }




}
