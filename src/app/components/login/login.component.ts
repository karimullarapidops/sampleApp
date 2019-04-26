import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flash: FlashMessagesService) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe(isLoggedIn=>{
      if(isLoggedIn)
      this.router.navigateByUrl('/profile');
    })
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data) {
        this.authService.storeUserData(data['token'], data['user']);
        this.flash.show(data['msg'], {
          cssClass: 'alert alert-success',
          timeout: 5000
        });
        this.authService.loggedIn.next(true);
        this.router.navigate(['dashboard']);
      } else {
        this.flash.show(data['msg'], {
          cssClass: 'alert alert-danger',
          timeout: 5000
        });
        this.router.navigate(['login']);
      }
    });
  }

}
