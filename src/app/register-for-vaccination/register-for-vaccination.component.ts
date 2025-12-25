import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from "moment";
import {INDIVIDUAL_PRICE_DATA, INDIVIDUAL_PRICE_KEY} from "../constants/price.data";


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
    furigana: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{4}$/)]],
    prefecture: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    building: [''],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
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
      console.log('changes pets form ', value);
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
    const keys = Object.keys(INDIVIDUAL_PRICE_KEY);
    const selectVaccineControls = Object.fromEntries(
      keys.map(key => [key, [{value: false, disabled: true}]])
    );
    const amountVaccineControls = Object.fromEntries(
      keys.map(key => [key, [{value: 0, disabled: true}, Validators.min(1)]])
    );

    return this.fb.group({
      petName: ['', Validators.required],
      petBreed: ['', Validators.required],
      birthDate: [moment().toDate(), Validators.required],
      gender: ['male', Validators.required],
      furColor: ['', Validators.required],
      weight: ['', Validators.required],
      size: ['', Validators.required],
      healthStatus: this.fb.group({
        healthy: [false],
        eatingWell: [false],
        digestionGood: [false]
      }),
      healthCommitment: [true, Validators.requiredTrue],
      comboVaccine: [null],
      individualVaccineSelection: this.fb.group(selectVaccineControls),
      individualVaccineAmount: this.fb.group(amountVaccineControls),
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
      total += (pets[i].comboVaccine?.price || 0) +
        this.getIndividualVaccinesPrice(pets[i].individualVaccineSelection, pets[i].individualVaccineAmount);
    }
    this.total = total;
  }

  getIndividualVaccinesPrice(individualVaccineSelection: any, individualVaccineAmount: any) {
    let total = 0;
    Object.keys(individualVaccineSelection)
      .filter((key) => individualVaccineSelection[key])
      .forEach((key: any) => {
        total += INDIVIDUAL_PRICE_KEY[key] * individualVaccineAmount[key];
      })

    return total;
  }
}
