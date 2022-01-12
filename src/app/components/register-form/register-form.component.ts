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
        inputMale: ['Male Input', [Validators.required]],
        inputFemale: ['Female Input' , [Validators.required]]

      },
      {
        validators: this.customvalidateService.MatchingPassword('password', 'confirmpassword'),
      },
    )
    this.registerForm.get('gender')?.valueChanges.subscribe((data: Gender) => {
      if(this.allowDisplayMale = data === 0) {
        this.registerForm.get('inputFemale')?.disable();
        this.registerForm.get('inputMale')?.enable();
      }
      if(this.allowDisplayFemale = data === 1) {
        this.registerForm.get('inputMale')?.disable();
        this.registerForm.get('inputFemale')?.enable();
      }
      console.log(data)
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
