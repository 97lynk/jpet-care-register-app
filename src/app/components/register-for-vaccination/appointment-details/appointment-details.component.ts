import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AppointmentConfigService} from '../../../services/appointment-config.service';
import {AppointmentLocation, AppointmentPrefecture, AppointmentTimeSlot} from 'src/app/models/appointment.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    TranslateModule,
    MatCardModule,
    MatNativeDateModule,
    MatInput,
    // Add this module
  ]
})
export class AppointmentDetailsComponent implements OnInit {

  @Input() form!: AbstractControl | null;
  minDate = new Date();

  prefectures: AppointmentPrefecture[] = [];
  filteredLocations: AppointmentLocation[] = [];
  currentTimeSlots: AppointmentTimeSlot[] = [];

  constructor(private appointmentConfigService: AppointmentConfigService) { }

  ngOnInit(): void {
    this.appointmentConfigService.getPrefectures().subscribe(data => {
      this.prefectures = data;
    });
  }

  get appointmentForm(): FormGroup {
    return this.form as FormGroup;
  }

  onPrefectureChange(prefectureCode: string): void {
    this.form?.get('location')?.reset();
    this.form?.get('timeSlot')?.reset();
    this.filteredLocations = [];
    this.currentTimeSlots = [];

    if (prefectureCode) {
      this.appointmentConfigService.getLocations(prefectureCode).subscribe(data => {
        this.filteredLocations = data;
      });
    }
  }

  onLocationChange(locationId: number): void {
    this.form?.get('timeSlot')?.reset();
    this.currentTimeSlots = [];

    const selectedLocation = this.filteredLocations.find(loc => loc.id === locationId);
    if (selectedLocation && selectedLocation.timeSlots) {
      this.currentTimeSlots = Array.from(selectedLocation.timeSlots);
      // Optionally, auto-select the first time slot
      if (this.currentTimeSlots.length > 0) {
        this.form?.get('timeSlot')?.setValue(this.currentTimeSlots[0].code);
      }
    }
  }
}
