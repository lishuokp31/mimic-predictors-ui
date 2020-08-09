import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
