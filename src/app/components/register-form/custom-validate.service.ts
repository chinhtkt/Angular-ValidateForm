import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidateService {

  MatchingPassword(matchPassword: string, matchConfirmPassword: string) {
    return(formGroup:FormGroup) => {
      const control = formGroup.controls[matchPassword];
      const matchingControl = formGroup.controls[matchConfirmPassword];
      if(matchingControl.errors && !matchingControl.errors['MatchingPassword']) {
        return 
      }
      if(control.value !== matchingControl.value) {
        matchingControl.setErrors({MatchingPassword:true})
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  AgeValidator = (minAge: number): ValidatorFn => control =>
  (new Date()).getFullYear() - (new Date(control.value)).getFullYear() < minAge 
    ? { younger: { minAge } } 
    : null;

  constructor() { }
}
