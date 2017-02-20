import {Card} from "./card";

export class Theme {
    name: string;
    description: string;
    tags: string;
    publicAccess: boolean;
    cards: Card[];
    id: number;
}
