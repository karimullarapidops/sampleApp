import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private flash: FlashMessagesService) { }

  isLoggedIn = false;

  ngOnInit() {
    this.authService.loggedIn.subscribe(isLoggedIn =>{
      this.isLoggedIn = isLoggedIn
    })
  }


  onLogoutClick() {
    this.authService.logout();
    this.flash.show('you are logged out', {
      cssClass: 'alert alert-success',
      timeout: 5000
    });
    this.router.navigate(['/login']);
    this.authService.loggedIn.next(false)
    return false;
  }

}
