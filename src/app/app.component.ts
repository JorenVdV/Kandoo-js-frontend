import {Component} from '@angular/core';
import {ISocketItem} from "./socket-item.model";
import {SocketService} from "./services/socket.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Kandoe!';

    constructor(private socketService: SocketService) {

        this.socketService.get().subscribe(
            (socketItem: ISocketItem) => {
                console.log(socketItem);
            },
            error => console.log(error)
        );
    }


}
