import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()

export class AuthGuard implements CanActivate  {

  constructor(public authService: AuthService, public router: Router) {

  }

  canActivate(): boolean {
    if(localStorage.getItem('id_token')){
        return true;
    } else {
        this.router.navigateByUrl('/login');
        return false;
    }
  }
}