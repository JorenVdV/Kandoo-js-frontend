import {Component} from '@angular/core';
import firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Kandoe!';

    constructor() {
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
