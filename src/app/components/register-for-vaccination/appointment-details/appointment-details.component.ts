// appointment-details.component.ts
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';


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
      id: "loc_001",
      prefectureId: "shizuoka",
      name: "パルモ葬祭",
      address: "静岡県袋井市上山梨3-14-6",
      phone: "0538-31-5011",
      hospital: "犬猫病院ハナハナ",
      timeSlots: ["SLOT_1"]
    },
    {
      id: "loc_002",
      prefectureId: "aichi",
      name: "イズモ葬祭",
      address: "愛知県豊橋市東新町115",
      phone: "0532-55-1000",
      hospital: "本間獣医科医院",
      timeSlots: ["SLOT_1"]
    },
    {
      id: "loc_003",
      prefectureId: "aichi",
      name: "イズモ葬祭",
      address: "愛知県豊川市八幡町弥五郎24",
      phone: "0533-83-2311",
      hospital: "本間獣医科医院",
      timeSlots: ["SLOT_1"]
    },
    {
      id: "loc_004",
      prefectureId: "shizuoka",
      name: "パルモ葬祭",
      address: "静岡県富士市中央町3-9-26",
      phone: "0545-32-7211",
      hospital: "本間獣医科医院",
      timeSlots: ["SLOT_1"]
    },
    {
      id: "loc_005",
      prefectureId: "shizuoka",
      name: "パルモ葬祭",
      address: "静岡県磐田市白羽174-1",
      phone: "0538-31-5800",
      hospital: "犬猫病院ハナハナ",
      timeSlots: ["SLOT_1"]
    },
    {
      id: "loc_006",
      prefectureId: "shizuoka",
      name: "ラトリエ・",
      address: "静岡県磐田市二之宮東4-5",
      phone: "0538-33-2222",
      hospital: "犬猫病院ハナハナ",
      timeSlots: ["SLOT_1"]
    },
    {
      id: "loc_007",
      prefectureId: "aichi",
      name: "イズモ葬祭",
      address: "愛知県岡崎市美合町小豆坂91",
      phone: "0564-51-7080",
      hospital: "本間獣医科医院",
      timeSlots: ["SLOT_1"]
    },
    {
      id: "loc_008",
      prefectureId: "saitama",
      name: "ホームズ浦",
      address: "埼玉県さいたま市南区内谷7-12-5",
      phone: "048-844-3334",
      hospital: "犬猫病院ハナハナ",
      timeSlots: ["SLOT_2"]
    }
  ];

  timeSlotOptions = {
    SLOT_1: {
      id: "SLOT_1",
      label: "10:00-15:00"
    },
    SLOT_2: {
      id: "SLOT_2",
      label: "10:00-17:00"
    }
  };

  currentTimeSlots: any[] = [];

  // Trong class Component của bạn
  prefectures = [
    {
      "id": "shizuoka",
      "name": "静冈県",
      "translationKey": "prefectures.shizuoka"
    },
    {
      "id": "aichi",
      "name": "愛知県",
      "translationKey": "prefectures.aichi"
    },
    {
      "id": "saitama",
      "name": "埼玉県",
      "translationKey": "prefectures.saitama"
    }
  ];

  filteredLocations: any[] = []; // Biến chứa danh sách location sau khi lọc

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onPrefectureChange(prefId: string) {
    console.log(prefId);
    this.form.get('location').reset();
    this.form.get('timeSlot').reset();
    this.currentTimeSlots = [];

    this.filteredLocations = this.locations.filter(loc => loc.prefectureId === prefId);
    console.table(this.filteredLocations);
  }

  onLocationChange(locationId: string) {
    this.form.get('timeSlot').reset();

    const location = this.locations.find(loc => loc.id === locationId);
    // @ts-ignore
    this.currentTimeSlots = location.timeSlots.map((timeSlot) => this.timeSlotOptions[timeSlot]);

    console.log(this.currentTimeSlots);
    this.form.patchValue({
      timeSlot: this.currentTimeSlots[0].id
    })
  }
}
