import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AppInterface } from './store/app.interface';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ToastModule,
    ButtonModule,
    RippleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent implements OnInit {
  title = 'profile-app';
  messageService = inject(MessageService);
  private store = inject(Store<AppInterface>);
  ngOnInit(): void {
    this.store
      .pipe(select((state) => state.app.auth.error))
      .pipe(
        tap((val) => {
          if (val) {
            this.messageService.clear();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: val,
              life: 1000,
            });
          }
        })
      )
      .subscribe();
  }
}
