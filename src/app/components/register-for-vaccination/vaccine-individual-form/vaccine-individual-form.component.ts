import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vaccine-individual-form',
  templateUrl: './vaccine-individual-form.component.html',
  styleUrl: './vaccine-individual-form.component.scss',
  standalone: false
})
export class VaccineIndividualFormComponent implements OnInit {

  @Input() product!: any[];
  @Input() selectedVaccine!: any; // <-- Use parent form
  @Input() amountVaccine!: any; // <-- Use parent form

  @Input() petSize: any;

  displayedColumns = ['name', 'content', 'size', 'price', 'select', 'amount'];

  ngOnInit(): void {
    this.petSize.valueChanges.subscribe((value: any) => {
      console.log('Pet size changed2:', value);
      Object.values(this.amountVaccine.controls).forEach((control: any) => {
        control.setValue(0);
        control.disable();
      });
      Object.keys(this.selectedVaccine.controls).forEach((controlName: string) => {
        this.selectedVaccine.get(controlName).setValue(false);
        if (controlName.includes('_ALL') || controlName.includes(value)) {
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
