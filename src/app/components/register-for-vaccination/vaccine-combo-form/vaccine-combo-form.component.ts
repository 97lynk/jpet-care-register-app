import {Component, Input, OnInit} from '@angular/core';
import {COMBO_PRICE_DATA} from "../../../constants/price.data";

@Component({
    selector: 'app-vaccine-combo-form',
    templateUrl: './vaccine-combo-form.component.html',
    styleUrls: ['./vaccine-combo-form.component.scss'],
    standalone: false
})
export class VaccineComboFormComponent implements OnInit {

  @Input() product!: any[];

  @Input() selectedVaccine!: any; // <-- Use parent form

  @Input() petSize : any;

  displayedColumns = ['name', 'content', 'size', 'price', 'select'];

  constructor() { }

  ngOnInit(): void {
    this.petSize.valueChanges.subscribe((value: any) => {
      this.selectedVaccine.setValue(null);
    });
  }

  onSelectVaccine(value: any) {
    if (value == this.selectedVaccine.value) {
      this.selectedVaccine.setValue(null);
    }
  }
}
