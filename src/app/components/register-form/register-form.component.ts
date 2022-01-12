import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CustomValidateService } from './custom-validate.service'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Gender } from './gender'
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  faAngleDown = faAngleDown;
  registerForm!: FormGroup;
  submitted = false;
  allowDisplayMale = false;
  allowDisplayFemale = false;


  genders = [Gender.Male, Gender.Female]

  constructor(private fb: FormBuilder, private customvalidateService: CustomValidateService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.pattern(/^[\w\s]+$/)]],
        password: ['', [Validators.required]],
        confirmpassword: ['', [Validators.required,]],
        date: ['', [Validators.required, this.customvalidateService.AgeValidator(18)]],
        term: [false, [Validators.requiredTrue]],
        gender: ['', [Validators.required]],
        inputMale: [this.genders ? 'Male Input!': '', [Validators.required]],
        inputFemale: [this.genders ? 'Female Input!' : '', [Validators.required]]
      },
      {
        validators: this.customvalidateService.MatchingPassword('password', 'confirmpassword'),
      },
    )
    this.registerForm.get('gender')?.valueChanges.subscribe((data: Gender) => {
      this.allowDisplayMale = data === 0;
      this.allowDisplayFemale = data === 1;
    })
  }

  get f() {
    return this.registerForm.controls
  }


  submitData() {
    this.submitted = true;
    console.log(this.registerForm.value)
  }



}
