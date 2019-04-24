import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private flash: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
     const user = {
       name: this.name,
       email: this.email,
       username: this.username,
       password: this.password
     }

     // Required Fields
     if (!this.validateService.validateRegister(user)) {
      // this.ngFlashMessageService.showFlashMessage({messages: ['please fill all the fields'], dismissible: true, timeout: false, type: 'danger'});
      this.flash.show('Please fill in fields', {
        cssClass: 'alert alert-danger',
        timeout: 3000
      });
       return false;
     }

     // Validate Email
     if (!this.validateService.validateEmail(user.email)) {
      // this.ngFlashMessageService.showFlashMessage({messages: ['please fill valid email'], dismissible: true, timeout: false, type: 'danger'});
      this.flash.show('Please fill valid email', {
        cssClass: 'alert alert-danger',
        timeout: 3000
      });
      return false;
    }

  }

}
