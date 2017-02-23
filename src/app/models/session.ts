/**
 * Created by Sander Van Camp on 20/02/2017.
 */
import {Card} from "./card";
import {User} from "./user";

export class Session {
    title: string;
    description: string;
    circleType: string;
    cardsPerParticipant: string;
    cards: Card[];
    cardsCanBeReviewed: boolean;
    cardsCanBeAdded: boolean;
    participants: User[];
    themeId: string;
    creator: User;
    callback: string;
    startDate: Date;
    endDate: Date;
    amountOfCircles: number;
    turnDurationInMinutes: number;
    id: string;


}

