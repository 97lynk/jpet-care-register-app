import {Component, Input, OnInit} from '@angular/core';
import {COMBO_PRICE_DATA} from "../../constants/price.data";
import {PREFECTURE_OPTIONS} from "../../constants/prefectures";

@Component({
    selector: 'app-vaccine-combo-form',
    templateUrl: './vaccine-combo-form.component.html',
    styleUrls: ['./vaccine-combo-form.component.scss'],
    standalone: false
})
export class VaccineComboFormComponent implements OnInit {

  @Input() selectedVaccine!: any; // <-- Use parent form

  @Input() size = 'small';

  displayedColumns = ['name', 'content', 'size', 'price', 'select'];
  dataSource = COMBO_PRICE_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  protected readonly prefectureOptions = PREFECTURE_OPTIONS;
}
