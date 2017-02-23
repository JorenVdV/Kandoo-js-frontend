import {Card} from "./card";
import {User} from "./user";

export class Theme {
    id: string;
    name: string;
    description: string;
    tags: string;
    publicAccess: boolean;
    cards: Card[];
    organisers: User[];
    created: Date;
}
