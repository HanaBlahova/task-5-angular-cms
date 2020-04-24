import { v4 as uuidv4 } from 'uuid';
import { timer } from 'rxjs';


export class Alert {
    id: string;
    title: string;
    message?: string;
    timer: any;

    constructor(
        tit: string,
        mess: string
    ) {
        this.title = tit;
        this.message = mess;
        this.id = uuidv4();
        this.timer = timer(5000);
    }
}
