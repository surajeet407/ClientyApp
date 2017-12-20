import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn;

  constructor(private authService: AuthService,
              private router: Router) {
    authService.isAuthenticated()
    .subscribe(
      success => this.isLoggedIn = success
    );
   }

  ngOnInit() {
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login']);
  }

}
