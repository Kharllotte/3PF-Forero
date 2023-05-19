import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassGlobal } from 'src/app/utils/class/class-global';
import { KeySessionStorange } from 'src/app/utils/enums/enums-global';
import { User } from 'src/app/utils/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    name: '',
    password: '',
    isValid: false
  };

  constructor(private router: Router, private classGlobal: ClassGlobal) { }

  ngOnInit() {
  }

  login() {
    this.user.isValid = true;
    this.classGlobal.onChangeUser({ ...this.user, isValid: true });
    this.classGlobal.setSessionStorange(KeySessionStorange.user, this.user);
    this.router.navigateByUrl('/students');
  }

}
