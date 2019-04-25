import { Component, OnInit } from '@angular/core';
import { zoomIn } from '../../animate';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    zoomIn
  ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  url = window.location.pathname;

}
