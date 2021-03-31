import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public isCollapsed : boolean = false;
}
