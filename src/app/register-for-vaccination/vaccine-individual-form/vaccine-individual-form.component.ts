import {Component, Input} from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatRadioButton} from "@angular/material/radio";
import {TranslatePipe} from "@ngx-translate/core";
import {COMBO_PRICE_DATA, INDIVIDUAL_PRICE_DATA} from "../../constants/price.data";

@Component({
  selector: 'app-vaccine-individual-form',
  templateUrl: './vaccine-individual-form.component.html',
  styleUrl: './vaccine-individual-form.component.scss',
  standalone: false
})
export class VaccineIndividualFormComponent {
  @Input() selectedVaccine!: any; // <-- Use parent form

  @Input() size = 'small';

  displayedColumns = ['name', 'content', 'size', 'price', 'select'];
  dataSource = INDIVIDUAL_PRICE_DATA;
}
