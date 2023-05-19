import { Component } from '@angular/core';
import { User } from './utils/interfaces/user';
import { ClassGlobal } from './utils/class/class-global';
import { KeySessionStorange } from './utils/enums/enums-global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showFiller = false;
  user!: User;
  isShowMenu = false;

  constructor(private classGlobal: ClassGlobal) {
    this.getUserSuscription();

  }

  getUser() {
    const { isValid } = this.user;
    this.isShowMenu = isValid;
  }

  getUserSuscription() {
    this.user = this.classGlobal.getSessionStorange(KeySessionStorange.user);
    if (this.user) {
      this.classGlobal.onChangeUser({ ...this.user });
    }
    this.classGlobal.user$.subscribe((user: User) => {
      this.isShowMenu = user?.isValid;
    })
  }
}
