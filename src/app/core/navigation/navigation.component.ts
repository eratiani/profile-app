import { Component } from '@angular/core';
import { LibButtonComponent } from "../../shared/components/lib-button/lib-button.component";
import { AppUrlEnum } from '../const/route-enums';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[app-navigation]',
  standalone: true,
  imports: [LibButtonComponent,RouterLink],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  public routeEnum = AppUrlEnum;
}
