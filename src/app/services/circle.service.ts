import {Http} from "@angular/http";
export class CircleService{

    private circleCardRef: any;
    private circleCards: any;

    constructor(http: Http){
        console.log("Allo!!")
    }

    setup(sessionId: string){
        this.circleCardRef = firebase.database().ref('circleCard/${id}');
        this.circleCardRef.on('child_added', this.handleDate, this);
        this.circleCards = new ReplySubject();
    }

    getCircleCards(){
        return this.circleCards;
    }

    handleData(snap){
        try{
            this.circleCards.next(snap.val());
        } catch(error){
            console.log(error);
        }
    }


}

