import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import {PostalCodeService} from '../../../services/postal-code.service';
import {PREFECTURE_OPTIONS} from '../../../constants/prefectures';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {AppointmentDetailsComponent} from '../appointment-details/appointment-details.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-customer-info-form',
  templateUrl: './customer-info-form.component.html',
  styleUrls: ['./customer-info-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    AppointmentDetailsComponent,
    MatButtonModule,
    MatCardModule
  ]
})
export class CustomerInfoFormComponent implements OnInit {

  @Input() form!: AbstractControl | null;
  @Output() onSubmit = new EventEmitter<any>();

  prefectureOptions = PREFECTURE_OPTIONS;

  loading = false;
  statusMessage = '';
  statusType: 'success' | 'error' | '' = '';

  pattern = '[0-9]{3}[-]{0,1}[0-9]{4}';

  constructor(private fb: UntypedFormBuilder,
              private postalCodeService: PostalCodeService
  ) {
  }

  ngOnInit(): void {
  }

  // Getter to safely cast for the template
  get customerForm(): FormGroup {
    return this.form as FormGroup;
  }

  submit() {
    if (this.form?.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

  onPostalCodeChange(): void {
    const postalCode = this.form?.get('postalCode')?.value ?? '';
    const cleanCode = postalCode.replace(/-/g, '');

    if (cleanCode.length !== 7) {
      this.statusMessage = '';
      this.statusType = '';
      return;
    }

    this.loading = true;
    this.statusMessage = 'Searching... / 検索中...';
    this.statusType = '';

    this.postalCodeService.lookup(cleanCode).subscribe({
      next: (data) => {
        this.loading = false;

        if (data.status === 200 && data.results?.length) {
          const r = data.results[0];

          const prefecture = this.prefectureOptions.find(p => p.value === r.address1)?.value;
          const municipality = `${r.address2}${r.address3}`;

          this.form?.patchValue({
            prefecture,
            municipality
          });

          this.statusMessage = `✓ Found: ${r.address1} ${municipality}`;
          this.statusType = 'success';
        } else {
          this.statusMessage =
            '✗ Address not found / 住所が見つかりませんでした';
          this.statusType = 'error';
        }
      },
      error: () => {
        this.loading = false;
        this.statusMessage =
          '✗ Lookup failed. Please enter manually / 検索に失敗しました';
        this.statusType = 'error';
      }
    });
  }
}
