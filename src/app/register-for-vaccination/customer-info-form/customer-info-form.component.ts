// customer-form.component.ts
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {PostalCodeService} from "../../services/postal-code.service";
import {PREFECTURE_OPTIONS} from "../../constants/prefectures";

@Component({
  selector: 'app-customer-info-form',
  templateUrl: './customer-info-form.component.html',
  styleUrls: ['./customer-info-form.component.scss'],
  standalone: false
})
export class CustomerInfoFormComponent implements OnInit {

  @Input() form!: any; // <-- Use parent form
  @Output() onSubmit = new EventEmitter<any>();

  prefectureOptions = PREFECTURE_OPTIONS;

  loading = false;
  statusMessage = '';
  statusType: 'success' | 'error' | '' = '';

  constructor(private fb: UntypedFormBuilder,
              private postalCodeService: PostalCodeService
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.onSubmit.emit(this.form.value);
    }
  }

  onPostalCodeChange(): void {
    const postalCode = this.form.value.postalCode ?? '';
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

          const prefecture = this.prefectureOptions.find(p=> p.value === r.address1)?.value;
          const municipality = `${r.address2}${r.address3}`;

          this.form.patchValue({
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
