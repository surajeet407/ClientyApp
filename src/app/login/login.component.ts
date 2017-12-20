import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../shared/auth/auth.service';
import { error } from 'selenium-webdriver';
import { slideInOutAnimation } from '../animations/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public user$ =this.authService;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { 
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

  ngOnInit() {
  }

  login(){
    const inputValue =this.form.value;
    //console.log(inputValue.email, inputValue.password);
    this.authService.login(inputValue.email, inputValue.password)
    .subscribe(
      success => this.router.navigate(['./dashboard']),
      error => alert(error)
    );
  }

}
