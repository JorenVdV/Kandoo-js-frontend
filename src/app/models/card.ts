export class Card {
    description: string;
    priority: number;
    id: number;

    constructor(description: string, priority: number, id: number) {
        this.description = description;
        this.priority = priority;
        this.id = id;
    }
}