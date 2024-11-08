import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-uploader',
  standalone: true,
  imports: [],
  templateUrl: './custom-uploader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomUploaderComponent,
      multi: true,
    },
  ],
})
export class CustomUploaderComponent implements ControlValueAccessor {
  uploader = viewChild('uploader', { read: ElementRef<any> });
  fileUrls = signal<string[]>([]);
  filesArr = signal<any>([]);
  formData: any;
  onChange = (value: any) => {};
  onTouched = () => {};
  writeValue(obj: any): void {
    if (obj) {
      this.fileUrls.set([obj]);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onClick() {
    this.uploader()!.nativeElement.click();
  }

  log(event: Event) {
    const filefileInputElement = event.target as HTMLInputElement;
    if (filefileInputElement.files && filefileInputElement.files[0]) {
      var reader = new FileReader();
      reader.onloadend = () => {
        var baseStringResult = reader.result as string;
        const imageUrl = baseStringResult;
        this.fileUrls.set([imageUrl]);
        this.filesArr.set(filefileInputElement?.files?.[0]);
        this.onChange(imageUrl);
        filefileInputElement.value = '';
      };
      reader.readAsDataURL(filefileInputElement.files[0]);
    }
    this.onTouched();
  }
}
