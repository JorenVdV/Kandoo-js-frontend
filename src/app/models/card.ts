export class Card {
    description: string;
    priority: number;
    listNumber: string;
    circlePosition: string;
    _id: string;

    constructor(description: string, priority: number, id: string) {
        this.description = description;
        this.priority = priority;
        this._id = id;
    }
}
