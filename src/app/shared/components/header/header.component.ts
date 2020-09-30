import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filteredStreets: Observable<string[]>;
  collapsedNavbar = false;
  @Output() navbarWidthChanged = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.collapsedNavbar = !this.collapsedNavbar;
    this.navbarWidthChanged.emit(this.collapsedNavbar);
  }

}
