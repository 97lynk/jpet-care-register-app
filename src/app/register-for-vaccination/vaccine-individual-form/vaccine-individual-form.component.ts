import {Component, Input, OnInit} from '@angular/core';
import {INDIVIDUAL_PRICE_DATA} from "../../constants/price.data";

@Component({
  selector: 'app-vaccine-individual-form',
  templateUrl: './vaccine-individual-form.component.html',
  styleUrl: './vaccine-individual-form.component.scss',
  standalone: false
})
export class VaccineIndividualFormComponent implements OnInit {

  @Input() selectedVaccine!: any; // <-- Use parent form
  @Input() amountVaccine!: any; // <-- Use parent form

  @Input() petSize: any;

  displayedColumns = ['name', 'content', 'size', 'price', 'select', 'amount'];
  dataSource = INDIVIDUAL_PRICE_DATA;

  ngOnInit(): void {
    this.petSize.valueChanges.subscribe((value: any) => {
      console.log('Pet size changed2:', value);
      this.selectedVaccine.patchValue({
        RABIES_SHOT_all: false,
        MIXED_all: false,
        HEARTWORM_MED_small: false,
        HEARTWORM_MED_medium: false,
        HEARTWORM_MED_large: false,
        PARASITE_PREV_small: false,
        PARASITE_PREV_medium: false,
        PARASITE_PREV_large: false
      });

      this.amountVaccine.patchValue({
        RABIES_SHOT_all: 0,
        MIXED_all: 0,
        HEARTWORM_MED_small: 0,
        HEARTWORM_MED_medium: 0,
        HEARTWORM_MED_large: 0,
        PARASITE_PREV_small: 0,
        PARASITE_PREV_medium: 0,
        PARASITE_PREV_large: 0
      });

      Object.values(this.amountVaccine.controls).forEach((control: any) => control.disable());
      Object.keys(this.selectedVaccine.controls).forEach((controlName: string) => {
        if (controlName.includes('_all') || controlName.includes(value)) {
          this.selectedVaccine.controls[controlName].enable();
        } else {
          this.selectedVaccine.controls[controlName].disable();
        }
      });
    });
  }

  onSelectVaccine(keyName: string) {
    if (this.selectedVaccine.get(keyName)?.value) {
      this.amountVaccine.get(keyName)?.enable();
    } else {
      this.amountVaccine.get(keyName)?.disable();
    }
  }
}
