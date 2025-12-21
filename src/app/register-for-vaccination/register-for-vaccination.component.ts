import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from "moment";
import {COMBO_PRICE_DATA, INDIVIDUAL_PRICE_DATA} from "../constants/price.data";


@Component({
  selector: 'app-register-for-vaccination',
  templateUrl: './register-for-vaccination.component.html',
  styleUrls: ['./register-for-vaccination.component.scss'],
  standalone: false
})
export class RegisterForVaccinationComponent implements OnInit {

  total = 0;

  customerInfoForm = this.fb.group({
    fullName: ['', Validators.required],
    furigana: ['12', Validators.required],
    postalCode: ['100-0004', [Validators.required, Validators.pattern(/^\d{3}-\d{4}$/)]],
    prefecture: ['Tokyo', Validators.required],
    city: ['A', Validators.required],
    address: ['A', Validators.required],
    building: ['A'],
    phone: ['019', Validators.required],
    email: ['A@gamil.com', [Validators.required, Validators.email]],
    appointment: this.fb.group({
      location: [null, Validators.required],
      timeSlot: [{value: null, disabled: true}, Validators.required],
      appointmentDate: [moment().add(1, 'day').toDate(), Validators.required]
    })
  });

  petInfoForms: FormGroup;
  private translate: TranslateService;

  constructor(private fb: FormBuilder, translate: TranslateService) {
    this.petInfoForms = this.fb.group({
      pets: this.fb.array([this.createPetGroup()])
    });
    this.translate = translate;
  }

  ngOnInit(): void {
    this.pets.valueChanges.subscribe(value => {
      console.log('changes', value);
      this.recalculateTotal();
    })

  }

  get pets(): FormArray {
    return this.petInfoForms.get('pets') as FormArray;
  }


  useLanguage(language: string): void {
    console.log(language, this.translate.getCurrentLang());
    this.translate.use(language);
  }

  createPetGroup(): FormGroup {
    return this.fb.group({
      petName: ['', Validators.required],
      petBreed: ['', Validators.required],
      birthDate: [moment().toDate(), Validators.required],
      gender: ['male', Validators.required],
      furColor: ['', Validators.required],
      weight: ['', Validators.required],
      size: ['small', Validators.required],
      healthStatus: this.fb.group({
        healthy: [false],
        eatingWell: [false],
        digestionGood: [false]
      }),
      healthCommitment: [true, Validators.requiredTrue],
      comboVaccine: [COMBO_PRICE_DATA[0].value],
      individualVaccine: [INDIVIDUAL_PRICE_DATA[0].value],
    });
  }

  addPet() {
    this.pets.push(this.createPetGroup());
  }

  removePet(index: number) {
    if (this.pets.length > 1) {
      this.pets.removeAt(index);
    }
  }

  onSubmitCustomerInfo($event: any, stepper: any) {
    if (this.customerInfoForm.valid) {
      stepper.next();
    }
  }

  onSubmitPetInfo(stepper: any) {
    if (this.customerInfoForm.valid && this.petInfoForms.valid) {
      stepper.next();
    }
  }

  recalculateTotal() {
    let total = 0;
    let pets = this.petInfoForms.getRawValue().pets;
    for (let i = 0; i < pets.length; i++) {
      total += (pets[i].comboVaccine?.price || 0) + (pets[i].individualVaccine?.price || 0);
    }
    this.total = total;
  }
}
