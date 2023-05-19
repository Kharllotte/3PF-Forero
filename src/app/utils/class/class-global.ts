import { Injectable } from "@angular/core";
import { KeySessionStorange } from "../enums/enums-global";
import { BehaviorSubject } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: 'root',
})
export class ClassGlobal {

    user: User = {
        email: '',
        name: '',
        password: '',
        isValid: false
    };



    public user$: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);

    onChangeUser(user: User) {
        this.user$.next({ ...user });
        sessionStorage.setItem(KeySessionStorange.user, JSON.stringify(user));
    }

    setSessionStorange(key: KeySessionStorange, data: any): void {
        sessionStorage.setItem(key, JSON.stringify(data));
    }

    getSessionStorange(key: KeySessionStorange): any {
        try {
            return JSON.parse(sessionStorage.getItem(key) || '');
        } catch (error) {
            return null
        }
    }
}