import { Component } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public isCollapsed : boolean = false;
  public theme : boolean = true;

  constructor() { }

  ngOnInit() {
  }
}

