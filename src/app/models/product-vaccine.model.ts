export interface ProductVaccine {
  productId: number;
  productCode: string;
  petSize: string;
  price: number;

  displayNameJp: string;
  displayNameEn: string;

  descriptionJp?: string;
  descriptionEn?: string;

  isCombo: boolean;
  priority: number;
}
