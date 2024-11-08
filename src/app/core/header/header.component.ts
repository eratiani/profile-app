import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { AppUrlEnum } from '../const/route-enums';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavigationComponent, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  apiUrl = AppUrlEnum;
}
