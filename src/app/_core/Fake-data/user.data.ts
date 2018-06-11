import {LoggedInUser} from '../domain/loggedin.user';
import {Injectable} from '@angular/core';
@Injectable()
export class UserData {
  private User: LoggedInUser;

  public getUser() {
    this.User = {
      access_token: 'abc',
      id: '1',
      groupId: '1',
      username: 'lhdoan',
      fullName: 'Lê Hữu Đoàn',
      email: 'lehuudoan95@gmail,com',
      avatar: 'avatar.png',
      roles: 'admin',
      permissions: 'admin'
    };
    return this.User;
  }
}
