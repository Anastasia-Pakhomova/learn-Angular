import {ValidationErrors, ValidatorFn} from "@angular/forms";

export const authorsValidator = (): ValidatorFn => (control): ValidationErrors | null => {
  if(control.value.length) return {authorsValidator: 'authorsValidator error'}

    return null
}
