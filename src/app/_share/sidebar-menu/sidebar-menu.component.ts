import {Component, OnInit} from '@angular/core';
import {DataService} from '../../_core/service/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  public functions: any[];

  constructor(private _dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this._dataService.get('/api/menu/getAll').subscribe((res: any) => {
      this.functions = res;
    }, error => this._dataService.handleError(error));
  }

  routerLink(Link: any) {
    localStorage.clear();
    this.router.navigate([Link]);
  }

}
