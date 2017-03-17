import {Card} from "./card";
import {User} from "./user";

export class ChatMessage {
    user:string;
    text:string;

    constructor(user:string, text:string){
        this.user = user;
        this.text = text;
    }
}