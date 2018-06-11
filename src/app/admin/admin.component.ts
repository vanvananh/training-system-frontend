import {Component, ElementRef, OnInit} from '@angular/core';
import {LoggedInUser} from '../_core/domain/loggedin.user';
import {SystemConstants} from '../_core/common/system.constants';
import {Router} from '@angular/router';
import {UserData} from '../_core/Fake-data/user.data';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [UserData]
})
export class AdminComponent implements OnInit {
  public User: LoggedInUser;
  public BaserFoder: string = SystemConstants.BASE_FOLDER;

  constructor(private elementRef: ElementRef, private router: Router, private _userdata: UserData) {
  }


  ngOnInit() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/custom.js';
    this.elementRef.nativeElement.appendChild(s);
    this.User = this._userdata.getUser();
    window.scrollTo(0, 0);
  }
}
