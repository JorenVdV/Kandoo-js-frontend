/**
 * Created by Sander Van Camp on 20/02/2017.
 */
import {Card} from "./card";
import {User} from "./user";
import {Theme} from "./theme";

export class Session {
    title: string;
    description: string;
    circleType: string;
    minCardsPerParticipant: string;
    maxCardsPerParticipant: string;
    cards: Card[];
    cardsCanBeReviewed: boolean;
    cardsCanBeAdded: boolean;
    participants: User[];
    themeId: string;
    creator: string;
    callback: string;
    startDate: string;
    endDate: Date;
    amountOfCircles: number;
    turnDuration: number;
    _id: string;
    invitees: String [];
    sessionCards: Card[];
    pickedCards: Card[];
    cardPriorities: Card[];
    status: string;
    theme: Theme;
}

