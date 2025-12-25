// appointment-details.component.ts
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from "moment";

type LocationType = 'fullday' | 'valor' | 'petshop';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss',
  standalone: false
})
export class AppointmentDetailsComponent implements OnInit {

  @Input() form!: any;
  minDate = new Date();

  locations = [
    {
      group: 'locations.veterinary_clinics', // translation key
      items: [
        {value: 'sakura_clinic', label: 'locations.sakura_clinic', type: 'fullday'},
        {value: 'tokyo_pet', label: 'locations.tokyo_pet', type: 'fullday'}
      ]
    },
    {
      group: 'locations.supermarkets',
      items: [
        {value: 'valor_gifu', label: 'locations.valor_gifu', type: 'valor'},
        {value: 'cainz_tokyo', label: 'locations.cainz_tokyo', type: 'valor'}
      ]
    },
    {
      group: 'locations.petshops',
      items: [
        {value: 'petplus_shibuya', label: 'locations.petplus_shibuya', type: 'petshop'}
      ]
    }
  ];

  timeSlotOptions: Record<LocationType, any> = {
    fullday: {
      slots: [
        {value: 'fullday_10_15', label: 'timeslots.fullday_10_15'}
      ]
    },
    valor: {
      slots: [
        {value: 'valor_morning', label: 'timeslots.valor_morning'},
        {value: 'valor_afternoon', label: 'timeslots.valor_afternoon'}
      ]
    },
    petshop: {
      slots: [
        {value: 'petshop_morning', label: 'timeslots.petshop_morning'},
        {value: 'petshop_afternoon', label: 'timeslots.petshop_afternoon'}
      ]
    }
  };

  currentTimeSlots: any[] = [];
  timeSlotInfo = '';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onLocationChange(locationValue: string) {
    const location = this.locations
      .flatMap(g => g.items)
      .find(i => i.value === locationValue);

    if (!location) return;

    const config = this.timeSlotOptions[location.type as LocationType];

    this.currentTimeSlots = config.slots;
    this.timeSlotInfo = config.info;

    this.form.get('timeSlot')!.enable();
    this.form.get('timeSlot')!.reset();


    if (this.currentTimeSlots && this.currentTimeSlots.length > 0) {
      this.form.get('timeSlot')?.setValue(this.currentTimeSlots[0].value);
    }
  }
}
