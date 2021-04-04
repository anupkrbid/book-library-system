import { FormArray, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidator {
  static notWholeNoValidatorFn(): ValidatorFn {
    return function (control: FormControl): ValidationErrors | { [key: string]: any } | null {
      return Number.isInteger(control.value) ? null : {
        notWholeNo: true
      };
    }
  }
}
