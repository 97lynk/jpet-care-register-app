import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import moment from "moment/moment";

@Component({
    selector: 'app-pet-info-form',
    templateUrl: './pet-info-form.component.html',
    styleUrls: ['./pet-info-form.component.scss'],
    standalone: false
})
export class PetInfoFormComponent implements OnInit {
  @Input() form!: any; // <-- Use parent form
  @Input() index!: number;

  @Output() onRemove = new EventEmitter<number>();
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.fb.group({
        petName: ['', Validators.required],
        petBreed: ['', Validators.required],
        birthDate: [moment().toDate()],
        gender: ['', Validators.required],
        furColor: ['', Validators.required],
        weight: [1, Validators.required],
        size: ['small', Validators.required],
        healthStatus: this.fb.group({
          healthy: [false],
          eatingWell: [false],
          digestionGood: [false]
        }),
        healthCommitment: [false, Validators.requiredTrue]
      });
    }
  }

  onWeightChange(weight: number) {
    if (!this.form) return;

    let sizeValue = 'small';
    if (weight >= 10 && weight <= 20) {
      sizeValue = 'medium';
    } else if (weight > 20) {
      sizeValue = 'large';
    }
    this.form.patchValue({ size: sizeValue }, { emitEvent: true });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.getRawValue());
    }
  }

  onPetSizeChange(size: any) {
    if (!this.form || !size) return;

    console.log('onSizeChange', size);
  }

  onClickRemove() {
    this.onRemove.emit(this.index);
  }
}
