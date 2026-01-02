import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AppointmentConfigService} from '../../../services/appointment-config.service';
import {AppointmentLocation, AppointmentPrefecture, AppointmentTimeSlot} from '../../../models/appointment.model';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss',
  standalone: false
})
export class AppointmentDetailsComponent implements OnInit {

  @Input() form!: FormGroup;
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

  onPrefectureChange(prefectureCode: string): void {
    this.form.get('location')?.reset();
    this.form.get('timeSlot')?.reset();
    this.filteredLocations = [];
    this.currentTimeSlots = [];

    if (prefectureCode) {
      this.appointmentConfigService.getLocations(prefectureCode).subscribe(data => {
        this.filteredLocations = data;
      });
    }
  }

  onLocationChange(locationId: number): void {
    this.form.get('timeSlot')?.reset();
    this.currentTimeSlots = [];

    const selectedLocation = this.filteredLocations.find(loc => loc.id === locationId);
    if (selectedLocation && selectedLocation.timeSlots) {
      this.currentTimeSlots = Array.from(selectedLocation.timeSlots);
      console.log(this.currentTimeSlots)
      // Optionally, auto-select the first time slot
      if (this.currentTimeSlots.length > 0) {
        this.form.get('timeSlot')?.setValue(this.currentTimeSlots[0].code);
      }
    }
  }
}
