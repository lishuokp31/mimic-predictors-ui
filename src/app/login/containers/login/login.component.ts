/* 引入核心模块里面的component */
import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login',/* 使用这个组件的名称 */
  templateUrl: './login.component.html',//html
  styleUrls: ['./login.component.scss'],//css
})
export class LoginComponent {/* 定义属性 */

  // constructor() { }

  // ngOnInit() {
  // }

}
