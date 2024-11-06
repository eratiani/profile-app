import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ILibButton, LibButtonType } from './button.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lib-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibButtonComponent {
  @Input() btnConfig: ILibButton = {
    type: 'button',
    classList: '',
    disabled: false,
  };
  @Input() type: LibButtonType = 'primary';
  btnTypeSelect = {
    primary:
      'bg-primary-green w-full py-2  px-1 rounded-lg text-white disabled:bg-btn-disabled',

  };
}
