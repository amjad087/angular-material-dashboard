import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-sidebar',
  templateUrl: './contact-sidebar.component.html',
  styleUrls: ['./contact-sidebar.component.css']
})
export class ContactSidebarComponent implements OnInit {
  sideNavWidth = 150;
  constructor() { }

  ngOnInit(): void {
  }

}
