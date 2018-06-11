import {Component, OnInit} from '@angular/core';
import {LoggedInUser} from '../../_core/domain/loggedin.user';
import {UserData} from '../../_core/Fake-data/user.data';
import {SystemConstants} from '../../_core/common/system.constants';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
  providers: [UserData]
})
export class TopMenuComponent implements OnInit {
  public User: LoggedInUser;
  public BaseFoler:string=SystemConstants.BASE_FOLDER;

  constructor(private _userdata: UserData) {
  }

  ngOnInit() {
    this.User = this._userdata.getUser();
    console.log(this.User);
  }

}
