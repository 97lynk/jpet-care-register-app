import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from "moment";
import {ProductService} from "../../services/product.service";
import {ProductVaccine} from "../../models/product-vaccine.model";
import {RegisterService} from "../../services/register.service";


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
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{3}-?\d{4}$/)]],
    prefecture: ['', Validators.required],
    municipality: ['', Validators.required],
    address: ['', Validators.required],
    building: [''],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    appointment: this.fb.group({
      prefecture: [null, Validators.required],
      location: [null, Validators.required],
      timeSlot: [{value: null}, Validators.required],
      appointmentDate: [moment().add(1, 'day').toDate(), Validators.required]
    })
  });

  comboProducts: ProductVaccine[] = [];
  singleProducts: ProductVaccine[] = [];
  singleProductKeys: string[] = [];
  singleProductPrice: any = {};

  petInfoForms: FormGroup;
  private translate: TranslateService;

  constructor(private fb: FormBuilder,
              translate: TranslateService,
              private productService: ProductService,
              private registerService: RegisterService) {
    this.petInfoForms = this.fb.group({
      pets: this.fb.array([])
    });
    this.translate = translate;
  }

  ngOnInit(): void {
    this.pets.valueChanges.subscribe(value => {
      console.log('changes pets form ', value);
      this.recalculateTotal();
    });

    this.productService.getAllProduct().subscribe((products: ProductVaccine[]) => {
      let comboProducts: ProductVaccine[] = [];
      let singleProducts: ProductVaccine[] = [];
      console.log(products);

      products.forEach(product => {
        if (product.isCombo) {
          comboProducts.push(product);

        } else {
          singleProducts.push(product);
        }
      });

      this.comboProducts = this.populateRowspan(comboProducts, 'productCode');
      this.singleProducts = this.populateRowspan(singleProducts, 'productCode');
      this.singleProductKeys = this.singleProducts.map(product => `${product.productCode}_${product.petSize}`);
      this.singleProducts.forEach(product => this.singleProductPrice[`${product.productCode}_${product.petSize}`] = product.price);

      this.addPet();
    })
  }

  populateRowspan(data: ProductVaccine[], column: keyof ProductVaccine) {
    const map = this.computeRowspan(data, column);
    let result: ProductVaccine[] = [];
    data.forEach(product => {
      // @ts-ignore
      result.push(
        Object.assign({
          rowspan: {
            productCode: (map.get(product.productCode) || 0)
          },
        }, product)
      );
      map.delete(product.productCode);
    });

    return result;
  }

  computeRowspan(data: ProductVaccine[], column: keyof ProductVaccine) {
    const map = new Map<string, number>();
    data.forEach(row => {
      const key = row[column] as string;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return map;
  }

  get pets(): FormArray {
    return this.petInfoForms.get('pets') as FormArray;
  }


  useLanguage(language: string): void {
    console.log(language, this.translate.getCurrentLang());
    this.translate.use(language);
  }

  createPetGroup(): FormGroup {
    const selectVaccineControls = Object.fromEntries(
      this.singleProducts.map(p => [`${p.productCode}_${p.petSize}`, [{
        value: false,
        disabled: !(p.petSize === 'ALL')
      }]])
    );
    const amountVaccineControls = Object.fromEntries(
      this.singleProducts.map(p => [`${p.productCode}_${p.petSize}`, [{value: 0, disabled: true}, Validators.min(1)]])
    );

    return this.fb.group({
      petName: ['', Validators.required],
      petBreed: ['', Validators.required],
      birthDate: [moment().toDate(), Validators.required],
      gender: ['male', Validators.required],
      furColor: ['', Validators.required],
      weight: ['', Validators.required],
      size: ['SMALL', Validators.required],
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
      console.log(this.customerInfoForm.getRawValue());
      console.log(this.petInfoForms.getRawValue());
      this.registerVaccine();
    }
  }

  registerVaccine(): void {
    const request = {
      customerInfo: this.customerInfoForm.getRawValue(),
      petInfos: this.petInfoForms.getRawValue().pets,
    };

    this.registerService.register(request)
      .subscribe(response => {
        console.log(response);
      })
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
        total += this.singleProductPrice[key] * individualVaccineAmount[key];
      })

    return total;
  }
}
