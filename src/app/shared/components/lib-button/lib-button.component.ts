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
  @Input() type: LibButtonType = 'primary' ;
  btnTypeSelect = {
    primary:
      'bg-primary-green w-full p-1 rounded-lg text-white disabled:bg-btn-disabled hover:bg-[#17A55D] ease-in-out duration-300',
      secondary:'bg-primary-blue w-full p-1 rounded-lg text-white disabled:bg-btn-disabled hover:bg-[#0275B1] ease-in-out duration-300'
  };
}
