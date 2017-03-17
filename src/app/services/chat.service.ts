import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';

import firebase from 'firebase';
import {ChatMessage} from '../models/message';


/*
 Generated class for the ChatData provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ChatService {
    private _messages$: any;
    private _messagesRef: any;

    constructor(public http: Http){

    }

    setup(id:string){
        this._messagesRef = firebase.database().ref(`chat/${id}/`);
        this._messagesRef.on('child_added', this.handleData, this);
        this._messages$ = new ReplaySubject();
    }

    get messages(){
        return this._messages$;
    }

    handleData(snap){
        try{
            this._messages$.next(snap.val());
        }catch(error){
            console.log(error);
        }
    }

    sendmessage(message:ChatMessage){
        return this._messagesRef.push(message).key;
    }





}
